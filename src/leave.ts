import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { LeaveRequestModel } from './model/request/leave.request.model';
import { LeaveService } from './service/leave.service';

const leaveService: LeaveService = new LeaveService();
export const handler = async (event: APIGatewayProxyEvent | string): Promise<APIGatewayProxyResult | any> => {
  if (typeof event === 'string') {
    return event;
  }
  
  let postData = JSON.parse(event.body!);
  const data: LeaveRequestModel = {
    room: postData.room,
    username: postData.username,
  };

  if (!postData.jwt) {
    return await leaveService.publicLeave(data);
  } else {
    return await leaveService.leave(data, postData.jwt);
  }
};
