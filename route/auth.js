const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../model/user");
require("../db/db");

const router = express.Router();
router.use(express.json());
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    //all field mandetory

    if (!email || !password) {
      return res.status(422).json({ msg: "pls fill email and password" });
    }


    const userExist = await User.findOne({ email: email });
    if (userExist) {
      const passMatch = await bcrypt.compare(password, userExist.password);
      if (passMatch) {
        return res.json({ msg: "user Logged in sucessfully" });
      } else {
        return res.status(400).json({ msg: "user not logged in " });
      }
    } else {
      return res.status(400).json({ msg: "user not registered" });
    }
  } catch (error) {
    console.log(error);
  }

  //if user exist then log into the page
});

// --------------User SignUp Route-----------------------
router.post("/signup", (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  // do register this user in database
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ msg: "pls fill all data" });
  }

  //if user already exist then find in database that the person already exist or not ?
  User.findOne({ email: email })
    .then((existUser) => {
      if (existUser) {
        return res.status(422).json({ msg: "user already exist" });
      } else if (password != cpassword) {
        return res.status(422).json({ msg: "pass is not matching" });
      }

      const user = new User({ name, email, phone, work, password, cpassword });
      user
        .save()
        .then(() => {
          res.status(201).json({ msg: "user signup sucessfull" });
        })
        .catch((err) => {
          res.status(201).json({ msg: "user failed to register" });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
