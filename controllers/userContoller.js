const db = require("../config/db");
const bcrypt = require('bcrypt');

exports.getAll = async(req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM users");
    await res.status(200).send(result)
  } catch (error) {
    res.status(500).send("Server error.");
    console.log(error);
  }
};


exports.getId = async(req, res) => {
  try {
    const { id } = await req.params;
    const [result] = await db.query("SELECT * FROM users WHERE id = ?", [ id ]);
    await res.status(200).send(result)
  } catch (error) {
    res.status(500).send("Server error.");
    console.log(error);
  }
}


exports.deleteId = async(req, res) => {
  try {
    const { id } = await req.params
    console.log(req)
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [ id ]);
    if(result){
      await res.send('Deleted successful.')
    }
  } catch (error) {
    res.status(500).send("Server error.");
    console.log(error);
  }
}

exports.updateId = async(req, res) => {
  try {
    const { id } = await req.params
    const { firstname, password, lastname } = await req.body

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    let data = []; 
    if(password == '') {
      data = [firstname, lastname, id ]
    }else{
      data = [firstname, lastname, hash, id ]
    }

    const [result] = await db.query(`UPDATE users SET firstname = ?, lastname = ? ${password ? ', password = ?': ''} WHERE id = ?`, data);
    await res.send(result)
  } catch (error) {
    res.status(500).send("Server error.");
    console.log(error);
  }
}

exports.enabledId = async(req, res) => {
  try {
    const { id } = await req.params
    const { status } = await req.body
    const [result] = await db.query(`UPDATE users SET enabled = ? WHERE id = ?`, [status, id]);
    await res.status(200).send(result)
  } catch (error) {
    res.status(500).send("Server error.");
    console.log(error);
  } 
}