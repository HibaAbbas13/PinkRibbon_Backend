const UserModel= require( '../models/User.js')
const bcrypt =require( 'bcrypt')
const jwt= require( 'jsonwebtoken')
const transporter =require( '../config/emailConfig.js')
const fs = require('fs');

class UserController {
  static userRegistration = async (req, res) => {
    const { email, password, password_confirmation, deviceToken } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      res.send({ "status": "failed", "message": "Email already exists" });
    } else {
      if (email && password && password_confirmation) {
        if (password === password_confirmation) {
          try {
            const doc = new UserModel({
              email: email,
              password: password,
              deviceToken: deviceToken,
            });
            await doc.save();
            const saved_user = await UserModel.findOne({ email: email });
            const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY);
            res.status(201).send({ "status": "success", "message": "Registration Success", "token": token, "userId": saved_user._id });
          } catch (error) {
            console.log(error);
            res.send({ "status": "failed", "message": "Unable to Register" });
          }
        } else {
          res.send({ "status": "failed", "message": "Password and Confirm Password doesn't match" });
        }
      } else {
        res.send({ "status": "failed", "message": "All fields are required" });
      }
    }
  };
  
  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModel.findOne({ email: email });
        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password);
          if ((user.email === email) && isMatch) {
            const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' });
            res.send({ "status": "success", "message": "Login Success", "token": token, "userId": user._id });
          } else {
            res.send({ "status": "failed", "message": "Email or Password is not Valid" });
          }
        } else {
          res.send({ "status": "failed", "message": "You are not a Registered User" });
        }
      } else {
        res.send({ "status": "failed", "message": "All Fields are Required" });
      }
    } catch (error) {
      console.log(error);
      res.send({ "status": "failed", "message": "Unable to Login" });
    }
  };

  static changeUserPassword = async (req, res) => {
    const { password, password_confirmation } = req.body
    if (password && password_confirmation) {
      if (password !== password_confirmation) {
        res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
      } else {
        const salt = await bcrypt.genSalt(10)
        const newHashPassword = await bcrypt.hash(password, salt)
        await UserModel.findByIdAndUpdate(req.user._id, { $set: { password: newHashPassword } })
        res.send({ "status": "success", "message": "Password changed succesfully" })
      }
    } else {
      res.send({ "status": "failed", "message": "All Fields are Required" })
    }
  }

  static loggedUser = async (req, res) => {
    res.send({ "user": req.user })
  }


  static sendUserPasswordResetEmail = async (req, res) => {
    const { email } = req.body;
    if (email) {
      try {
        const user = await UserModel.findOne({ email: email });
        if (user) {
          const secret = user._id + process.env.JWT_SECRET_KEY;
          const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '15m' });
          const link = `${process.env.BASE_URL}/api/user/reset/${user._id}/${token}`;;
          console.log(link);
  
          // Send Email
          let info = await transporter.sendMail({
            
            from: process.env.EMAIL_USER, // Sender address
            to: user.email, // Recipient address
            subject: "GeekShop - Password Reset Link",
            html: `<a href="${link}">Click Here</a> to Reset Your Password`
          });
  
          console.log("Message sent: %s", info.messageId);
          res.send({ "status": "success", "message": "Password Reset Email Sent... Please Check Your Email" });
        } else {
          res.send({ "status": "failed", "message": "Email doesn't exist" });
        }
      } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send({ "status": "failed", "message": "Unable to send password reset email" });
      }
    } else {
      res.send({ "status": "failed", "message": "Email Field is Required" });
    }
  };

  static userPasswordReset = async (req, res) => {
    const { password, password_confirmation } = req.body
    const { id, token } = req.params
    const user = await UserModel.findById(id)
    const new_secret = user._id + process.env.JWT_SECRET_KEY
    try {
      jwt.verify(token, new_secret)
      if (password && password_confirmation) {
        if (password !== password_confirmation) {
          res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
        } else {
          const salt = await bcrypt.genSalt(10)
          const newHashPassword = await bcrypt.hash(password, salt)
          await UserModel.findByIdAndUpdate(user._id, { $set: { password: newHashPassword } })
          res.send({ "status": "success", "message": "Password Reset Successfully" })
        }
      } else {
        res.send({ "status": "failed", "message": "All Fields are Required" })
      }
    } catch (error) {
      console.log(error)
      res.send({ "status": "failed", "message": "Invalid Token" })
    }
  }

  static userLogout = async (req, res) => {
    try {
      // Clear the token cookie
      res.clearCookie('token');
      res.send({ "status": "success", "message": "Logout Success" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ "status": "failed", "message": "Unable to Logout" });
    }
  }
  

  static getUserById = async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await UserModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  
static getUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}, 'id email  name  surname bloodGroup mobileNumber bmi gender dob'); // Selecting only id, email, and name fields
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

static updateUserInfo = async (req, res) => {
  try {
    const { userId, name, surname, bloodGroup, mobileNumber, bmi, gender, dob } = req.body;
    const { originalname, path: filePath, mimetype } = req.file;
    // Find user by ID
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
 
    if (req.file) {
    
      user.name = name;
      user.surname = surname;
      user.bloodGroup = bloodGroup;
      user.mobileNumber = mobileNumber;
      user.bmi = bmi;
      user.gender = gender;
      user.dob = dob;

      // Handle profile image upload
      user.profileImage = {
        imagename: originalname,
        path: filePath,
        imageData: fs.readFileSync(filePath), 
        imageContentType: mimetype
      };
    } else {
      // Update additional information without profile image
      user.name = name;
      user.surname = surname;
      user.bloodGroup = bloodGroup;
      user.mobileNumber = mobileNumber;
      user.bmi = bmi;
      user.gender = gender;
      user.dob = dob;
    }

    // Save changes
    await user.save();

    res.status(200).json({ message: 'User information updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

}

module.exports=  UserController