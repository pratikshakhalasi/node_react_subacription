const Package = require('../../models/package.model');
const stripe = require('stripe')('sk_test_HfBt6o9qPAElPsHcOhOFE97w00nQdQhopr');
const { v4: uuidv4 } = require('uuid');
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
        
    },
    apiToken(req,res){

        const token = req.body.token;
        console.log( req.body);
        var query = { _id: token.package_id };
        console.log( token.package_id);
        var package = {};
        Package.findOne(query, function(err, package) {
           
           // const  idempontencyKey = uuidv4();
    
            return  stripe.customers.create({
                    email: token.email,
                    source: token.id
                }).then(customer => {
                    stripe.charges
                        .create({
                            customer: customer.id, // set the customer id
                            amount: package.amount * 100,
                            currency: 'INR',
                            description: 'package subscription:'+package.name,
                        })
                        
                
                }).then(result => res.status(200).json(result))
                .catch(err => console.log(err) ) 
        });
    }

   
};

module.exports = PackagesController;
