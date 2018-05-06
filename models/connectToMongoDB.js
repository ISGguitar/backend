const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'test';
 
// Use connect method to connect to the server
function connectToMongoDB() {
	return new Promise((resolve, reject) => {
		MongoClient.connect(url, (err, client) => {
			if (err) {
				reject(err);
			}
			resolve(client);
		});
	});
}

//optional thing works for everyone
let insertDocument = (db, collectionName, validatedJSON) => {
	return new Promise((resolve, reject) => {
		const collection = db.collection(collectionName);
		collection.insert(validatedJSON).then(() => {
			resolve();
		}).catch((err) => {
			reject(err);
		});
	});
}

let findDocument = (db, collectionName, fieldName, value) => {
	return new Promise((resolve, reject) => {
		const collection = db.collection(collectionName);
		collection.findOne( {[fieldName] : value} ).then((data) => {
			resolve(data);
		}).catch((err) => {
			reject(err);
		});
	});
}

let updateDocument = (db, collectionName, searchCriteriaJSON, validatedJSON) => {
	return new Promise((resolve, reject) => {
		const collection = db.collection(collectionName);
		collection.updateOne(searchCriteriaJSON, validatedJSON).then((data) => {
			resolve(data);
		}).catch((err) => {
			reject(err);
		});
	});
}

let deleteDocument = (db, collectionName, fieldName, value) => {
	return new Promise((resolve, reject) => {
		const collection = db.collection(collectionName);
		(collection.deleteOne( { [fieldName]: value} )).then((data) => {
			resolve(data);
		}).catch((err) => {
			reject(err);
		});
	});
}


//CRUD
function createInDB(collectionName, validatedJSON) {
	return new Promise((resolve, reject) => {
		connectToMongoDB().then((client) => {
			const db = client.db(dbName);
			insertDocument(db, collectionName, validatedJSON).then((data) => {
				resolve(data);
				client.close();
			}).catch((err) => {
				reject(err);
				client.close();
			});
		}).catch((err) => {
			reject(err);
			client.close();
		});
	});
}

function readInDB(collectionName, fieldName, value) {
	return new Promise((resolve, reject) => {
		connectToMongoDB().then((client) => {
			const db = client.db(dbName);
			findDocument(db, collectionName, fieldName, value).then((data) => {
				resolve(data);
				client.close();
			}).catch((err) => {
				reject(err);
				client.close();
			});
		}).catch((err) => {
			reject(err);
			client.close();
		});
	});
}

function updateInDB(collectionName, searchCriteriaJSON, validatedJSON) {
	return new Promise((resolve, reject) => {
		connectToMongoDB().then((client) => {
			const db = client.db(dbName);
			updateDocument(db, collectionName, searchCriteriaJSON, { $set: validatedJSON}).then((data) => {
				resolve(data);
				client.close();
			}).catch((err) => {
				reject(err);
			});
		}).catch((err) => {
			reject(err);
		});
	});
}

function deleteInDB(collectionName, fieldName, value) {
	return new Promise((resolve, reject) => {
		connectToMongoDB().then((client) => {
			const db = client.db(dbName);
			deleteDocument(db, collectionName, fieldName, value).then((data) => {
				resolve(data);
				client.close();
			}).catch((err) => {
				reject(err);
				client.close();
			});
		}).catch((err) => {
			reject(err);
			client.close();
		});
	});
}

module.exports.createInDB = createInDB;
module.exports.readInDB = readInDB;
module.exports.updateInDB = updateInDB;
module.exports.deleteInDB = deleteInDB;
module.exports.connectToMongoDB = connectToMongoDB;