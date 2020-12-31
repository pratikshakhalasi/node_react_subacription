const { json } = require('body-parser');
const User = require('../../models/user.model');
const UsersController = {
    index (req, res) {
       
        var reports = User.find(); 
        User.find({}, function(err, data) {
            // note that data is an array of objects, not a single object!
            res.render('admin/users', { req: req , res: res,reports: data} );
        });

       
    },


};

module.exports = UsersController;
