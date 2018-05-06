const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');
const SessionController = require('../controllers/sessionController');
const responseHandler = require('../controllers/responseHandler');

const user = new UserController();
const session = new SessionController();
const resHandler = new responseHandler();

function userAuthorised(req, res, next) {
	session.userLogged(req.session.id).then((result) => {
		if (!result) {
			resHandler.sendError(res, `invalid credentials: ${req.session.id}`);
		} else
			next();
	}).catch((err) => {
		resHandler.sendError(res, "auth required");
	});
}

function userNotAuthorised(req, res, next) {
	session.userLogged(req.session.id).then((result) => {
		if (!result) {
			next();
		} else
			resHandler.sendError(res, "already authorized try /api/user/logout")
	}).catch((err) => {
		resHandler.sendError(res, "auth required");
	});
}


//free api
router.get('/', userAuthorised, (req, res, next) => {
	resHandler.sendOk(res, req.session.id);
});

// router.get('/test', userNotAuthorised, (req, res, next) => {
router.get('/test', (req, res, next) => {	
	res.render('index', { title: 'Authorization tests' });
})


router.get('/product', userAuthorised, (req, res, next) => {
	resHandler.notImplemented(res);
});

router.get('/product/:id', userAuthorised, (req, res, next) => {
	resHandler.notImplemented(res);

});

router.get('/search/:name', userAuthorised, (req, res, next) => {
	resHandler.notImplemented(res);

});


//registration
router.post('/user/register', userNotAuthorised, (req, res, next) => {
	
	let userJSON = {
		name: req.body.nickname,
		email: req.body.email,
		password: req.body.password,
		birthdate: req.body.birthdate
		};

	user.register(userJSON).then((result) => {
		if (!result) {
			resHandler.sendError(res, "Already exists");
		} else {
			if (result === true) {
				resHandler.sendOk(res, result);
			} else {
				resHandler.sendError(res, result);
			}
		}
	}).catch((err) => {
		resHandler.sendError(res, err);
	});
});

//authorization
router.post('/user/login', userNotAuthorised, (req, res, next) => {
	let userJSON = {
		email: req.body.email,
		password: req.body.password
		};

	user.login(userJSON).then((result) => {
		if (!result) {
			resHandler.sendNotFound(res);
		} else {
			session.saveSession(req.session.id, result.email).then((saveSessionResult) => {
				resHandler.sendOk(res, saveSessionResult);
			}).catch((err) => {
				resHandler.sendError(res, err);
			});
		}
	}).catch((err) => {
		resHandler.sendError(res, err);
	});
});

router.get('/user/logout', (req, res, next) => {
	req.session.destroy(function(err) {
  		// cannot access session here
  		next(err);
	});
	resHandler.sendOk(res);
});
// get & update profile
router.get('/user/profile', userAuthorised, (req, res, next) => {
	session.userLogged(req.session.id).then((result) => {
		user.getUser(result).then((result) => {
			resHandler.sendOk(res, result);
		}).catch((err) => {
			resHandler.sendError(res, err);
		});
	}).catch((err) => {
		resHandler.sendError(res, err);
	});
});

router.put('/user/profile', userAuthorised, (req, res, next) => {
	resHandler.notImplemented(res);
});

router.post('/user/changepassword', userAuthorised, (req, res, next) => {
	
	let userJSON = {
		email : req.params.email,
		oldPassword : req.body.oldPassword,
		newPassword : req.body.newPassword
	}
	console.log(userJSON)

	user.changePassword(userJSON).then((result) => {
		if (!result) {
			resHandler.sendError(res, `Bad credential or something went wrong: ${req.params.email}`);
		} else {
			resHandler.sendOk(res, result);
		}
	}).catch((err) => {
		resHandler.sendError(res, err);
	});
});

// lists
//all
router.get('/user/list', userAuthorised, (req, res, next) => {
	resHandler.notImplemented(res);
});
//get one
router.get('/user/list/:id', userAuthorised, (req, res, next) => {
	resHandler.notImplemented(res);
});
//create one
router.post('/user/list', userAuthorised, (req, res, next) => {
	resHandler.notImplemented(res);
});
//update one
router.put('/user/list/:id', userAuthorised, (req, res, next) => {
	resHandler.notImplemented(res);
});
// delete one
router.delete('/user/list/:id', userAuthorised, (req, res, next) => {
	resHandler.notImplemented(res);
});

module.exports = router;
