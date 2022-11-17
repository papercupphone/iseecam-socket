import { ConnectRequestModel } from './connect.request.model';

export interface PublicConnectRequestModel extends ConnectRequestModel {
  username: string;
}
