import { EventEmitter } from 'events';

import { OcppServer } from "../src";
import { Protocol } from '../src/impl/Protocol';
import { Server } from '../src/impl/Server';

describe('OcppProtocol', () => {
  it('should extract cp id from the url', () => {
    const cpId = Server.getCpIdFromUrl('ws://localhost/ocpp/service/CP5612')
    expect(cpId).toBe('CP5612');
  });

  it('should extract cp and decode correctly', () => {
    const cpId = Server.getCpIdFromUrl('ws://eparking.fi/ocpp/service/CP%205612')
    expect(cpId).toBe('CP 5612');
  });

  it('should strip query parameters from uri', () => {
    const cpId = Server.getCpIdFromUrl('ws://sub.eparking.fi/ocpp/service/CP%205612?foo=bar')
    expect(cpId).toBe('CP 5612');
  });

  it('should return undefined cp id if provided with undefined input', () => {
    const cpId = Server.getCpIdFromUrl(undefined)
    expect(cpId).toBe(undefined);
  });
});

describe('Protocol.onCall messageId injection', () => {
  it('attaches the messageId to the inbound payload before emitting', (done) => {
    // minimal socket stub to register listeners on
    const eventEmitter = new EventEmitter();
    const fakeSocket: any = {
      on: jest.fn(),
      send: jest.fn(),
    };
    const protocol = new Protocol(eventEmitter, fakeSocket);
    const wireMessageId = 'inbound-test-id-12345';

    // register a listener on Protocol's internal eventEmitter
    eventEmitter.on('Heartbeat', (payload: any, callback: any) => {
      try {
        expect(payload.messageId).toBe(wireMessageId);
        callback({ currentTime: new Date().toISOString() });
        done();
      } catch (err) {
        done(err);
      }
    });

    // call the private onCall directly with a valid Heartbeat payload
    (protocol as any).onCall(wireMessageId, 'Heartbeat', {});
  });
});

describe('Protocol.callRequest timer cleanup', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('clears the timeout when the response arrives', async () => {
    const eventEmitter = new EventEmitter();
    const fakeSocket: any = {
      on: jest.fn(),
      send: jest.fn(),
    };
    const protocol = new Protocol(eventEmitter, fakeSocket);

    const promise = protocol.callRequest('Heartbeat', {});
    expect(jest.getTimerCount()).toBe(1);

    const sentFrame = JSON.parse(fakeSocket.send.mock.calls[0][0]);
    const messageId = sentFrame[1];

    // Simulate receiving a response from the client
    (protocol as any).onCallResult(messageId, {currentTime: '2026-01-01T00:00:00Z'});

    await promise;

    expect(jest.getTimerCount()).toBe(0);
  });

  it('clears the timeout when an error response arrives', async () => {
    const eventEmitter = new EventEmitter();
    const fakeSocket: any = {
      on: jest.fn(),
      send: jest.fn(),
    };
    const protocol = new Protocol(eventEmitter, fakeSocket);

    const promise = protocol.callRequest('Heartbeat', {}).catch(() => {
      // swallow the expected error for test purposes
    });
    expect(jest.getTimerCount()).toBe(1);

    const sentFrame = JSON.parse(fakeSocket.send.mock.calls[0][0]);
    const messageId = sentFrame[1];

    (protocol as any).onCallError(messageId, 'GenericError', 'test error', {});

    await promise;

    expect(jest.getTimerCount()).toBe(0);
  });
});

describe('Protocol.callRequest configurable timeout', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('rejects after the configured timeout when no response arrives', async () => {
    const eventEmitter = new EventEmitter();
    const fakeSocket: any = {
      on: jest.fn(),
      send: jest.fn(),
    };
    const protocol = new Protocol(eventEmitter, fakeSocket, 5000);

    let rejected = false;
    const promise = protocol.callRequest('Heartbeat', {}).catch((err) => {
      rejected = true;
    });

    jest.advanceTimersByTime(4999);
    await Promise.resolve();
    expect(rejected).toBe(false);

    jest.advanceTimersByTime(2);
    await promise;
    expect(rejected).toBe(true);
  });

  it('falls back to the 10000ms default when no timeout is configured', async () => {
    const eventEmitter = new EventEmitter();
    const fakeSocket: any = {
      on: jest.fn(),
      send: jest.fn(),
    };
    const protocol = new Protocol(eventEmitter, fakeSocket);

    let rejected = false;
    const promise = protocol.callRequest('Heartbeat', {}).catch((err) => {
      rejected = true;
    });

    jest.advanceTimersByTime(9999);
    await Promise.resolve();
    expect(rejected).toBe(false);

    jest.advanceTimersByTime(2);
    await promise;
    expect(rejected).toBe(true);
  });
});
