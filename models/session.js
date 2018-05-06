const dbConnection = require('./connectToMongoDB');

function sessionController() {};

sessionController.prototype.getSession = (sessionID) => {
	return new Promise((resolve, reject) => {
		dbConnection.readInDB('sessions', '_id', sessionID).then((session) => {
			resolve(session);
		}).catch((err) => {
			reject(err);
		});
	});
}

sessionController.prototype.updateSession = (searchCriteriaJSON, validatedJSON) => {
	return new Promise((resolve, reject) => {
		dbConnection.updateInDB('sessions', searchCriteriaJSON, validatedJSON).then((data) => {
			resolve(data);
		}).catch((err) => {
			reject(err);
		});
	});
}

module.exports = sessionController;