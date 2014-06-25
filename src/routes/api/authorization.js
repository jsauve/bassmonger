var mongoose = require('mongoose');
var Users = mongoose.model('Users');

module.exports = function(app,passport){
    app.get('/auth/google',function(req, res, next){

        passport.authenticate('google',{scope:'https://www.googleapis.com/auth/userinfo.email'},function(err,user,info){
            console.log(err);
            console.log(user);
            console.log(info);
        })(req,res,next);
    });

    app.get('/auth/google/callback',function(req,res,next){

        passport.authenticate('google',function(err, user, info) {
            if(err) {
                return next(err);
            }
            if(!user) {
                return res.redirect('/');
            }
            Users.findOne({email: user._json.email},function(error,usr) {
                if(error){
                    return res.send(500);
                }

                res.writeHead(302, {
                    'Location': 'http://localhost:5000/#/index?token=' + usr.token + '&user=' + usr.email
                });
                res.end();
            });
        })(req,res,next);

    });
}
