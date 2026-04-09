import { OutgoingHttpHeaders } from 'http';
import {
  AuthorizeRequest,
  AuthorizeResponse,
  BootNotificationRequest,
  BootNotificationResponse,
  CancelReservationRequest,
  CancelReservationResponse,
  ChangeAvailabilityRequest,
  ChangeAvailabilityResponse,
  ChangeConfigurationRequest,
  ChangeConfigurationResponse,
  ClearCacheRequest,
  ClearCacheResponse,
  ClearChargingProfileRequest,
  ClearChargingProfileResponse,
  DataTransferRequest,
  DataTransferResponse,
  DiagnosticsStatusNotificationRequest,
  DiagnosticsStatusNotificationResponse,
  FirmwareStatusNotificationRequest,
  FirmwareStatusNotificationResponse,
  GetCompositeScheduleRequest,
  GetCompositeScheduleResponse,
  GetConfigurationRequest,
  GetConfigurationResponse,
  GetDiagnosticsRequest,
  GetDiagnosticsResponse,
  GetLocalListVersionRequest,
  GetLocalListVersionResponse,
  HeartbeatRequest,
  HeartbeatResponse,
  MeterValuesRequest,
  MeterValuesResponse,
  RemoteStartTransactionRequest,
  RemoteStartTransactionResponse,
  RemoteStopTransactionRequest,
  RemoteStopTransactionResponse,
  ReserveNowRequest,
  ReserveNowResponse,
  ResetRequest,
  ResetResponse,
  SendLocalListRequest,
  SendLocalListResponse,
  SetChargingProfileRequest,
  SetChargingProfileResponse,
  StartTransactionRequest,
  StartTransactionResponse,
  StatusNotificationRequest,
  StatusNotificationResponse,
  StopTransactionRequest,
  StopTransactionResponse,
  TriggerMessageRequest,
  TriggerMessageResponse,
  UnlockConnectorRequest,
  UnlockConnectorResponse,
  UpdateFirmwareRequest,
  UpdateFirmwareResponse,
} from './types';
import { Client } from './impl/Client';

export class OcppClient extends Client {
  connect(centralSystemUrl: string, headers?: OutgoingHttpHeaders) {
    super.connect(centralSystemUrl, headers);
  }

  terminate() {
    super.terminate();
  }

  on(event: 'CancelReservation', listener: (request: CancelReservationRequest, cb: (response: CancelReservationResponse) => void) => void): this;
  on(event: 'ChangeAvailability', listener: (request: ChangeAvailabilityRequest, cb: (response: ChangeAvailabilityResponse) => void) => void): this;
  on(event: 'ChangeConfiguration', listener: (request: ChangeConfigurationRequest, cb: (response: ChangeConfigurationResponse) => void) => void): this;
  on(event: 'ClearCache', listener: (request: ClearCacheRequest, cb: (response: ClearCacheResponse) => void) => void): this;
  on(event: 'ClearChargingProfile', listener: (request: ClearChargingProfileRequest, cb: (response: ClearChargingProfileResponse) => void) => void): this;
  on(event: 'DataTransfer', listener: (request: DataTransferRequest, cb: (response: DataTransferResponse) => void) => void): this;
  on(event: 'GetCompositeSchedule', listener: (request: GetCompositeScheduleRequest, cb: (response: GetCompositeScheduleResponse) => void) => void): this;
  on(event: 'GetConfiguration', listener: (request: GetConfigurationRequest, cb: (response: GetConfigurationResponse) => void) => void): this;
  on(event: 'GetDiagnostics', listener: (request: GetDiagnosticsRequest, cb: (response: GetDiagnosticsResponse) => void) => void): this;
  on(event: 'GetLocalListVersion', listener: (request: GetLocalListVersionRequest, cb: (response: GetLocalListVersionResponse) => void) => void): this;
  on(event: 'RemoteStartTransaction', listener: (request: RemoteStartTransactionRequest, cb: (response: RemoteStartTransactionResponse) => void) => void): this;
  on(event: 'RemoteStopTransaction', listener: (request: RemoteStopTransactionRequest, cb: (response: RemoteStopTransactionResponse) => void) => void): this;
  on(event: 'ReserveNow', listener: (request: ReserveNowRequest, cb: (response: ReserveNowResponse) => void) => void): this;
  on(event: 'Reset', listener: (request: ResetRequest, cb: (response: ResetResponse) => void) => void): this;
  on(event: 'SendLocalList', listener: (request: SendLocalListRequest, cb: (response: SendLocalListResponse) => void) => void): this;
  on(event: 'SetChargingProfile', listener: (request: SetChargingProfileRequest, cb: (response: SetChargingProfileResponse) => void) => void): this;
  on(event: 'TriggerMessage', listener: (request: TriggerMessageRequest, cb: (response: TriggerMessageResponse) => void) => void): this;
  on(event: 'UnlockConnector', listener: (request: UnlockConnectorRequest, cb: (response: UnlockConnectorResponse) => void) => void): this;
  on(event: 'UpdateFirmware', listener: (request: UpdateFirmwareRequest, cb: (response: UpdateFirmwareResponse) => void) => void): this;
  on(event: 'connect', listener: () => void): this;
  on(event: 'close', listener: (code: number, reason: Buffer) => void): this;
  on(event: 'error', listener: (err: Error) => void): this;
  on(event: string | symbol, listener: (...args: any[]) => void) {
    return super.on(event, listener);
  }

  callRequest(request: 'Authorize', payload: AuthorizeRequest, messageId?: string): Promise<AuthorizeResponse>
  callRequest(request: 'BootNotification', payload: BootNotificationRequest, messageId?: string): Promise<BootNotificationResponse>
  callRequest(request: 'DataTransfer', payload: DataTransferRequest, messageId?: string): Promise<DataTransferResponse>
  callRequest(request: 'DiagnosticsStatusNotification', payload: DiagnosticsStatusNotificationRequest, messageId?: string): Promise<DiagnosticsStatusNotificationResponse>
  callRequest(request: 'FirmwareStatusNotification', payload: FirmwareStatusNotificationRequest, messageId?: string): Promise<FirmwareStatusNotificationResponse>
  callRequest(request: 'Heartbeat', payload: HeartbeatRequest, messageId?: string): Promise<HeartbeatResponse>
  callRequest(request: 'MeterValues', payload: MeterValuesRequest, messageId?: string): Promise<MeterValuesResponse>
  callRequest(request: 'StartTransaction', payload: StartTransactionRequest, messageId?: string): Promise<StartTransactionResponse>
  callRequest(request: 'StatusNotification', payload: StatusNotificationRequest, messageId?: string): Promise<StatusNotificationResponse>
  callRequest(request: 'StopTransaction', payload: StopTransactionRequest, messageId?: string): Promise<StopTransactionResponse>
  callRequest(request: string, payload: any, messageId?: string): Promise<any> {
    return super.callRequest(request, payload, messageId);
  }
}
