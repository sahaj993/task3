const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

module.exports.home = function (req, res) {
  return res.render("home", {
    title: "Home",
  });
};

module.exports.register = function (req, res) {
  return res.render("register", {
    title: "Sign Up Page",
  });
};

module.exports.create = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      if (req.body.password != req.body.confirm_password) {
        return res.redirect("back");
      }
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
    //   console.log(hashedPassword);
      let newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      return res.redirect("./login");
    } else {
      console.log("User already exists");
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

module.exports.login = function (req, res) {
  return res.render("login", {
    title: "Sign In Page",
  });
};

module.exports.createSession = async function(req, res) {
    try {
        let user = await User.findOne({email: req.body.email});
        const checkPassword = bcrypt.compareSync(req.body.password, user.password);
        if (!user || !checkPassword){
            console.log('Invalid Username or Password');
            return res.redirect('back')
        }
        else{
            let token = jwt.sign(user.toJSON(), 'authentication', {expiresIn: '100000'})
            console.log(token);
            return res.redirect('/profile');
        }
    }catch(err) {
        console.log(err);
        return res.redirect('back')
    }
}

module.exports.profile = function (req, res) {
  return res.render("profile");
};
