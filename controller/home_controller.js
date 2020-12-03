module.exports.home = function(req,res){
    return res.render('home', {
        title: "Home"
    });
}

module.exports.register = function(req,res){
    return res.render('register', {
        title: "Sign Up Page"
    });
}

module.exports.login = function(req,res){
    return res.render('login', {
        title: "Sign In Page"
    });
}

module.exports.profile = function(req,res){
    return res.render('profile');
}