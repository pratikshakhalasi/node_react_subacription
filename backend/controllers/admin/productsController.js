
const ProductsController = {
    index (req, res) {
    	
     	res.render('admin/products/products', { req: req , res: res});
    },

    create (req, res) {
    	
     	res.render('admin/products/add_edit', { req: req , res: res});
    },


};

module.exports = ProductsController;
