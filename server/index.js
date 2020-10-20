const express = require('express');
const PORT = 5000;
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const pool = require('./db');

// middleware
app.use(cors());
app.use(express.json()); // allows access to req.body
app.use(morgan('dev'));

// Routes

// get all todos
app.get('/todos', async (req, res) => {
	try {
		const allTodos = await pool.query(`SELECT * FROM todo`);

		res.json(allTodos.rows);
	} catch (err) {
		console.error(err.message);
	}
});

// get a todo
app.get('/todos/:id', async (req, res) => {
	// console.log(req.params);
	const { id } = req.params;

	try {
		const todo = await pool.query(
			`
    SELECT * 
    FROM todo 
    WHERE todo_id = $1`,
			[id]
		);

		res.json(todo.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

// create a todo
app.post('/todos', async (req, res) => {
	try {
		// console.log('req.body:', req.body);
		const { description } = req.body;
		const newTodo = await pool.query(
			`INSERT INTO todo (description) 
      VALUES ($1) RETURNING *`,
			[description]
		);

		res.json(newTodo.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

// update a todo
app.put('/todos/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { description } = req.body;

		const updateTodo = await pool.query(
			`UPDATE todo 
       SET description = $1 
       WHERE todo_id = $2`,
			[description, id]
		);

		res.json('Todo was updated');
	} catch {
		console.error(err.message);
	}
});

// delete a todo
app.delete('/todos/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const deleteTodo = await pool.query(
			`DELETE FROM todo
      WHERE todo_id = $1`,
			[id]
		);
		res.json('Todo deleted');
	} catch {
		console.error(err.message);
	}
});

app.listen(PORT, () => {
	console.log(`Server is starting on port ${PORT}`);
});
