
const createAuth = function(req, res,next){
  
    if (
      req.body.ticketId === undefined ||
      req.body.ticketId.length === 0 
    ) {
      return res.status(400).send("ticketId is mandatory");
    }
    next();
}

module.exports = createAuth;