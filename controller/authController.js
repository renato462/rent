const User = require("../model/user");
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
  res.render("auth/login");
};

exports.postLogin = (req, res, next) => {

};

exports.getRegister = (req, res, next) => {
  res.render("auth/register");
};

exports.postRegister = (req, res, next) => {
    console.log(req.session.isLogined);
    req.session.isLogined = true
    res.redirect("/register");


    // User.findOne({email: req.body.email})
    // .then(userExist => {
    //     if(userExist){
    //         return res.redirect('/register');
    //     }
    //     return bcrypt
    //     .hash(req.body.password,12)
    //     .then(hashPassword => {
    //         user = new User({
    //             email: req.body.email,
    //             userName: req.body.userName,
    //             password: hashPassword
    //         });
    //         return user.save();
    //     })
    //     .then( result => {
    //         res.redirect('/');
    //     })
    // })
    // .catch(error => console.log(error));
}
