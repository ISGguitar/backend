const dbConnection = require('./connectToMongoDB');
//user model

function userModel() {
	this.collectionName = 'users';
};

userModel.prototype.createUser = (userJSON) => {
	return new Promise((resolve, reject) => {
		dbConnection.readInDB('users', 'email', userJSON.email).then((user) => {
			if (user) {
				resolve();
			} else {
				dbConnection.createInDB('users', userJSON).then((err) => {
				if (err) {
					reject(err);
				}
				resolve(true);
				}).catch((err) => {
					reject(err);
				});
			}
		}).catch((err) => {
			reject(err);
		});
	});
}

userModel.prototype.getUser = (userJSON) => {
	return new Promise((resolve, reject) => {
		dbConnection.readInDB('users', 'email', userJSON.email).then((user) => {
			resolve(user);
		}).catch((err) => {
			reject(err);
		});
	});
}

userModel.prototype.changePassword = (searchCriteriaJSON, validatedJSON) => {
	return new Promise((resolve, reject) => {
		dbConnection.updateInDB('users', searchCriteriaJSON, validatedJSON).then((data) => {
			resolve(data);
		}).catch((err) => {
			reject(err);
		});
	});
}

//should work as "change password", in this implementation
userModel.prototype.updateProfile = (searchCriteriaJSON, validatedJSON) => {
return new Promise((resolve, reject) => {
		dbConnection.updateInDB('users', searchCriteriaJSON, validatedJSON).then((data) => {
			resolve(data)
		}).catch((err) => {
			reject(err);
		});
	});
}

module.exports = userModel;