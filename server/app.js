const express = require('express');

const app = express();

const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
}); 

var cors = require('cors')
var bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.json()) // for parsing application/json

const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'MelvunxAndMarsi',
    password: 'MaMaMilla930',
    database: 'todolist'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

app.get('/api/data', (req, res) => {
    db.query('SELECT * FROM todo ORDER BY position ASC', (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});


app.get('/api/search', (req,res) => {
    const searchText = req.query.entree;
    const q = `SELECT * FROM todo WHERE list LIKE ?`;
    db.query(q, [`%${searchText}%`], (err, results) => {
        if (err) throw err; 
        res.send(results) 
    });
});


app.post('/api/add', (req, res) => {
    const { list, important } = req.body;
    db.query('INSERT INTO todo (list, important) VALUES (?, ?)', [list, important], (err, results) => {
        if (err) throw err;
            res.send(results);
    });
});

app.put('/api/update/statut/:id', (req, res) => {
    const id = req.params.id;
    const { status} = req.body;
    db.query('UPDATE todo SET status=? WHERE id=?', [status, id], (err, results) => {
        if (err) throw err;
            res.send(results);
    });
});

app.put('/api/update/important/:id',(req, res) => {
    const id = req.params.id;
    const { important } = req.body; 
        db.query('UPDATE todo SET important=? WHERE id=?', [important, id], (err, results) => {
            if (err) throw err;
                res.send(results);
        });
});

// Fonction pour mettre à jour la position des tâches dans la base de données
const updateTaskPosition = (todoIds) => {
    // Créer un tableau de promesses pour chaque mise à jour de position
    const updatePromises = todoIds.map((todoId, index) => {
        return new Promise((resolve, reject) => {
            // Mettre à jour la position de la tâche
            db.query('UPDATE todo SET position = ? WHERE id = ?', [index + 1, todoId], (error, result) => {
                if (error) {
                    console.error('Error updating to-do order: ', error);
                    reject(error);
                } else {
                    console.log(`Updating position for todo with id ${todoId} to ${index + 1}`);
                    resolve();
                }
            });
        });
    });

    // Attendre que toutes les mises à jour de position soient terminées
    return Promise.all(updatePromises);
};


const getSortedTasks = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM todo ORDER BY position', (error, result) => {
            if (error) {
                console.error('Error fetching sorted tasks: ', error);
                reject(error);
                return;
            }
            console.log(`res : ${result}`);
            resolve(result);
        });
    });
};

app.put('/api/updateOrder', (req, res) => {
    const { todoIds } = req.body;
    updateTaskPosition(todoIds)
        .then(() => {
            return getSortedTasks();
        })
        .then((tasks) => {
            console.log('Sent tasks: ', tasks);
            res.status(200).json({ tasks });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error updating or fetching sorted tasks' });
        });
});



app.delete('/api/delete/:id', (req, res)=> {
    const id = req.params.id;
    db.query("Delete FROM todo WHERE id = ?", [id], function(err){
        if (err){
            return console.log(err);
        }
        console.log(`Delete todo id with id ${id}`)
    });
    res.status(200).json({"delete done" : true});
});








