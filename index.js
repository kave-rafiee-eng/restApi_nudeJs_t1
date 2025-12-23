import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
const PORT = 8080;

app.use(express.json());

// =====================
// MySQL Connection Pool
// =====================
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',        // XAMPP default
  database: 'test_db',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10
});

// =====================
// Test DB connection
// =====================
async function startServer() {
  try {
    const [rows] = await pool.query('SELECT 1');
    console.log('✅ MySQL Connected:', rows);

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('❌ MySQL connection failed:', err);
    process.exit(1);
  }
}

startServer();

// =====================
// Routes
// =====================
app.get('/user', async (req, res) => {
  const [users] = await pool.query('SELECT * FROM users');
  res.status(200).json(users);
});

app.post('/user/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(418).json({ message: 'need name' });
  }

  await pool.execute(
    'INSERT INTO users (id, name) VALUES (?, ?)',
    [id, name]
  );

  res.status(200).json({
    message: `name ${name} and id ${id} saved`
  });
});


/*
const express = require('express');
const app = express();
const PORT = 8080;

app.use( express.json() )

app.listen(
    PORT ,
    ()=> console.log( `its alive on http://localhost:${PORT}`)
)

app.get('/user', (req,res)=>{

    res.status(200).send({
        name : "kave",
        lastname : 'raf'
    })
});

app.post('/user/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(418).send({ message: 'need name' });
    }

    res.status(200).send({ 
        message: `name ${name} and id ${id}`
    });
});
*/
/*
import express from 'express';

const app = express();
const PORT = 8080;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`its alive on http://localhost:${PORT}`);
});

app.get('/user', (req, res) => {
  res.status(200).send({
    name: 'kave',
    lastname: 'raf'
  });
});

app.post('/user/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(418).send({ message: 'need name' });
  }

  res.status(200).send({
    message: `name ${name} and id ${id}`
  });
});


import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',   // پیش‌فرض XAMPP خالیه
  database: 'test_db',
  port: 3306
});

const [rows] = await pool.query('SELECT 1');
console.log('Connected:', rows);*/