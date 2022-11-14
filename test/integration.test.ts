import { ConnectRequestModel } from '../src/model/request/connect.request.model';
import { MessageRequestModel } from '../src/model/request/message.request.model';
import { JoinResponseModel } from '../src/model/response/join.response.model';
import { ConnectService } from '../src/service/connect.service';
import { HealthService } from '../src/service/health.service';
import { JoinService } from '../src/service/join.service';
import { LeaveService } from '../src/service/leave.service';
import { MessageService } from '../src/service/message.service';
import { Commons } from './commons';

process.env.COGNITO_USER_POOL_ID = 'eu-west-1_2B7xVU4hZ';
process.env.COGNITO_CLIENT_ID = '4pljkbatljbjc17rh6ei9ejh0e';
process.env.MESSAGE_API_URL = 'https://ls66juopf1.execute-api.eu-west-1.amazonaws.com/prod';
const username1 = 'ekin';
const password1 = '1ISeeCam.!';
const username2 = 'halapeno';
const password2 = 'Ehalapeno.!8';

jest.setTimeout(25000);

test('getToken', async () => {
  let jwt = await Commons.login({
    username: username1,
    password: password1,
  });

  let jwt2 = await Commons.login({
    username: username2,
    password: password2,
  });

  const mesage = {
    message: 'Hello World',
    sender: username1,
    room: 'ekin2',
    jwt,
  };

  const mesage2 = {
    message: 'Hello World',
    sender: username2,
    room: 'ekin2',
    jwt2,
  };
  console.log(mesage);
  console.log(mesage2);
});

test('Send message', async () => {
  let jwt = await Commons.login({
    username: username1,
    password: password1,
  });
  const messageService = new MessageService();
  const message: MessageRequestModel = {
    message: 'Hello',
    room: 'room',
    sender: 'ekin',
  };
  let now = new Date().getTime();
  let response = await messageService.send(message, jwt.accessToken);
  let future = new Date().getTime();
  let callTime = future - now;
  console.log(callTime);
  expect(response).not.toBeNull();
});

test('Connect', async () => {
  let jwt = await Commons.login({
    username: username1,
    password: password1,
  });
  const connectService = new ConnectService();
  console.log(new Date());
  let response: ConnectRequestModel = await connectService.connect(
    {
      connectionId: 'connectionId',
    },
    jwt,
  );
  console.log(new Date());
  console.log(response);
  expect(response).not.toBeNull();
});

test('Join', async () => {
  let jwt = await Commons.login({
    username: username1,
    password: password1,
  });
  const joinService = new JoinService();
  let response: JoinResponseModel = await joinService.join(
    {
      connectionId: 'connectionId',
      room: 'room',
      username: 'ekin',
    },
    jwt.accessToken,
  );
  console.log(response);
  expect(response).not.toBeNull();
});

test('Leave', async () => {
  let jwt = await Commons.login({
    username: username1,
    password: password1,
  });
  const leaveService = new LeaveService();
  let response: string = await leaveService.leave(
    {
      room: 'room',
      username: 'ekin',
    },
    jwt.accessToken,
  );
  console.log(response);
  expect(response).not.toBeNull();
});

test('Health', async () => {
  const healthService = new HealthService();
  let response: string = await healthService.check();
  console.log(response);
  expect(response).not.toBeNull();
});
