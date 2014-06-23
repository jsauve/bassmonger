var path = require('path'),
    appDir = path.dirname(require.main.filename),
    publicDir = path.join(appDir,'../','public/');

module.exports = function(app, passport) {
    app.get('/',function(req,res){
        var indexPath = path.join(publicDir,'index.html');
        res.sendfile(indexPath);
    });

    /*app.all('*//*', function(req, res, next) {
     res.sendfile('./public/index.html');
     });*/

    app.all('/bower_components/*', function(req, res, next) {

        res.sendfile(path.join(publicDir,req.path));
    });

    app.all('/app/*',function(req,res,next){
        res.sendfile(path.join(publicDir,req.path));
    });

    app.all('/css/*',function(req,res,next){
       res.sendfile(path.join(publicDir,req.path));
    });
};