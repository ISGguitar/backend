const userModel = require('../models/user');

const generateHash = require('../utils/crypt').generateHash;
const checkHash = require('../utils/crypt').checkHash;

//little validation for hash
function returnUserProfile(user) {
	return new Promise((resolve) => {
		resolve( {
			name : user.name || "",
			email : user.email,
			birthdate : user.birthdate || ""
		} );
	});
}

function userController() {};

userController.prototype.register = (userJSON) => {
	return new Promise((resolve, reject) => {
		generateHash(userJSON.password).then((hashedPassword) => {
			userJSON.password = hashedPassword;
		}).then(() => {
			let user = new userModel();
			user.createUser(userJSON).then((result) => {
				resolve(result);
			}).catch((err) => {
				reject(err);
			});
		}).catch((err) => {
			reject(err);
		});
	});
}

userController.prototype.getUser = (userJSON) => {
	return new Promise((resolve, reject) => {
		let user = new userModel;
		user.getUser(userJSON).then((getUserResult) => {
			returnUserProfile(getUserResult).then((result) => {
				resolve(result);
			}).catch((err) => {
				reject(err);
			});
		}).catch((err) => {
			reject(err);
		});
	});
}

userController.prototype.login = (userJSON) => {
	return new Promise((resolve, reject) => {
		let user = new userModel();
		user.getUser(userJSON).then((getUserResult) => {
			checkHash(userJSON.password, getUserResult.password).then((passwordIsValid) => {
				if (passwordIsValid === true) {
					resolve(getUserResult);
				} else {
					resolve();
				}
			}).catch((err) => {
				reject(err);
			});
		}).catch((err) => {
		reject(err);
		});
	});
}

userController.prototype.changePassword = (userJSON) => {
	return new Promise((resolve, reject) => {
		let user = new userModel();
		user.getUser(userJSON).then((getUserResult) => {
			checkHash(userJSON.oldPassword, getUserResult.password).then((passwordIsValid) => {
				if (passwordIsValid === true) {
					generateHash(userJSON.newPassword).then((hashedPassword) => {
						user.changePassword( { "email" : getUserResult.email  }, { "password" : hashedPassword} ).then((result) => {
							resolve(result);
						}).catch((err) => {
							reject(err);
						});
					}).catch((err) => {
						reject(err);
					});
				} else {
					resolve();
				}
			}).catch((err) => {
				reject(err);
			});
		}).catch((err) => {
			reject(err);
		});
	});
}

// userController.prototype.updateProfile = (userJSON) => {
// 	return new Promise((resolve, reject) => {
// 		let user = new userModel();
// 		user.getUserResult(userJSON).then((getUserResult) => {
// 			let validatedUserJSON = {
// 				name: userJSON.name || getUserResul.name,
// 				birthdate: userJSON.birthdate || getUserResult.birthdate,
// 				about: userJSON.about || getUserResul.about,
// 			}
// 			// user.updateProfile
// 		})
// 	});
// }

module.exports = userController;