const express = require("express");
const router = express.Router();
const createAuth = require("../middleware/message");

router.get("/", async function (req, res, next) {
  try {
    const [rows, fields] = await global.connection.execute(
      "SELECT * FROM `message` "
    );
    res.send(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error.");
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const [rows, fields] = await global.connection.execute(
      "SELECT * FROM `message` WHERE `id` = ? ",
      [req.params.id]
    );
    res.send(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error.");
  }
});

router.post("/", createAuth);
router.post("/", async function (req, res, next) {
  try {
    let messageId = Math.floor(Math.random() * 1000);
    const [rows, fields] = await global.connection.execute(
      "INSERT INTO `crm`.`message` (`id` , `sender` , `body` ,`createdAt` , `ticketId`) VALUES (?,?,?,?,?)",
      [
        messageId,
        req.body.sender,
        req.body.body,
        req.body.createdAt,
        req.body.ticketId,
      ]
    );
    res.send(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error.");
  }
});

router.put("/:id", async function (req, res, next) {
    try {
        const [rows, fields] = await global.connection.execute(
          "UPDATE `message` SET  `sender` = ? , `body` = ? ,  `createdAt` = ? , `ticketId` = ? WHERE `id` = ?",
          [
            req.body.sender,
            req.body.body,
            req.body.createdAt,
            req.body.ticketId,
            req.params.id
          ]
        );
        res.send(rows);
      } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error.");
      }
});

router.delete("/:id" , async function(req, res, next){
    try {

        const [rows,fields] = await global.connection.execute(
          "DELETE FROM `message` WHERE `id` = ?",
          [req.params.id]
        );
        res.send(rows)
        
      } catch (error) {
        console.log(error);
        res.send(error)
        
      }
})


module.exports = router;
