const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
  },
  name: String,
  surname: String,
  gender: String,
  dob: Date,
  bloodgroup: String,
  height: Number,
  weight: Number,
  mobile: String,
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
