class checkAuth {
  static chechUserAuth(req, res) {
    res.json(req.user);
  }
}
module.exports = checkAuth;
