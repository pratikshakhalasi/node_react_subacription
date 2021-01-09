const Package = require('../../models/package.model');
const Subscription = require('../../models/subscription.model');
const stripe = require('stripe')('sk_test_51GfLMaAkg8ywevJyHPjpSqRAccjNPdQI3GNeZpCuu6kNDgTE14TDOY1wDr32ZUlKzel2qds2pY0nD4eTxeu9NDgp00a3mLsVMe');
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

                        //save to database
                        data = {"customer_id": customer.id,
                                "user_id":token.user_id,
                                "package_id":token.package_id,
                                "package_amount": package.amount,
                                "subscription_date": new Date()
                            }
                        console.log(data);
                        console.log('test here ');
                        var myData = new Subscription(data);
                        myData.save();
                        
                
                }).then(result => res.status(200).json(result))
                .catch(err => console.log(err) ) 
        });
    }

   
};

module.exports = PackagesController;
