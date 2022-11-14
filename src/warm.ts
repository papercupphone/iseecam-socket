import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { HealthService } from './service/health.service';
import { LambdaService } from './service/lambda.service';

const lambdaService: LambdaService = new LambdaService();
const healthService: HealthService = new HealthService();
export const handler = async (event: APIGatewayProxyEvent | string): Promise<APIGatewayProxyResult | any> => {
  if (typeof event === 'string') {
    return event;
  }

  let functions = [
    'ISeeCamSocketConnectFunction',
    'ISeeCamSocketLeaveFunction',
    'ISeeCamSocketJoinFunction',
    'ISeeCamSocketMessageFunction',
  ];

  functions.forEach(async (functionName) => {
    await lambdaService.invoke(functionName, 'ping');
  });

  return await healthService.check();
};
