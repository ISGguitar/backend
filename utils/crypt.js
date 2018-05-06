const bcrypt = require('bcrypt');

//separated from controllers and models hash functions

function generateHash(password) {
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(getRandomInt(9), (err, salt) => {
			if (err) {
				reject(err);
			}
	    	bcrypt.hash(password, salt, (err, hash) => {
	    		if (err) {
	    			reject(err);
	    		}
	    		resolve(hash);
		    });
		});
	});
}

function checkHash(password, hash) {
	return new Promise((resolve, reject) => {
		bcrypt.compare(password, hash, (err, res) => {
 			if (err) {
 				reject(err);
 			}
 			resolve(res);
		});
	});
}

function generateHashTest(password) {
	generateHash(password).then((data) => {
		console.log(data);
	}).catch((err) => {
		console.log(err);
	});
}

function checkHashTest(password, hash) {
	checkHash(password, hash).then((data) => {
		console.log(data);
	}).catch((err) => {
		console.log(err);
	});
}

//super simple random generator
function getRandomInt(max) {
  return (Math.floor(Math.random() * Math.floor(max)))+1;
  //console.log(getRandomInt(9));
}

module.exports.checkHash = checkHash;
module.exports.generateHash = generateHash;

// expected output: 0, 1 or 2
// some things for a test
// const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';
// const hash = '$2a$10$.gUdUMwUP2xvYz5tugriCuaEVdPuMVz39ZmOr/KrRFmWtSJT08QKi'

// generateHashTest();
// checkHashTest(someOtherPlaintextPassword, hash);
// checkHashTest(myPlaintextPassword, hash);
