import React, { useState } from 'react';
import './App.css';
import { Todolist } from './components/Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {

  let [tasks, setTasks] = useState([
    {id: v1(), title: "CSS", isDone: false},
    {id: v1(), title: "new text", isDone: false},
    {id: v1(), title: "TS", isDone: false},
    {id: v1(), title: "Redux", isDone: false},
    ]);

  let [filter, setFilter] = useState<FilterValuesType>('all');

  function deleteTask(id: string) {
    let filteredTasks = tasks.filter(t => t.id !== id)
    setTasks(filteredTasks);
  }

  function addTask(title: string) {
    let task = {
      id: v1(),
      title: title,
      isDone: false
    }
    let newTasks = [task, ...tasks]
    setTasks(newTasks);
  }

  function changeStatus(taskId: string, isDone: boolean) {
    // let task = tasks.find(t => {
    //   if(t.id === taskId) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // })

      ///сокращенная запись///
    let task = tasks.find(t => t.id === taskId);
    if (task) {
      task.isDone = isDone;
    }   
    setTasks([...tasks]);
  }

  let tasksForTodoList = tasks;

  if(filter === 'completed') {
    tasksForTodoList = tasks.filter(t => t.isDone === true)
  }
  if(filter === 'active') {  
    tasksForTodoList = tasks.filter(t => t.isDone === false)
  } 

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  return (
    <div className="App">
      <Todolist title="first test"
        tasks={tasksForTodoList}
        deleteTask={deleteTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeStatus}
        filter={filter}
      />
    </div>
  );
}

export default App;
