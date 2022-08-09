import {Node,Option} from "./interfaces";
import express from 'express';
import connection from "./db";
const router = express.Router();
// chiamata per tutti i records
router.get('/', (req: any, res: { send: (arg0: string) => void; json: (arg0: any) => void; }) => {

    let sql = "SELECT * FROM node";
    connection.query(sql, (err: { sqlMessage: string; }, rows: unknown, fields: unknown) => {
        if (err) {
            res.send('Query error: ' + err.sqlMessage);
        } else {
            res.json(rows);
        }
    });
})
// chiamata per le opzioni in base all'id del nodo
router.get('/options/:id', (req: { params: { id: number; }; }, res: { send: (arg0: string) => void; json: (arg0: any) => void; }) => {
    let sql = "SELECT option_name, nextNode  FROM options WHERE option_id = ?";
    connection.query(sql, [req.params.id], (err: { sqlMessage: string; }, rows: unknown, fields: unknown) => {
        if (err) {
            res.send('Query error: ' + err.sqlMessage);
        } else {
            res.json(rows);
        }
    });
})

// chiamata per id del singolo record
router.get('/node/:id', (req: { params: { id: any; }; }, res: { send: (arg0: string) => void; json: (arg0: any) => void; }) => {
   let sql = "SELECT * FROM node WHERE id = ?";
    connection.query(sql, [req.params.id],  (err: { sqlMessage: string; }, rows: unknown, fields: unknown) => {
        if (err) {
            res.send('Query error: ' + err.sqlMessage);
        } else {
            res.json(rows);
        }
    });
})
// chiamata delete
router.delete('/node/delete/:id', (req: { params: { id: number; }; }, res: { send: (arg0: string) => void; }) => {
   let sql = "DELETE FROM node WHERE id = ?";
    connection.query("DELETE FROM node WHERE id = ?", [req.params.id],  (err: { sqlMessage: string; }, rows: unknown, fields: unknown) => {
        if (err) {
            res.send('Query error: ' + err.sqlMessage);
        } else {
            res.send("Deleted success");
        }
    });
})
// chiamata per aggiungere un record
router.post('/node/post', (req: { body: Node; }, res: { send: (arg0: string) => void; }) => {
    const sql = "SET @id = ?; SET @name = ?; SET @description = ?; CALL NodeAddOrEdit(@id,@name,@description);"
    const body = req.body;
    connection.query(sql, [body.id, body.name, body.description],  (err: { sqlMessage: string; }, rows: any[], fields: any) => {
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
router.post('/option/post', (req: { body: Option; }, res: { send: (arg0: string) => void; }) => {
    const sql = "SET @id = ?; SET @option_name = ?; SET @option_id = ?; SET @nextNode = ?; SET @description = ?; CALL NodeAddOrEdit(@id, @option_name, @description, @option_id, @nextNode);"
    const body = req.body;
    connection.query(sql, [body.id, body.option_name, body.description, body.option_id],  (err: { sqlMessage: string; }, rows: any[], fields: any) => {
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
router.put('/option/edit', (req: { body: Option; }, res: { send: (arg0: string) => void; }) => {
    const sql = "SET @id = ?; SET @option_name = ?; SET @option_id = ?; SET @nextNode = ?; SET @description = ?; CALL NodeAddOrEdit(@id, @option_name, @description, @option_id, @nextNode);"
    const body = req.body;
    connection.query(sql, [body.id, body.option_id, body.option_name, body.description, body.nextNode],  (err: { sqlMessage: string; }, rows: any, fields: any) => {
        if (err) {
            res.send('Query error: ' + err.sqlMessage);
        } else {
            res.send("Updated successfully");
        }
    });
})



// chiamata per modificare un record
router.put('/node/edit', (req: { body: Node; }, res: { send: (arg0: string) => void; }) => {
    const sql = "SET @id = ?; SET @name = ?; SET @description = ?;  CALL NodeAddOrEdit(@id,@name,@description);"
    const body = req.body;
    connection.query(sql, [body.id, body.name,body.description],  (err: { sqlMessage: string; }, rows: any, fields: any) => {
        if (err) {
            res.send('Query error: ' + err.sqlMessage);
        } else {
            res.send("Updated successfully");
        }
    });
})



export default router;
