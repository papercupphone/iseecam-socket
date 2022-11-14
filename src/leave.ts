import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { LeaveService } from './service/leave.service';

const leaveService: LeaveService = new LeaveService();
export const handler = async (event: APIGatewayProxyEvent | string): Promise<APIGatewayProxyResult | any> => {
  if (typeof event === 'string') {
    return event;
  }
  let postData = JSON.parse(event.body!);
  return await leaveService.leave(
    {
      room: postData.room,
      username: postData.username,
    },
    postData.jwt,
  );
};
