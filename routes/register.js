const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const Register = require("../models/register");
const Edificio = require("../models/Edificio");
const RegisterAll = require("../models/ResgisterAll");
const Text = require("../models/Text");

const Pool = require("multiprocessing").Pool;

// @route     GET api/auth
// @desc      Get logged in user and return user
// @access    Private
router.get("/", async (req, res) => {
  try {
    const register = await Register.find().sort({
      date: -1
    });
    return res.json(register);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     POST api/auth
// @desc      Auth user & get token Validate Login
// @access    Public
router.post("/", async (req, res) => {
  const { array_json, edificios } = req.body;
  try {
    const text1 = await Text.find({})
      .sort({ _id: -1 })
      .limit(1);
    if (text1[0] !== undefined && req.body.text.text === text1[0].text) {
      const register1 = await Edificio.find({});
      if (register1.length === 0) {
        edificios.map(i => {
          edificio = new Edificio(i);
          edificio.save();
          array_json[i.edificio].map(j => {
            register = new Register(j);
            register.save();
          });
        });
        return res
          .status(200)
          .send("save")
          .end();
      } else {
        return res
          .status(200)
          .json({ status: 314 })
          .end();
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     POST api/auth
// @desc      Auth user & get token Validate Login
// @access    Public
router.post("/all", async (req, res) => {
  const { array_json } = req.body;
  try {
    const text1 = await Text.find({})
      .sort({ _id: -1 })
      .limit(1);

    if (text1[0] !== undefined && req.body.text.text === text1[0].text) {
      RegisterAll.find({}).then(register1 => {
        if (register1.length === 0) {
          array_json.map(async j => {
            register = new RegisterAll(j);
            register.save();
          });
          return res
            .status(200)
            .send("save")
            .end();
        } else {
          return res
            .status(200)
            .json({ status: 314 })
            .end();
        }
      });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

router.post("/text", async (req, res) => {
  try {
    const text1 = await Text.find({})
      .sort({ _id: -1 })
      .limit(1);

    if (text1[0] !== undefined && req.body.text === text1[0].text) {
      return res
        .status(200)
        .json({ status: 314 })
        .end();
    }

    textSave = new Text({ text: req.body.text });
    await textSave.save();

    res.status(200).send("save");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/text", async (req, res) => {
  try {
    const text = await Text.find({})
      .sort({ _id: -1 })
      .limit(1);

    res
      .status(200)
      .json({ text })
      .end();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/textf", async (req, res) => {
  try {
    const text1 = await Text.find({})
      .sort({ _id: -1 })
      .limit(1);

    if (text1[0] !== undefined && req.body.text === text1[0].text) {
      return res
        .status(314)
        .json({ status: 314 })
        .end();
    }
    res
      .status(200)
      .json({ status: 200 })
      .end();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
