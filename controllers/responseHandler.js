//easy handler to minimize copy paste
//TODO


function responseHandler() {};

responseHandler.prototype.sendNotFound = (res, data) => {
	res.status(404).send({"message":"ERROR", "data":data || "Not found"});
}

responseHandler.prototype.sendError = (res, data) => {
	res.status(500).send({"message":"ERROR", "data":data || "Some error occured"});
}

responseHandler.prototype.sendOk = (res, data) => {
	res.status(200).send({"message":"OK", "data":data || "null"});
}

responseHandler.prototype.notImplemented = (res, data) => {
	res.status(200).send({"message":"OK", "data":data || "Not Implemented"});
}

module.exports = responseHandler;