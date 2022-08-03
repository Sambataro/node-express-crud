import {Room} from "./interfaces";

import express from 'express';
import connection from "./db";
const router = express.Router();
// chiamata per tutti i records
router.get('/', (req: any, res: { send: (arg0: string) => void; json: (arg0: any) => void; }) => {
    connection.query("SELECT * FROM rooms", (err: { sqlMessage: string; }, rows: unknown, fields: unknown) => {
        if (err) {
            res.send('Query error: ' + err.sqlMessage);
        } else {
            res.json(rows);
        }
    });
})
// chiamata per id del singolo record
router.get('/rooms/:id', (req: { params: { id: any; }; }, res: { send: (arg0: string) => void; json: (arg0: any) => void; }) => {
    connection.query("SELECT * FROM rooms WHERE id = ?", [req.params.id],  (err: { sqlMessage: string; }, rows: unknown, fields: unknown) => {
        if (err) {
            res.send('Query error: ' + err.sqlMessage);
        } else {
            res.json(rows);
        }
    });
})
// chiamata delete
router.delete('/rooms/delete/:id', (req: { params: { id: number; }; }, res: { send: (arg0: string) => void; }) => {
    connection.query("DELETE FROM rooms WHERE id = ?", [req.params.id],  (err: { sqlMessage: string; }, rows: unknown, fields: unknown) => {
        if (err) {
            res.send('Query error: ' + err.sqlMessage);
        } else {
            res.send("Deleted success");
        }
    });
})
// chiamata per aggiungere un record
router.post('/rooms/post', (req: { body: Room; }, res: { send: (arg0: string) => void; }) => {
    const sql = "SET @id = ?; SET @name = ?; SET @reserved = ?; CALL RoomAddOrEdit(@id,@name,@reserved);"
    const body = req.body;
    connection.query(sql, [body.id, body.name, body.reserved],  (err: { sqlMessage: string; }, rows: any[], fields: any) => {
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
router.put('/rooms/edit', (req: { body: Room; }, res: { send: (arg0: string) => void; }) => {
    const sql = "SET @id = ?; SET @name = ?; SET @reserved = ?; CALL RoomAddOrEdit(@id,@name,@reserved);"
    const body = req.body;
    connection.query(sql, [body.id, body.name, body.reserved],  (err: { sqlMessage: string; }, rows: any, fields: any) => {
        if (err) {
            res.send('Query error: ' + err.sqlMessage);
        } else {
            res.send("Updated successfully");
        }
    });
})



export default router;
