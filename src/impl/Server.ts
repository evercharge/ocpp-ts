import EventEmitter from 'events';
import WebSocket, { WebSocketServer } from 'ws';
import { SecureContextOptions } from 'tls';
import { createServer as createHttpsServer } from 'https';
import { createServer as createHttpServer, IncomingMessage } from 'http';
import stream from 'node:stream';
import * as http from 'node:http';
import { OCPP_PROTOCOL_1_6 } from './schemas';
import { Client } from './Client';
import { OcppClientConnection } from '../OcppClientConnection';
import { Protocol } from './Protocol';

export class Server extends EventEmitter {
  private server: http.Server | undefined;

  private wss: WebSocketServer | undefined;

  private clients: Array<Client> = [];

  private callTimeoutMs: number;

  constructor(callTimeoutMs: number = 10000) {
    super();
    this.callTimeoutMs = callTimeoutMs;
  }

  public close() {
    this.removeAllListeners();
    this.server?.close((err) => {
      if (err) {
        console.error(`Error closing http ocpp server ${err}`);
      }
    });
    this.wss?.close((err) => {
      if (err) {
        console.error(`Error closing ws ocpp server ${err}`);
      }
    });
  }

  public getServer(): http.Server | undefined {
    return this.server;
  }

  public getWssServer(): WebSocketServer | undefined {
    return this.wss;
  }

  protected listen(port = 9220, options?: SecureContextOptions) {
    if (options) {
      this.server = createHttpsServer(options || {});
    } else {
      this.server = createHttpServer();
    }

    this.wss = new WebSocketServer({
      noServer: true,
      handleProtocols: (protocols: Set<string>) => {
        if (protocols.has(OCPP_PROTOCOL_1_6)) {
          return OCPP_PROTOCOL_1_6;
        }
        return false;
      },
    });

    this.wss.on('connection', (ws: any, req: IncomingMessage) => this.onNewConnection(ws, req));
    this.server.on('upgrade', (req: IncomingMessage, socket: stream.Duplex, head: Buffer) => {
      const cpId = Server.getCpIdFromUrl(req.url);
      if (!cpId) {
        socket.write('HTTP/1.1 400 Bad Request\r\n\r\n');
        socket.destroy();
      } else if (this.listenerCount('authorization')) {
        this.emit('authorization', cpId, req, (err?: Error) => {
          if (err) {
            socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
            socket.destroy();
          } else {
            this.wss?.handleUpgrade(req, socket, head, (ws) => {
              this.wss?.emit('connection', ws, req);
            });
          }
        });
      } else {
        this.wss?.handleUpgrade(req, socket, head, (ws) => {
          this.wss?.emit('connection', ws, req);
        });
      }
    });

    this.server.listen(port);
  }

  private onNewConnection(socket: WebSocket, req: IncomingMessage) {
    const cpId = Server.getCpIdFromUrl(req.url);
    if (!socket.protocol || !cpId) {
      console.info('Closed connection due to unsupported protocol');
      socket.close();
      return;
    }

    const client = new OcppClientConnection(cpId);
    client.setConnection(new Protocol(client, socket, this.callTimeoutMs));

    socket.on('error', (err) => {
      console.info(err.message, socket.readyState);
      client.emit('error', err);
    });

    socket.on('close', (code: number, reason: Buffer) => {
      const index = this.clients.indexOf(client);
      this.clients.splice(index, 1);
      client.emit('close', code, reason);
      console.error(`Closed connection, code: ${code}, reason: ${reason.toString()}`);
    });
    this.clients.push(client);
    this.emit('connection', client);
  }

  static getCpIdFromUrl(url: string | undefined): string | undefined {
    try {
      if (url) {
        const encodedCpId = url.split('/')
        .pop();
        if (encodedCpId) {
          return decodeURI(encodedCpId.split('?')[0]);
        }
      }
    } catch (e) {
      console.error(e);
    }
    return undefined;
  }
}
