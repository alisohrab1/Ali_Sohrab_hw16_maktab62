const express = require("express");
const port = 5000;
const app = express();
const routes = require("./routes/routes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
