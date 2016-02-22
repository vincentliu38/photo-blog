// REQUIREMENTS
var mongoose = require('mongoose');
var brandSchema = require('./brands').schema;
var bcrypt = require('bcrypt-nodejs');

// SCHEMA
var userSchema = mongoose.Schema({
	username: String,
	email: String,
	password: String,
	clothes: [brandSchema]
});

// PASSPORT
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

// EXPORT
module.exports = mongoose.model('User', userSchema);
