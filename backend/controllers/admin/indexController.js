const User = require('../../models/user.model');

const passport = require('passport');

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var bcrypt = require('bcrypt');
const saltRounds = 10;
  		
const IndexController = {
    index (req, res) {
    	console.log(req.session);
     	res.render('admin/dashboard', { req: req , res: res});
    },

    login(req, res){
    	//console.log('here');
    	res.render('admin/login', { title: 'Admin' });

    },
    register(req, res){

    	bcrypt.hash(req.body.password, saltRounds, function (err,   hash) {
		Users =new User({
			email: req.body.email,
			username : req.body.username,
			name: req.body.name,
			password: hash
		}); 

		User.register(Users, req.body.password, function(err, user) { 
			if (err) { 
			  res.json({success:false, message:"Your account could not be saved. Error: ", err})  
			}else{ 
			  res.json({success: true, message: "Your account has been saved"}) 
			} 
		});
	}); 
	

    },
    postlogin(req, res,next){
  		passport.authenticate('local',(err, user, info) => {
  			
		    if (err) {
		      return next(err);
		    }

		    if (!user) {
		       return res.redirect('/admin/login?info=' + info);
		    }

		    req.logIn(user, function(err) {
		      if (err) {
		        return next(err);
		      }

		      return res.redirect('/admin/');
		    });

		  })(req, res, next);
	},	 
    
	apiLogin(req, res,next){
		
		passport.authenticate('local',(err, user, info) => {
			
		  if (err) {
			//return next(err);
			res.json({error: true, message: err}) 
		  }

		  if (!user) {
			 //return res.redirect('/admin/login?info=' + info);
			 res.json({error: true, message: info}) 
		  }

		  req.logIn(user, function(err) {
			if (err) {
			  //return next(err);
			  res.json({error: true, message: "Login failed"}) 
			  
			}
			req.session.user = user;
			res.json({ "loggedIn": '1' , user_id: user._id,user_name: user.username});
		  });

		})(req, res, next);
  },
  apichecklogin	(req, res){
	if(req.session.user){
		res.send({ "loggedIn": '1' , user: req.session.user});
	}else{
		res.send({ "loggedIn": '0' ,user: false});
	}

  }
};

module.exports = IndexController;
