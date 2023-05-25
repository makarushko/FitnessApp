 const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	gender: {
		type: String,
		enum: ['male', 'female'],
		required: true
	},
	age: { type: Number, required: true },
	height: { type: Number, required: true },
	weight: { type: Number, required: true },
	chest: { type: Number, required: true },
	waist: { type: Number, required: true },
	hips: { type: Number, required: true },
	bodyMassIndex: { type: Number, required: true },
	weightHistory: [
		{
			date: {
				type: Date,
				required: true
			},
			weight: {
				type: Number,
				required: true
			},
			bodyMassIndex: {
				type: Number,
				required: true
			}
		}
	]
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = { User, validate };
