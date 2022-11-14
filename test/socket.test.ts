import WebSocket from 'ws';
import { Commons } from './commons';
import { text128kb } from './mock.text';

process.env.COGNITO_USER_POOL_ID = 'eu-west-1_2B7xVU4hZ';
process.env.COGNITO_CLIENT_ID = '4pljkbatljbjc17rh6ei9ejh0e';
process.env.MESSAGE_API_URL = 'https://ls66juopf1.execute-api.eu-west-1.amazonaws.com/prod';
const username1 = 'ekin';
const password1 = '1ISeeCam.!';
const username2 = 'halapeno';
const password2 = 'Ehalapeno.!8';

jest.setTimeout(25000);
test('join', async () => {
  let jwt = await Commons.login({
    username: username1,
    password: password1,
  });
  let now = new Date().getTime();
  let future;
  const client = new WebSocket(`wss://z2a5fqdqob.execute-api.eu-west-1.amazonaws.com/prod/?jwt=${jwt.accessToken}`);
  client.on('open', () => {
    future = new Date().getTime();
    let callTime = future - now;
    console.log(callTime);
    client.send(JSON.stringify({ action: 'leave', room: 'ekin2', jwt: jwt.accessToken, username: 'ekin' }));
    now = new Date().getTime();
    client.send(JSON.stringify({ action: 'join', room: 'ekin2', jwt: jwt.accessToken, username: 'ekin' }));
  });
  client.on('message', (data: any) => {
    let msg = JSON.parse(data);
    future = new Date().getTime();
    let callTime = future - now;
    console.log(callTime);
    expect(msg.message).toBe('ekin joined the room');
    client.terminate();
  });
});

test('message', async () => {
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
    jwt: jwt.accessToken,
  };

  const mesage1KB = {
    message:
      'hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello',
    sender: username2,
    room: 'ekin2',
    action: 'message',
    jwt: jwt2.accessToken,
  };

  const message128kb = {
    mesage : text128kb,
    sender: username2,
    room: 'ekin2',
    action: 'message',
    jwt: jwt2.accessToken
  }

  let now: number;
  let future: number;
  const client = new WebSocket(`wss://z2a5fqdqob.execute-api.eu-west-1.amazonaws.com/prod/?jwt=${jwt.accessToken}`);

  client.on('open', () => {
    let client2 = new WebSocket(`wss://z2a5fqdqob.execute-api.eu-west-1.amazonaws.com/prod/?jwt=${jwt2.accessToken}`);
    client2.on('open', () => {
      now = new Date().getTime();
      client2.send(JSON.stringify(message128kb));
    });
  });

  client.on('message', (data: any) => {
    let msg = JSON.parse(data);
    future = new Date().getTime();
    let callTime = future - now;
    console.log(callTime);
    expect(msg.message).toBe(message128kb);
    client.terminate();
  });
});
