import React, { useState, useEffect } from 'react';

const ListTodos = () => {
	const [todos, setTodos] = useState([]);

	async function getTodos() {
		const res = await fetch('http://localhost:5000/todos');

		const todoArray = await res.json();

		setTodos(todoArray);
	}

	useEffect(() => {
		getTodos();
	}, []);

	console.log(todos);

	return (
		<table className='table mt-5'>
			<thead>
				<tr>
					<th>Description</th>
					<th>Edit</th>
					<th>Delete</th>
				</tr>
			</thead>
			<tbody>
				{todos.map((todo, index) => {
					return (
						<tr key={index}>
							<td>{todo.description}</td>
							<td>
								<button className='btn btn-primary'>Edit</button>
							</td>
							<td>
								<button className='btn btn-danger'>Delete</button>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default ListTodos;
