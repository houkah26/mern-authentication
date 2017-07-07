const mongoose = require('mongoose'),  
      Schema = mongoose.Schema,
      bcrypt = require('bcrypt-nodejs');

//================================
// User Schema
//================================
const UserSchema = new Schema({  
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    firstName: { type: String },
    lastName: { type: String }
  },
  role: {
    type: String,
    enum: ['Member', 'Client', 'Owner', 'Admin'],
    default: 'Member'
  },
  cash: {
    type: Number,
    default: 1000,
    min: 0,
    required: true,
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date }
},
{timestamps: true});

// Pre-save of user to database, hash password if password is modified or new
UserSchema.pre('save', function (next) {
  const user = this,
        SALT_FACTOR = 5;
  
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

//=========================
// User methods
//=========================

// Compare password for login authorization
UserSchema.methods.comparePassword = function (inputPassword, cb) {
  bcrypt.compare(inputPassword, this.password, (err, isMatch) => {
    if (err) { return cb(err); }
     cb(null, isMatch);
  });
}

module.exports = mongoose.model('User', UserSchema);  

