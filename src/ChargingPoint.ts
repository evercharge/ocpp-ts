import WebSocket from 'ws';
import { OutgoingHttpHeaders } from 'http';
import { Protocol } from './Protocol';
import { Client } from './Client';
import { OCPP_PROTOCOL_1_6 } from './schemas';

export class ChargingPoint extends Client {
  connect(centralSystemUrl: string, headers?: OutgoingHttpHeaders): Promise<void> {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(centralSystemUrl + this.getCpId(), [OCPP_PROTOCOL_1_6], {
        perMessageDeflate: false,
        protocolVersion: 13,
        headers,
      });

      ws.on('upgrade', (res) => {
        if (!res.headers['sec-websocket-protocol']) {
          reject(new Error(`Server doesn't support protocol ${OCPP_PROTOCOL_1_6}`));
        }
      });

      ws.on('close', () => {
        console.debug('Connection is closed');
        this.setConnection(null);
      });

      ws.on('open', () => {
        if (ws) {
          ws.removeAllListeners('error');
          this.setConnection(new Protocol(this, ws));
          resolve();
        }
      });

      ws.on('error', (err) => {
        reject(err);
      });
    });
  }
}
