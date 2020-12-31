const Package = require('../../models/package.model');
const PackagesController = {
    index (req, res) {
    	
        Package.find({}, function(err, data) {
            // note that data is an array of objects, not a single object!
            res.render('admin/packages/packages', { req: req , res: res,packages:data});
        });
     	
    },

    create (req, res) {
    	
     	res.render('admin/packages/add_edit', { req: req , res: res});
    },
    save(req, res){
       
        var myData = new Package(req.body);
        myData.save()
        .then(item => {
            return res.redirect('/admin/packages?info=' + "Your package has been saved");
        })
        .catch(err => {
            
            return res.redirect('/admin/packages/create?err=' + err);
        });
    },
    apigetPackage(req,res){
        Package.find({}, function(err, data) {
            // note that data is an array of objects, not a single object!
            res.json({ data });
        });
        
    }

   
};

module.exports = PackagesController;
