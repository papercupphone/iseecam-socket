import {Lambda, AWSError} from "aws-sdk"
import {InvocationResponse} from "aws-sdk/clients/lambda"

export class LambdaService {

    private lambda: Lambda

    constructor() {
        this.lambda = new Lambda({
            region: process.env.AWS_REGION || 'eu-west-1'
        })
    }

    async invoke(functionName: string, requestBody: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.lambda.invoke({
                FunctionName: functionName,
                Payload: JSON.stringify(requestBody)
            }, function (error: AWSError, data: InvocationResponse) {
                if (error) {
                    reject(error)
                } else {
                    resolve(data.Payload)
                }
            })
        })
    }
}