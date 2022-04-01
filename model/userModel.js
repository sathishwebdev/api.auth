const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config()

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username:{
    type: String,
    required: true, 
    unique : true
  },
  email: {
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/, "Email is invalid"],
    unique: true,
    index: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  age:{
    type: String,
    default:""
  },
  gender:{
    type: String,
    default:""
  },
  dob:{
    type: String,
    default: null
  },
  profilePic:{
    type: String,
    default: null
  },
  mobile:{
    type: String,
    default:""
  },
  isVerified : {
    type: Boolean,
    default: false,
  },
  VT_KEY : {
    type: String
  },
  FPToken: {
    type: String
  },
});

UserSchema.plugin(uniqueValidator, { message: "is already taken." });

UserSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

UserSchema.set("toJSON", {
  virtuals: true,
});

// Methods

// Check Password
UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

// SET Password
UserSchema.methods.set_passwordHash = function (password) {
  this.passwordHash = bcrypt.hashSync(password, 10);
};

// SET USERNAME

UserSchema.methods.set_username = function(email){
  this.username = email.split('@')[0]
}


// GET USER TO AUTH JSON
UserSchema.methods.toAuthJson = function () {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    username: this.username,
    isVerified: this.isVerified
  };
};

// GET USER TO AUTH JSON
UserSchema.methods.details = function () {
  return {
    email: this.email,
    name: this.name,
    username: this.username,
    age: this.age,
    dob: this.dob,
    mobile: this.mobile,
    gender : this.gender,
    profilePic: this.profilePic
  };
};


// Generate Token
UserSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      userId: this.id
    },
    process.env.SECRET_KEY, // Secret Key
    { expiresIn: "1d" } // Time to expire d|m|y w-week
  );
};

const User = mongoose.model("users", UserSchema);
module.exports = User;
