import { useState } from 'react';

import './App.css';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import SaveIcon from '@mui/icons-material/Save';
import { DataGrid } from '@mui/x-data-grid';

function App() {

  const [ todo, setTodo ] = useState({description:'', date: ''});
  const [ todos, setTodos ] = useState([]);

  const inputChanged =(event)=>{
    setTodo({...todo, [event.target.name]: event.target.value});
  }

  /* const addTodo =()=>{
    setTodos([...todos, todo]);
    setTodo({description:'', date:''})
  } */

  const addTodo =()=>{
    const newTodo={...todo, id: new Date().toISOString()};
    setTodos([...todos, newTodo]);
    setTodo({description:'', date:''});
  }

  /* const deleteTodo=(row)=>{
    setTodos(todos.filter((todo, index)=>index !== row));
  } */
 const deleteTodo=(id)=>{
  setTodos(todos.filter(todo=>todo.id !== id));
 }

 const columns = [
  {field: 'description', headerName: 'Description'},
  {field: 'date', headerName: 'Date'},
 ]

  return (
    <div className="App">
      <AppBar position='static'>
        <Toolbar>
          <Typography>
            Todolist
          </Typography>
        </Toolbar>
      </AppBar>
      <Stack
        direction='row'
        spacing={2}
        mt={2}
        justifyContent='center'
        alignItems='center'
      >
        <TextField
          variant='standard'
          label='Description'
          name='description' 
          value={todo.description} 
          onChange={inputChanged}
            />
        <TextField
          variant='standard' 
          label='Date' 
          name='date' 
          value={todo.date} 
          onChange={inputChanged} />
        <Button 
          color='primary'
          variant='outlined'
          onClick={addTodo}
          startIcon={<SaveIcon />} 
        >
          Add
        </Button>
      </Stack>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 150px)', marginTop: 20 }}>
        <div style={{ height: 400, width: '60%' }}>
          <DataGrid
            rows={todos}
            columns={columns}
            pageSize={5}
            getRowId={(row) => row.id}
          />
        </div>
      </div>
      <table>
        <tbody>
          {todos.map((todo, index)=>
          <tr key={index}>
            <td>{todo.description}</td>
            <td>{todo.date}</td>
            <td>
              <Tooltip 
                title='Delete todo' 
                placement='bottom'
                >
                <IconButton
                  size='small' color='error' onClick={()=>deleteTodo(index)}>
                    <DeleteIcon />
                </IconButton>
              </Tooltip>
            </td>
          </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
