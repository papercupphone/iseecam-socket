interface LoginModel {
  username: string;
  password: string;
}
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

export class Commons {
  public static async login(request: LoginModel): Promise<any> {
    return new Promise((resolve) => {
      let authenticationData = {
        Username: request.username,
        Password: request.password,
      };

      let poolData = {
        UserPoolId: process.env.COGNITO_USER_POOL_ID || '',
        ClientId: process.env.COGNITO_CLIENT_ID || '',
      };

      let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
      let userData = {
        Username: request.username,
        Pool: userPool,
      };

      let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

      let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (res: CognitoUserSession) => {
          let accessToken = res.getAccessToken().getJwtToken();
          resolve({ accessToken });
        },
        onFailure(err: any): void {
          console.log(err);
          resolve({ err });
        },
        newPasswordRequired: (userAttributes, requiredAttributes) => {
          resolve({ userAttributes, requiredAttributes, message: 'New password required.' });
        },
      });
    });
  }
}
