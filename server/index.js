const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mygameDB',
});

/**
 * This is the middleware needed!
 * More on that later
 */
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

/**
 * We pass the route, require, and response.
 * res (response): we use to respond and send to front-end. 
 * req (request): is used to get info from front-end
 * app.get('/', (req, res) => {
 *      const sqlInsert = "INSERT INTO posts (post) VALUES ('Hello');";
 *      db.query(sqlInsert, (err, result)=> {
 *          if (err) {
 *              throw err;  
 *          };
 *          res.send("Hello OmarT");
 *      });
 * });
 */


/**
 * This allows us to get data from our mysql database
 */
app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM posts;";
    db.query(sqlSelect, (err, result)=> {
        if (err) {
            throw err;
        };
        res.send(result);
    });
}); 

/**
 * This allows us to post into our mysql database
 */
app.post('/api/insert', (req, res) => {

    const newUpdate = req.body.newUpdate;

    const sqlInsert = "INSERT INTO posts (post) VALUES (?);";
    db.query(sqlInsert, [newUpdate], (err, result)=> {
        if (err) {
            throw err;
        };
    });
});

app.delete('/api/delete/:id', (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM posts where id = ?;";
    db.query(sqlDelete, [id], (err, result)=> {
        if (err) {
            throw err;
        };
    });
});

app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
}); 