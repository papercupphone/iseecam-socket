import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { JoinService } from './service/join.service';

const joinService: JoinService = new JoinService();
export const handler = async (event: APIGatewayProxyEvent | string): Promise<APIGatewayProxyResult | any> => {
  if (typeof event === 'string') {
    return event;
  }

  let postData = JSON.parse(event.body!);
  return await joinService.publicJoin(
    {
      connectionId: event.requestContext.connectionId as string,
      room: postData.room,
      username: postData.username,
    }
  );
};
