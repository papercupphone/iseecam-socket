import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { JoinRequestModel } from './model/request/join.request.model';
import { JoinService } from './service/join.service';

const joinService: JoinService = new JoinService();
export const handler = async (event: APIGatewayProxyEvent | string): Promise<APIGatewayProxyResult | any> => {
  if (typeof event === 'string') {
    return event;
  }

  let postData = JSON.parse(event.body!);
  const data: JoinRequestModel = {
    connectionId: event.requestContext.connectionId as string,
    room: postData.room,
    username: postData.username,
    type: !postData.jwt ? 'PUBLIC_ROOM' : 'PRIVATE_ROOM',
  };

  if (!postData.jwt) {
    return await joinService.publicJoin(data);
  } else {
    return await joinService.join(data, postData.jwt);
  }
};
