const express = require('express');
const connection = require("./db");
const router = express.Router();
// chiamata per tutti i records
router.get('/', (req,res) => {
    connection.query("SELECT * FROM rooms", (err, rows, fields) => {
        if (err) {
            res.send('Query error: ' + err.sqlMessage);
        } else {
            res.json(rows);
        }
    });
})
// chiamata per id del singolo record
router.get('/rooms/:id', (req,res) => {
    connection.query("SELECT * FROM rooms WHERE id = ?", [req.params.id],  (err, rows, fields) => {
        if (err) {
            res.send('Query error: ' + err.sqlMessage);
        } else {
            res.json(rows);
        }
    });
})
// chiamata delete
router.delete('/rooms/delete/:id', (req,res) => {
    connection.query("DELETE FROM rooms WHERE id = ?", [req.params.id],  (err, rows, fields) => {
        if (err) {
            res.send('Query error: ' + err.sqlMessage);
        } else {
            res.send("Deleted success");
        }
    });
})
// chiamata per aggiungere un record
router.post('/rooms/post', (req,res) => {
    const sql = "SET @id = ?; SET @name = ?; SET @reserved = ?; CALL RoomAddOrEdit(@id,@name,@reserved);"
    const body = req.body;
    connection.query(sql, [body.id, body.name, body.reserved],  (err, rows, fields) => {
        if (err) {
            res.send('Query error: ' + err.sqlMessage);
        } else {
            rows.forEach(element =>{
                if (element.constructor === Array){
                    res.send("inserted room id" + " " + element[0].id);
                }
            });
        }
    });
})
// chiamata per modificare un record
router.put('/rooms/edit', (req,res) => {
    const sql = "SET @id = ?; SET @name = ?; SET @reserved = ?; CALL RoomAddOrEdit(@id,@name,@reserved);"
    const body = req.body;
    connection.query(sql, [body.id, body.name, body.reserved],  (err, rows, fields) => {
        if (err) {
            res.send('Query error: ' + err.sqlMessage);
        } else {
            res.send("Updated successfully");
        }
    });
})



module.exports = router;
