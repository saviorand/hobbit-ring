const server = require('./server');

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(process.env.AWS_ACCESS_KEY_ID);
  console.log(process.env.AWS_SECRET_ACCESS_KEY);
  console.log(process.env.AWS_S3_REGION);
  console.log(process.env.S3_BUCKET_NAME);
});