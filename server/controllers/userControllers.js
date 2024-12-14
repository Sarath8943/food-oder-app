const userModel = require("../model/userModel.js");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token.js");
const admin = require("../model/adminModel.js");

const userSignup = async (req, res) => {
  try {
    const { name, email, password, mobile, role } = req.body;

    if (!name || !email || !password || !mobile) {
      return res.status(400).json({ error: "All fields are required " });
    }

    const userExist = await userModel.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ error: " User already exist" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      mobile,
      role: role ? role : "user",
    });
    const savedUser = await newUser.save();

    res
      .status(200)
      .json({ message: "User created successfuly", data: savedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All feilds are required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: " User  not exist" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(passwordMatch, "passwordMatch");

    if (!passwordMatch) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    const token = generateToken(user, "user");
    console.log(token, "=======token");
    res.cookie("token", token);

    res.status(200).json({ message: "Login successfull", data: user });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server Erorr" });
  }
};

const userProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = await userModel.findById(userId);

    res.status(200).json({ message: "user profile fetched", data: userData });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server Erorr" });
  }
};

const userlogout = async (req, res) => {
  try {
    res.cookie("token", "", { expires: new Date(0), httpOnly: true });
    res.status(200).json({ message: "Logout Successfull" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Error Logout" });
  }
};

const checkUser = async (req, res) => {
  try {
    req.status(200).json({ message: "autherized user" });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server Erorr" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // Validate input fields
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: "Both old and new passwords are required." });
    }

    // Fetch the user based on the ID from the authenticated request
    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Check if the old password is correct
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Old password is incorrect." });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt();
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
    
const profileUpdate = async (req, res) => {
  try {
    const { name, email, mobile, profilePic} = req.body;


    const userId = req.user.id;

    console.log(userId, "userId");

    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res.status(401).json({ error: "user not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (mobile) user.mobile = mobile;
    if ( profilePic) user. profilePic =  profilePic;
    const profileUpdate = await user.save();

    res.status(200).json({ message: " successs", profileUpdate });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server Erorr" });
  }
};

const userAccountDelete = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "User not fount" });
    }

    await userModel.findByIdAndDelete(user._id);

    res.clearCookie("authToken", { httponly: true, secure: true });

    res.json({ message: " Account deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server Erorr" });
  }
};

module.exports = {
  userSignup,
  login,
  userProfile,
  userlogout,
  checkUser,
  changePassword,
  profileUpdate,
  userAccountDelete,
};
