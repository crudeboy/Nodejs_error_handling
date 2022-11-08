const express = require("express");
const errorHandler = require("./middleware/error-handler");
const { tryCatch } = require("./utils/tryCatch");
const Joi = require("joi");
const AppError = require("./middleware/AppError");
const { NOT_FOUND } = require("./constants/errorCodes");

const app = express();

const getUser = () => undefined;
const getSub = () => undefined;

app.get(
	"/",
	tryCatch(async (req, res) => {
		const user = getUser();
		if (!user) {
			throw new Error("User not found!");
		}
		return res.status(200).json({ Success: true });
	})
);

const schema = Joi.object({
	userId: Joi.number().required(),
});

app.post(
	"/login",
	tryCatch(async (req, res) => {
		const { error, value } = schema.validate({});
		if (error) throw error;
	})
);

app.post(
	"/sub",
	tryCatch(async (req, res) => {
		const sub = getSub();
		if (!sub) {
			throw new AppError(NOT_FOUND, "Subscription not found", 400);
		}
	})
);

app.use(errorHandler);

app.listen(3008, () => {
	console.log("Appl is live on port ....");
});
