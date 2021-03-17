const express = require("express");
const bodyParser = require("body-parser");
const {graphqlHTTP} = require("express-graphql");
const serverless = require("serverless-http");
const schema = require('../schema');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
  "/",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {});

// module.exports = app;

module.exports.handler = serverless(app);
