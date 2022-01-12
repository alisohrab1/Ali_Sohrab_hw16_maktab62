const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const {createAuth , readAuth} = require("../middleware/ticket");

router.get('/', readAuth)
router.get("/", async function (req, res, next) {
  try {
    const [rows, fields] = await global.connection.execute(
      "SELECT * FROM `pcm` JOIN `ticket` on `pcm`.`id` = `ticket`.`pcmId` WHERE `pcm`.`managerId` = ? AND `pcm`.`customerId`= ? AND `pcm`.`projectId` = ? ",
      [req.query.managerId, req.query.customerId, req.query.projectId]
    );
    res.send(rows);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.post("/", createAuth);
router.post("/", async function (req, res, next) {

  try {
    const numberOfManagers = await global.connection.execute(
      "SELECT COUNT(*) FROM `manager`"
    );
    let number = numberOfManagers[0][0]["COUNT(*)"];
    let managerId = Math.floor(Math.random() * (number - 1) + 1);
    console.log("manger id", managerId);
    let pcmId = Math.floor(Math.random() * 1000);
    let ticketId = Math.floor(Math.random() * 1000);
    await global.connection.execute(
      "INSERT INTO `crm`.`pcm` (`id`,`managerId` , `customerId` , `projectId`) VALUES (?,?,?,?)",
      [pcmId, managerId, req.query.customerId, req.query.projectId]
    );
    const [rows, fields] = await global.connection.execute(
      "INSERT INTO `crm`.`ticket` (`id`,`status` , `title` , `description` , `closedAt` , `createdAt` , `solution` , `pcmId`) VALUES (?,?,?,?,?,?,?,?)",
      [
        ticketId,
        req.body.status,
        req.body.title,
        req.body.description,
        req.body.closedAt,
        req.body.createdAt,
        req.body.solution,
        pcmId,
      ]
    );
    res.send(rows);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});


router.put("/:id", async function (req, res, next) {
  try {
    const [rows, fields] = await global.connection.execute(
      "UPDATE `ticket` SET  `status` = ? , `title` = ?  , `description` = ? ,`closedAt` = ?  ,`createdAt` = ?  , `solution` = ? WHERE `id` = ?",
      [
        req.body.status,
        req.body.title,
        req.body.description,
        req.body.closedAt,
        req.body.createdAt,
        req.body.solution,
        req.params.id,
      ]
    );
    res.send(rows);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});


router.delete("/:id", async function (req,res,next) {

  try {

    const [rows,fields] = await global.connection.execute(
      "DELETE FROM `ticket` WHERE `id` = ?",
      [req.params.id]
    );
    res.send(rows)
    
  } catch (error) {
    console.log(error);
    res.send(error)
    
  }

} )
module.exports = router;
