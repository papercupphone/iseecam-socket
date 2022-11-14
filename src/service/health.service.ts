import axios from 'axios';

export class HealthService {
  public async check(): Promise<any> {
    try {
      const response = await axios.get<any>(`${process.env.MESSAGE_API_URL}/test/ping`);
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
