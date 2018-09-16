function log(req, res, next) {
    console.log("Authenticating!!!");
    next();
}
// creating a local middleware
module.exports = log;