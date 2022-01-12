const express = require("express");
const router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    const [rows, fields] = await global.connection.execute(
      "SELECT * FROM `project`"
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
      "SELECT * FROM `project`  WHERE `id` = ? ",
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
      "INSERT INTO `crm`.`project` (`id` , `title` , `description`) VALUES (?,?,?)",
      [req.body.id, req.body.title, req.body.description]
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
      "UPDATE `project` SET  `title`= ? , `description` = ?  WHERE `id` = ?",
      [req.body.title, req.body.description, req.body.id]
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
      "DELETE FROM `project` WHERE `id`= ? ",
      [req.params.id]
    );
    res.send(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error.");
  }
});

module.exports = router;
