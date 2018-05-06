const express = require('express');
const User = require('../controllers/userController');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
	res.render('index', { title: 'Authorization tests' });
	//console.log('Cookies: ', req.cookies);
});

router.get('/logout/complete', (req, res, next) => {
	req.session.destroy((err) => {
		res.status(500).send( {"response" : err} );
	});
	res.status(500).send( {"response" : 'ok'} );
});

router.post('/signup/complete', (req, res, next) => {

	let userJSON = {
		name: req.body.nickname,
		email: req.body.email,
		password: req.body.password,
		birthdate: req.body.birthdate
		};

	let user = new User();

	user.signIn(userJSON).then((response) => {
		res.status(200).send( {"response" : response} );
	}).catch((err) => {
		res.status(500).send( {"response" : err} );
	});
});

router.post('/signin/complete', (req, res, next) => {

	let userJSON = {
		email: req.body.email,
		password: req.body.password,
		session: req.session.id
		};

	let user = new User();

	user.signIn(userJSON).then((email) => {
		req.session.email = email;
		res.status(200).send( {"response" : req.session} );
	}).catch((err) => {
		req.session.destroy((err) => {
			if (err) {
				res.status(500).send( {"response" : err} );
			}
		});
		res.status(404).send( {"response" : err} );
	});
});

router.post('/changePassword/complete', (req, res, next) => {

	let userJSON = {
		email: req.body.email,
		password: req.body.password,
		newPassword: req.body.newPassword,
		};

	let user = new User();
	user.changePassword(userJSON).then((response) => {
		res.status(200).send( {"response" : response} );
	}).catch((err) => {
		res.status(500).send( {"response" : err} );
	});
});

module.exports = router;