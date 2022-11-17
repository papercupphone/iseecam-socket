import axios from 'axios';
import { MessageRequestModel } from '../model/request/message.request.model';
import { MessageResponseModel } from '../model/response/message.response.model';

export class MessageService {
  public async send(data: MessageRequestModel, jwt: string): Promise<any> {
    try {
      const response = await axios.post<MessageResponseModel>(`${process.env.MESSAGE_API_URL}/message`, data, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
      return { statusCode: 200, body: JSON.stringify(response.data) };
    } catch (error: any) {
      if (error && error.response && error.response.status) {
        return { statusCode: error.response.status, body: JSON.stringify(error.response.data) };
      } else {
        return { statusCode: 500, body: 'Something bad happened' };
      }
    }
  }

  public async publicSend(data: MessageRequestModel): Promise<any> {
    try {
      const response = await axios.post<MessageResponseModel>(`${process.env.MESSAGE_API_URL}/public/message`, data, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
      });
      return { statusCode: 200, body: JSON.stringify(response.data) };
    } catch (error: any) {
      if (error && error.response && error.response.status) {
        return { statusCode: error.response.status, body: JSON.stringify(error.response.data) };
      } else {
        return { statusCode: 500, body: 'Something bad happened' };
      }
    }
  }
}
