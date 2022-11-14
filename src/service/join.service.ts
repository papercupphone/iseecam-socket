import axios from 'axios';
import { JoinRequestModel } from '../model/request/join.request.model';
import { JoinResponseModel } from '../model/response/join.response.model';

export class JoinService {
  public async join(data: JoinRequestModel, jwt: string): Promise<any> {
    try {
      const response = await axios.post<JoinResponseModel>(`${process.env.MESSAGE_API_URL}/join`, data, {
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
