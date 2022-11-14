import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { MessageService } from './service/message.service';

const messageService: MessageService = new MessageService();
export const handler = async (event: APIGatewayProxyEvent | string): Promise<APIGatewayProxyResult | any> => {
  if (typeof event === 'string') {
    return event;
  }
  let postData = JSON.parse(event.body!);
  console.log(postData.mesage.length);
  return await messageService.send(
    {
      room: postData.room,
      sender: postData.sender,
      message: postData.message,
    },
    postData.jwt,
  );
};
