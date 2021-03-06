const express = require("express");
const cors = require("cors");
const expressGraphql = require("express-graphql");
const schema = require("./src/schema/schema");
const app = express();

app.use(express.json());

app.use(cors());

app.use(
  "/graphql",
  expressGraphql({
    schema,
    graphiql: true
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
