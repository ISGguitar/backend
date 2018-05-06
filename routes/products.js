var express = require('express');
var router = express.Router();

/* GET products listing. */
router.get('/', function(req, res, next) {
  res.send(productList);
});

router.get('/:id', function(req, res, next) {
	if (req.params.id == product.id) {
		res.send(product);
	} else {
		res.status(404).send(`Product #${req.params.id} not found\n`);
	}
});

//TODO
router.post('/:id', function(req, res, next) {
	if (req.params.id == product.id) {
		res.send(`Product ${req.params.id} was changed:\n` + product);
	} else {
		res.status(404).send(`Product #${req.params.id} not found\n`);
	}
});

//TODO
router.post('/:id', function(req, res, next) {
	if (req.params.id == product.id) {
		res.send(`Product ${req.params.id} was changed:\n` + product);
	} else {
		res.status(404).send(`Product #${req.params.id} not found\n`);
	}
});

router.delete('/:id', function(req, res, next) {
	if (req.params.id == product.id) {
		res.send('Product was deleted\n');
	} else { 
		res.status(404).send(`Product #${req.params.id} not found\n`);
	}
});

module.exports = router;


const product = {
	id:0,
	name:'intro',
	length: 300,
	artist:'Sergei Ikonnikov'
};


const productList = {
	1:product,
	2:product
};