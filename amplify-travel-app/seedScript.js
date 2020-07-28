const awsConfig = require("./aws-exports").default;
const AWS = require("aws-sdk");
const Amplify = require("aws-amplify").default;
const { default: Auth } = require("@aws-amplify/auth");
const { API } = Amplify;

const { listPosts } = require("./src/graphql/queries");
const { createPost } = require("./src/graphql/mutations");

const { aws_project_region } = awsConfig;

AWS.config.update({ region: aws_project_region });
Amplify.configure(awsConfig);

const loginCognitoUserByApi = async ({ username, password }) => {
  global.fetch = require("node-fetch");

  return await Auth.signIn({ username, password });
};

const fetchPosts = async () => await API.graphql({ query: listPosts, variables: { limit: 100 } });

const newPost = async (postInfo) =>
  await API.graphql({ query: createPost, variables: { input: postInfo } });

loginCognitoUserByApi({ username: "kevin", password: "s3cret123$" }).then(
  async (cognitoResponse) => {
    await newPost({ name: `Test`, description: "Test Desc", location: "Test location" });
    const posts = await fetchPosts();
    console.log(posts.data.listPosts.items);
  }
);
