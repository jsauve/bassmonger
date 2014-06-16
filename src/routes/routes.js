module.exports = function(app, passport) {
    console.log('yaya');

    app.get('/',function(req,res){
        res.sendfile('./public/index.html!');
    });

    /*app.all('*//*', function(req, res, next) {
     res.sendfile('./public/index.html');
     });*/

    app.all('/public/*', function(req, res, next) {
        res.sendfile(req.path);
    });
};