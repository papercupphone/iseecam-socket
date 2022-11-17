import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ConnectService } from './service/connect.service';

const connectService: ConnectService = new ConnectService();
export const handler = async (event: APIGatewayProxyEvent | string): Promise<APIGatewayProxyResult | any> => {
  if (typeof event === 'string') {
    return event;
  }
  if (event.queryStringParameters && event.queryStringParameters.username) {
    const username = event.queryStringParameters.username;
    return await connectService.publicConnect({
      connectionId: event.requestContext.connectionId as string,
      username: username as string,
    });
  } else if (event.queryStringParameters && event.queryStringParameters.jwt) {
    return await connectService.connect(
      {
        connectionId: event.requestContext.connectionId as string,
      },
      event.queryStringParameters.jwt,
    );
  }
};
