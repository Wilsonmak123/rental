/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  login: async function (req, res) {

    if (req.method == "GET") return res.view('user/login');
   // if (req.method == "GET") return res.redirect('/');

    if (!req.body.username || !req.body.password) return res.badRequest();

    var user = await User.findOne({ username: req.body.username });

    if (!user) return res.status(401).send("User not found");

    const match = await sails.bcrypt.compare(req.body.password, user.password);

  //  if (user.password != req.body.password)
    if (!match) return res.status(401).send("Wrong Password");

    req.session.regenerate(function (err) {

      if (err) return res.serverError(err);

      req.session.role = user.role;
      req.session.username = req.body.username;

      sails.log("[Session] ", req.session);

      if (req.wantsJSON) {
        return res.json({ message: "Login successfully.", url: '/' });    // for ajax request

      } else {
        return res.redirect('/');           // for normal request
      }
     // return res.ok("Login successfully.");



    });

  },

  logout: async function (req, res) {

    req.session.destroy(function (err) {

      if (err) return res.serverError(err);

      return res.redirect('/');

    });
  },

};

