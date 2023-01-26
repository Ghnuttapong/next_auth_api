const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../config/db");

exports.signin = async (req, res) => {
  try {
    // request
    const { email, password } = await req.body;
    // compare and check email and check enabled
    const [result] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (result.length === 0)
      return res.status(400).send("Invalid email " + email);
    const compare = await bcrypt.compare(password, result[0].password);
    if (!compare) return res.status(400).send("Invalid email " + email);
    if (result[0].enabled == 0)
      return res.status(403).send("Invalid email " + email);

    // payload in token
    const payload = {
      data: {
        email: email,
        role: result[0].role,
      },
    };

    // jwt token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 60*60,
    });
    await res.send({ token: "Bearer " + token, role: result[0].role });
  } catch (error) {
    res.status(500).send("Server error.");
    console.log(error);
  }
};

exports.signup = async (req, res) => {
  try {
    // requset
    const { email, password, firstname, lastname } = await req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // check a user already exists
    const [result] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (result.length > 0) return res.status(400).send("Email already exists.");

    // insert into db
    sql =
      "INSERT INTO users(firstname, lastname, email, password) VALUES(?, ?, ?, ?)";
    await db.execute(sql, [firstname, lastname, email, hash]);
    await res.status(200).send("Thank you for begin our family.");
  } catch (error) {
    res.status(500).send("Server error.");
    console.log(error);
  }
};
