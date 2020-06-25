const awsConfig = require("../../aws-exports").default;
const AWS = require("aws-sdk");
const Amplify = require("aws-amplify").default;
const { default: Auth } = require("@aws-amplify/auth");

const {
  aws_project_region,
  aws_cognito_identity_pool_id,
  aws_cognito_region,
  aws_user_pools_id,
  aws_user_pools_web_client_id,
} = awsConfig;

AWS.config.update({ region: aws_project_region });
Amplify.configure(awsConfig);

const loginCognitoUserByApi = async ({ username, password }) => {
  global.fetch = require("node-fetch");

  return await Auth.signIn({ username, password });
};

module.exports = (on, config) => {
  config.env.CognitoIdentityPoolId = aws_cognito_identity_pool_id;
  config.env.CognitoRegion = aws_cognito_region;
  config.env.CognitoUserPoolId = aws_user_pools_id;
  config.env.CognitoUserPoolClientId = aws_user_pools_web_client_id;

  on("task", {
    loginCognitoUserByApi,
  });

  return config;
};
