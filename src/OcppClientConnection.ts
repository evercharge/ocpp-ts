import { Client } from './impl/Client';
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
import { Protocol } from './impl/Protocol';

export class OcppClientConnection extends Client {
  getCpId(): string {
    return super.getCpId();
  }

  setConnection(connection: Protocol | null): void {
    super.setConnection(connection);
  }

  on(event: 'Authorize', listener: (request: AuthorizeRequest, cb:(response:AuthorizeResponse) => void) => void): this;
  on(event: 'BootNotification', listener: (request: BootNotificationRequest, cb:(response:BootNotificationResponse) => void) => void): this;
  on(event: 'DataTransfer', listener: (request: DataTransferRequest, cb:(response:DataTransferResponse) => void) => void): this;
  on(event: 'DiagnosticsStatusNotification', listener: (request: DiagnosticsStatusNotificationRequest, cb:(response:DiagnosticsStatusNotificationResponse) => void) => void): this;
  on(event: 'FirmwareStatusNotification', listener: (request: FirmwareStatusNotificationRequest, cb:(response:FirmwareStatusNotificationResponse) => void) => void): this;
  on(event: 'Heartbeat', listener: (request: HeartbeatRequest, cb:(response:HeartbeatResponse) => void) => void): this;
  on(event: 'MeterValues', listener: (request: MeterValuesRequest, cb:(response:MeterValuesResponse) => void) => void): this;
  on(event: 'StartTransaction', listener: (request: StartTransactionRequest, cb:(response:StartTransactionResponse) => void) => void): this;
  on(event: 'StatusNotification', listener: (request: StatusNotificationRequest, cb:(response:StatusNotificationResponse) => void) => void): this;
  on(event: 'StopTransaction', listener: (request: StopTransactionRequest, cb:(response:StopTransactionResponse) => void) => void): this;
  on(event: 'close', listener: (code: number, reason: Buffer) => void): this;
  on(event: 'error', listener: (err: Error) => void): this;
  on(event: string | symbol, listener: (...args: any[]) => void) {
    return super.on(event, listener);
  }

  callRequest(request: 'CancelReservation', payload: CancelReservationRequest, messageId?: string): Promise<CancelReservationResponse>;
  callRequest(request: 'ChangeAvailability', payload: ChangeAvailabilityRequest, messageId?: string): Promise<ChangeAvailabilityResponse>;
  callRequest(request: 'ChangeConfiguration', payload: ChangeConfigurationRequest, messageId?: string): Promise<ChangeConfigurationResponse>;
  callRequest(request: 'ClearCache', payload: ClearCacheRequest, messageId?: string): Promise<ClearCacheResponse>;
  callRequest(request: 'ClearChargingProfile', payload: ClearChargingProfileRequest, messageId?: string): Promise<ClearChargingProfileResponse>;
  callRequest(request: 'DataTransfer', payload: DataTransferRequest, messageId?: string): Promise<DataTransferResponse>;
  callRequest(request: 'GetCompositeSchedule', payload: GetCompositeScheduleRequest, messageId?: string): Promise<GetCompositeScheduleResponse>;
  callRequest(request: 'GetConfiguration', payload: GetConfigurationRequest, messageId?: string): Promise<GetConfigurationResponse>;
  callRequest(request: 'GetDiagnostics', payload: GetDiagnosticsRequest, messageId?: string): Promise<GetDiagnosticsResponse>;
  callRequest(request: 'GetLocalListVersion', payload: GetLocalListVersionRequest, messageId?: string): Promise<GetLocalListVersionResponse>;
  callRequest(request: 'RemoteStartTransaction', payload: RemoteStartTransactionRequest, messageId?: string): Promise<RemoteStartTransactionResponse>;
  callRequest(request: 'RemoteStopTransaction', payload: RemoteStopTransactionRequest, messageId?: string): Promise<RemoteStopTransactionResponse>;
  callRequest(request: 'ReserveNow', payload: ReserveNowRequest, messageId?: string): Promise<ReserveNowResponse>;
  callRequest(request: 'Reset', payload: ResetRequest, messageId?: string): Promise<ResetResponse>;
  callRequest(request: 'SendLocalList', payload: SendLocalListRequest, messageId?: string): Promise<SendLocalListResponse>;
  callRequest(request: 'SetChargingProfile', payload: SetChargingProfileRequest, messageId?: string): Promise<SetChargingProfileResponse>;
  callRequest(request: 'TriggerMessage', payload: TriggerMessageRequest, messageId?: string): Promise<TriggerMessageResponse>;
  callRequest(request: 'UnlockConnector', payload: UnlockConnectorRequest, messageId?: string): Promise<UnlockConnectorResponse>;
  callRequest(request: 'UpdateFirmware', payload: UpdateFirmwareRequest, messageId?: string): Promise<UpdateFirmwareResponse>;
  callRequest(request: string, payload: any, messageId?: string): Promise<any> {
    return super.callRequest(request, payload, messageId);
  }
}
