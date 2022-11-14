import axios from 'axios';
import { ConnectRequestModel } from '../model/request/connect.request.model';
import { ConnectResponseModel } from '../model/response/connect.response.model';

export class ConnectService {
  public async connect(data: ConnectRequestModel, jwt: string): Promise<any> {
    try {
      const response = await axios.post<ConnectResponseModel>(`${process.env.MESSAGE_API_URL}/connect`, data, {
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
        return { statusCode: 500, body: "Something bad happened" };
      }
    }
  }
}
