const express = require("express");
const router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    const [rows, fields] = await global.connection.execute(
      "SELECT * FROM `manager`"
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
      "SELECT * FROM `manager`  WHERE `id` = ? ",
      [req.params.id]
    );
    res.send(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error.");
  }
});

router.post("/", async function (req, res, next) {
  try {
    const [rows, fields] = await global.connection.execute(
      "INSERT INTO `crm`.`manager` (`id` , `name` , `phoneNumber` , `nationalCode`) VALUES (?,?,?,?)",
      [req.body.id, req.body.name, req.body.phoneNumber, req.body.nationalCode]
    );
    res.send(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error.");
  }
});

router.put("/", async function (req, res, next) {
  try {
    const [rows, fields] = await global.connection.execute(
      "UPDATE `manager` SET  `name`= ? , `phoneNumber` = ? , `nationalCode` = ?   WHERE `id` = ?",
      [req.body.name, req.body.phoneNumber, req.body.nationalCode, req.body.id]
    );
    res.send(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error.");
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    const [rows, fields] = await global.connection.execute(
      "DELETE FROM `manager` WHERE `id`= ? ",
      [req.params.id]
    );
    res.send(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error.");
  }
});

module.exports = router;
