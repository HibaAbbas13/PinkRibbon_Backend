const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Defining Schema
const userSchema = new mongoose.Schema({

  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true },
  deviceToken: { type: String },
  name: { type: String },
  surname: { type: String },
  bloodGroup: { type: String },
  mobileNumber: { type: String },
  bmi: { type: Number },
  gender: { type: String },
  dob: { type: String },
  profileImage: {
    imagename: String,
    path: String,
    imageData: Buffer, // Store the image binary data
    imageContentType: String
  }

}, { timestamps: true });


userSchema.pre('save', async function (next) {
  try {
      if (!this.isModified('password') || this.isModified('password') && typeof this.password === 'string') {
          const hashedPassword = await bcrypt.hash(this.password, 10);
          this.password = hashedPassword;
      }
      return next();
  } catch (error) {
      return next(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
// Model
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;

