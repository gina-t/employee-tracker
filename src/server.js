import express from 'express';
import { pool, connectToDb } from './connection.js';
import { viewDepartmentTable, viewRoleTable, viewEmployeeTable, addDepartment, addRole, addEmployee, updateEmployeeRole } from './functions.js';
import dotenv from 'dotenv';

dotenv.config();

await connectToDb();

const app = express();
const PORT = 3000;

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// route to view department table
app.get('/api/departments', async (req, res) => {
  try {
    const departments = await viewDepartmentTable();
    res.json(departments);
  } catch (error) {
    res.status(500).send('Error retrieving departments');
  }
});
// route to view role table
app.get('/api/roles', async (req, res) => {
  try {
    const roles = await viewRoleTable();
    res.json(roles);
  } catch (error) {
    res.status(500).send('Error retrieving roles');
  }
});

// route to view employee table
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await viewEmployeeTable();
    res.json(employees);
  } catch (error) {
    res.status(500).send('Error retrieving employees');
  }
});

// Create a new department
app.post('/api/department', async (req, res) => {
  const { name } = req.body;
  const query = 'INSERT INTO department (name) VALUES ($1) RETURNING *';
  const values = [name];

  try {
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error executing query', error.stack);
  }
});

// Create a new role
app.post('/api/role', async (req, res) => {
  const { title, salary, department_id } = req.body;
  const query = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *';
  const values = [title, salary, department_id];

  try {
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).send('Error creating role');
  }
});

// Create a new employee
app.post('/api/employee', async (req, res) => {
  const { first_name, last_name, role_id, manager_id } = req.body;
  const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [first_name, last_name, role_id, manager_id];

  try {
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).send('Error creating employee');
  }
});

// Update an employee role
app.put('/api/employee/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { role_id } = req.body;
  const query = 'UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *';
  const values = [role_id, id];

  try {
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).send('Error updating employee role');
  }
});

// Default response for any other request (Not Found)
app.use((_req, res) => {
  res.status(404).end();
});

app.listen(port, () => {
  console.log(`Server is running on port ${PORT}`);
});


