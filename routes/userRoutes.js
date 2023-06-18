import express from "express";
const router = express.Router();
import connection from "../config/connection.js";

//create the user
router.post("/add", async (req, res) => {
  const { id, username, location } = req.body;
  const [rows, fields] = await connection.query(
    `INSERT INTO users(id, username, location) VALUES(?,?,?)`,[id, username, location],
    // (err, results, fields) => {
    //   if (err) throw err;
    //   console.log(results);

    //   if(results.affectedRows === 1)
    //   res.status(200).json({ success: true, message: "User added to database."});
    //   else{
    //     res.status(400).json({ success: false, message: "User was not added."});
    //   }
    // }
  );
  res.status(200).json(rows);
});


//read the user
router.get("/:id", (req, res) => {
  const { id } = req.params;
  if(id) {
    connection.query(
      `SELECT * FROM users WHERE id=?`,[id], (err, results, fields) => {
        if(err) throw err;
        console.log(results);
        res.status(200).json(...results)
        // console.log(res);
      })
  }
  else
  res.status(200).json({ success: "false", message: "Cannot get user details."})
});


//updating the users
router.put("/update/:id", (req, res)=> {
  const { id } = req.params;
  if(id){
    //
    const { username, location } = req.body;
    // connection.query(`UPDATE users SET username= '${username}', location = '${location}' WHERE id = ${id}`, (err, results, fields)=> {
    connection.query(`UPDATE users SET username= ?, location = ? WHERE id = ?`, [username, location, id], (err, results, fields)=> {
      console.log(results);
      if(results.affectedRows === 1){
        res.status(200).json({ success: "true", message: "Successfully Updated !"});
      }
      else {
        res.status(200).json({ success: "false", message: "Unable to update."});
      }
    });
  }
  else res.status(200).json({ success: "false", message: "User id not provided."});
});

//delete user
router.delete("/delete/:id", (req, res)=>{
  const { id } = req.params;
  if(id){
    connection.query(`DELETE FROM users WHERE id = ?`,[id], (err, results, fields)=>{
      console.log(results);
      if(results.affectedRows === 1){
        res.status(200).json({ success: "true", message: "Given id deleted."});
      }
    })
  }
  else{
    res.status(403).json({ success: "false", message: "User id not provided."})
  }
})


export default router;