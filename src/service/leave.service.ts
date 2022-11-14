import axios from 'axios';
import { LeaveRequestModel } from '../model/request/leave.request.model';

export class LeaveService {
  public async leave(data: LeaveRequestModel, jwt: string): Promise<any> {
    try {
      const response = await axios.post<string>(`${process.env.MESSAGE_API_URL}/leave`, data, {
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
