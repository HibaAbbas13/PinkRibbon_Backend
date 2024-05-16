const UserProfile = require('../models/userprofile');

class UserProfileController {
  static createUserProfile = async (req, res) => {
    try {
      const userProfile = new UserProfile({
        user: req.user._id, // Assuming user ID is available in req.user
        ...req.body,
      });
      await userProfile.save();
      res.status(201).send(userProfile);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  static getUserProfile = async (req, res) => {
    try {
      const userProfile = await UserProfile.findOne({ user: req.params.userId });
      if (!userProfile) {
        return res.status(404).send({ error: 'User profile not found' });
      }
      res.send(userProfile);
    } catch (error) {
      res.status(500).send({ error: 'Internal server error' });
    }
  }

  static updateUserProfile = async (req, res) => {
    try {
      const userProfile = await UserProfile.findOneAndUpdate(
        { user: req.params.userId },
        req.body,
        { new: true }
      );
      if (!userProfile) {
        return res.status(404).send({ error: 'User profile not found' });
      }
      res.send(userProfile);
    } catch (error) {
      res.status(500).send({ error: 'Internal server error' });
    }
  }
}

module.exports = UserProfileController;
