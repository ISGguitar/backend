const sessionModel = require('../models/session');

//update session 
function sessionController() {};

sessionController.prototype.userLogged = (sessionID) => {
	return new Promise((resolve, reject) => {
		const session = new sessionModel();
		session.getSession(sessionID).then((data) => {
			if (data.email) {
				resolve(data);
			} else {
				resolve();
			}
		}).catch((err) => {
			reject(err);
		});
	});
}

sessionController.prototype.saveSession = (sessionID, email) => {
	return new Promise((resolve, reject) => {
		const session = new sessionModel();
		session.updateSession( { "_id" : sessionID}, { "email" : email } ).then((data) => {
			resolve(data);
		}).catch((err) => {
			reject(err);
		});
	});
}

module.exports = sessionController;