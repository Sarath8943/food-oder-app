
// const bcrypt = require('bcrypt');
// const { generatToken } = require("../utils/token.js");
// const adminModel = require("../model/adminModel.js");


// const adminSignup = async(req,res) => {

//  try {


//    const {name,email,password,mobile,role}=req.body;

//    if(!name || !email || !password || !mobile || !role){
//     return res.status(400).json({error:"all fields are required "})
//    }


// const userrExist = await adminModel.findOne({email:email});


// if  (userrExist) {
//     return res.status(400).json({error: "admin already exist" })
// }

// const salt = await bcrypt.genSalt();
// const hashedPassword  =   await bcrypt.hash(password, salt);
// console.log(hashedPassword);



// const newUser = new adminModel({name, email, password: hashedPassword, mobile,});
//   const savedUser = await newUser.save();
  

//   res.status(200).json({message: "admin created successfuly", data: savedUser});



//  } catch (error) {
//     console.log(error);
//     res.status(error.status || 500).json({ error: error.message || " Internal server error"});
//  }

// };

// const adminlogin = async (req,res)  => {
//     try {

//            const  { email, password } =req.body;
//            if ( !email || !password){

//             return res.status(400).json({ error: 'All feilds are required'});
//            }
     
//            const user = await adminModel.findOne({ email });

//          if (!user) {
//             return res.status(400).json({ error: ' admin not exist' });

//          }
              
     
//          const passwordMatch = await bcrypt.compare(password, user.password);
//          console.logo(passwordMatch, "passwordMatch");

//          if (!passwordMatch){
//             return res.status(400).json({ error: "Incorrect password"});
//          }

//       if (!user.isActive){
//         return res.status(400).json({ error: "admin profile has deactivated"});
//       }

//     const token = generatToken(user,"admin")
//     console.log(token, "=======token");
//     res.cookie("token", token);



//     res.status(200).json({ message: "Login successfull", data: user});
        
//     } catch (error) {
//         console.log(error);
//         res.status(error.status || 500).json({ error: error.message || "Internal server Erorr"})

//     }
// }












// module.exports = {adminSignup,adminlogin };