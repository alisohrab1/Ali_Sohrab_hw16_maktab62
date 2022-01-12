const express = require('express');
const router = express.Router();
const makeConnection = require("../models/connection");
const projectRouter = require("./project");
const customerRouter = require("./customer");
const managerRouter = require("./manager");
const ticketRouter = require("./ticket");
const messageRouter = require("./message");

router.get("/" , (req, res) => {
    res.send("working");
})

makeConnection().then(function (conn) {
    // app.use("/project", projectRouter({ connection: conn }));
    global["connection"] = conn;
    router.use("/project", projectRouter);
    router.use("/customer", customerRouter);
    router.use("/manager",managerRouter);
    router.use("/ticket",ticketRouter);
    router.use("/message",messageRouter);
});




module.exports = router;