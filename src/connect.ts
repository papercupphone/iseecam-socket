import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ConnectService } from './service/connect.service';

const connectService: ConnectService = new ConnectService();
export const handler = async (event: APIGatewayProxyEvent | string): Promise<APIGatewayProxyResult | any> => {
  if (typeof event === 'string') {
    return event;
  }

  return await connectService.publicConnect({
    connectionId: event.requestContext.connectionId as string,
  });
};
