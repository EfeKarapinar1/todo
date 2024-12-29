const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 5000;

// PostgreSQL bağlantı bilgileri
const pool = new Pool({
  user: 'postgres',       // PostgreSQL kullanıcı adı
  host: 'localhost',      // Sunucu adresi
  database: 'reactdb',    // Veritabanı adı
  password: '1234',       // Şifre
  port: 5432,             // PostgreSQL varsayılan portu
});

app.use(express.json());

// Veritabanına bağlan ve bir test sorgusu yap
pool.connect((err) => {
  if (err) {
    console.error('PostgreSQL bağlantı hatası:', err);
  } else {
    console.log('PostgreSQL bağlantısı başarılı!');
  }
});

// API endpoint'i
app.get('/todos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todos WHERE todo_done = false');
    res.json(result.rows)
  } catch (err) {
    console.error('Sorgu hatası:', err);
  }
});

app.post('/addtodo', async (req,res) => {
    try {
        const { description } = req.body;
        const result = await pool.query(`insert into todos (todo_desc, todo_done) values ($1,false)`,[description])
        res.json(result);
    } catch (error) {
        console.log(error);
    }
})

app.delete("/deltodo/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`delete from todos where id = $1`,[id]);
        res.json("ok");
    } catch (error) {
        console.log(error)
    }
})

app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
