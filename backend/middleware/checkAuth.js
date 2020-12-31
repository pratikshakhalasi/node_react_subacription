module.exports = function () {
  return function (req, res, next) {
  		console.log(req);
	   if (!req.session.user_id) {
	    res.send('You are not authorized to view this page');
	  } else {
	    next();
	  }
  }
}

