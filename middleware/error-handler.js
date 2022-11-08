const AppError = require("./AppError");

const errorHandler = (error, req, res, next) => {
	// console.log("i entered error handleer", error);

	if (error.name === "ValidationError") {
		return res.status(400).send({
			type: "ValidationError",
			message: error.details[0].message,
		});
	}

	if (error instanceof AppError) {
		return res.status(error.statusCode).send({
			errorCode: error.errorCode,
			message: error.message,
		});
	}

	return res.status(500).send(error.message);
};

module.exports = errorHandler;
