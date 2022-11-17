import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { MessageRequestModel } from './model/request/message.request.model';
import { MessageService } from './service/message.service';

const messageService: MessageService = new MessageService();
export const handler = async (event: APIGatewayProxyEvent | string): Promise<APIGatewayProxyResult | any> => {
  if (typeof event === 'string') {
    return event;
  }
  let postData = JSON.parse(event.body!);

  const data: MessageRequestModel = {
    room: postData.room,
    sender: postData.sender,
    message: postData.message,
  };

  if (!postData.jwt) {
    return await messageService.publicSend(data);
  } else {
    return await messageService.send(data, postData.jwt);
  }
};
