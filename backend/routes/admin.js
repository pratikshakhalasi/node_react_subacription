var express = require('express');
var connectEnsureLogin = require('connect-ensure-login');

var router = express.Router();

var adminIndexController = require('../controllers/admin/indexController');
var adminProductsController = require('../controllers/admin/productsController');
var adminOrdersController = require('../controllers/admin/ordersController');
var adminUsersController = require('../controllers/admin/usersController');
var adminCouponsController = require('../controllers/admin/couponsController');
var adminPackagesController = require('../controllers/admin/packagesController');
const { _router } = require('../app');

router.get('/',connectEnsureLogin.ensureLoggedIn('/admin/login'), adminIndexController.index);
router.get('/login', adminIndexController.login);
router.post('/login', adminIndexController.postlogin);
router.post('/register', adminIndexController.register);
router.post('/apilogin', adminIndexController.apiLogin);
router.post('/apitoken',adminPackagesController.apiToken);
router.get('/apichecklogin',adminIndexController.apichecklogin);

router.get('/products',connectEnsureLogin.ensureLoggedIn('/admin/login'), adminProductsController.index);
router.get('/orders',connectEnsureLogin.ensureLoggedIn('/admin/login'), adminOrdersController.index);
router.get('/users',connectEnsureLogin.ensureLoggedIn('/admin/login'), adminUsersController.index);
router.get('/coupons',connectEnsureLogin.ensureLoggedIn('/admin/login'), adminCouponsController.index);
router.get('/packages',connectEnsureLogin.ensureLoggedIn('/admin/login'), adminPackagesController.index);
router.get('/packages/create',connectEnsureLogin.ensureLoggedIn('/admin/login'), adminPackagesController.create);
router.post('/packages/save',connectEnsureLogin.ensureLoggedIn('/admin/login'), adminPackagesController.save);
router.get('/packages/apigetPackage',adminPackagesController.apigetPackage);






router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/admin');
});


module.exports = router;
