const createAuth = function (req, res, next) {
  console.log(req.query);
  if (
    req.query.projectId === undefined ||
    req.query.projectId.length === 0 ||
    req.query.customerId === undefined ||
    req.query.customerId.length === 0
  ) {
    return res.status(400).send("customerid and projectid are mandatory");
  }
  next();
};

const readAuth = function (req, res, next) {
    console.log(req.query);
    if (
      req.query.projectId === undefined ||
      req.query.projectId.length === 0 ||
      req.query.customerId === undefined ||
      req.query.customerId.length === 0 ||
      req.query.managerId === undefined ||
      req.query.managerId.length === 0
    ) {
      return res.status(400).send("customerid , managerId  and projectid are mandatory");
    }
    next();
  };

module.exports = { createAuth , readAuth };
