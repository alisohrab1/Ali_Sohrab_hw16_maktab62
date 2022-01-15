const express = require("express");
const port = 5000;
const app = express();
const routes = require("./routes/routes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);
//uncut exception

app.use((error,req,res,next) => {
  res.send(error);
})

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
//unhandled rejection
//promises
process.on("unhandledRejection" , (err)=>{

})
console.log(x);
//sync
process.on("uncutException" , (err)=>{

})