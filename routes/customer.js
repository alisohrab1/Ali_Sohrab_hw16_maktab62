const express = require("express");
const router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    const [rows, fields] = await global.connection.execute(
      "SELECT * FROM `customer` "
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
      "SELECT * FROM `customer`  WHERE `id` = ? ",
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
    let customerId = Math.floor(Math.random() * 1000);
    const [rows, fields] = await global.connection.execute(
      "INSERT INTO `crm`.`customer` (`id` , `type` , `name` , `income` , `createdAt` , `phoneNumber`) VALUES (?,?,?,?,?,?)",
      [
        customerId,
        req.body.type,
        req.body.name,
        req.body.income,
        req.body.createdAt,
        req.body.phoneNumber,
      ]
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
      "UPDATE `customer` SET  `type` = ? , `name` = ?  , `income` = ? , `createdAt` = ?  , `phoneNumber` = ? WHERE `id` = ?",
      [
        req.body.type,
        req.body.name,
        req.body.income,
        req.body.createdAt,
        req.body.phoneNumber,
        req.body.id,
      ]
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
      "DELETE FROM `customer` WHERE `id`= ? ",
      [req.params.id]
    );
    res.send(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error.");
  }
});

module.exports = router;
