
const CouponsController = {
    index (req, res) {
    	console.log(req.session);
     res.render('admin/coupons', { req: req , res: res});
    },

};

module.exports = CouponsController;
