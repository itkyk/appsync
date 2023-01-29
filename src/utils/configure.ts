import {Amplify} from "aws-amplify";

export const configure = (config: any) => {
  Amplify.configure(config);
}

interface ConfigInterface {
  aws_project_region?: string;
  aws_appsync_graphqlEndpoint?: string;
  aws_appsync_region?: string;
  aws_appsync_authenticationType?: string;
  aws_appsync_apiKey?: string;
  [index: string]: any;
}

export const AmplifyConfig = (config: ConfigInterface) => {
  return config
}