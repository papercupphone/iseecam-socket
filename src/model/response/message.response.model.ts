export interface MessageResponseModel {
  id: string;
  message: string;
  room: string;
  sender: string;
  receiver: string;
  creationTime: number;
  updateTime: number;
}
