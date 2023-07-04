import React, { useState } from 'react';
import './App.css';
import { Todolist } from './components/Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';
type TodoListType = {
  id: string,
  title: string,
  filter: FilterValuesType
}

function App() {
  function deleteTask(id: string, todoListId: string) {
    // debugger;
    let tasks = tasksObj[todoListId];
    let filteredTasks = tasks.filter(t => t.id !== id);
    tasksObj[todoListId] = filteredTasks;
    setTasks({...tasksObj});
  }

  function addTask(title: string, todoListId: string) {
    let task = { id: v1(), title: title, isDone: false };
    let tasks = tasksObj[todoListId];
    let newTasks = [task, ...tasks];
    tasksObj[todoListId] = newTasks;
    setTasks({...tasksObj});
  }

  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let task = tasks.find(t => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      // tasksObj[todoListId] = [...tasksObj]
      setTasks({...tasksObj});
    }   
  }

  function changeFilter(value: FilterValuesType, todoListId: string) {
    let todoList = todoLists.find(tl => tl.id === todoListId);
    if(todoList) {
      todoList.filter = value;
      setTodoLists([...todoLists]);
    }
  }

  let todoListId1 = v1();
  let todoListId2 = v1();

  // let todoLists: Array<TodoListType> = [
  let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    {id: todoListId1, title: "What to lern", filter: 'active'},
    {id: todoListId2, title: "What to buy", filter: 'completed'}
  ])

  let removeTodoList = (todoListId: string) => {
    debugger;
    let filteredTodoList = todoLists.filter(tl => tl.id !== todoListId);
    setTodoLists(filteredTodoList);

    delete tasksObj[todoListId];
    setTasks({...tasksObj});
  }

  let [tasksObj, setTasks] = useState({
    [todoListId1]: [
      {id: v1(), title: "CSS", isDone: false},
      {id: v1(), title: "React", isDone: true},
      {id: v1(), title: "TS", isDone: true},
      {id: v1(), title: "Redux", isDone: false},
    ],
    [todoListId2]: [
      {id: v1(), title: "apple", isDone: true},
      {id: v1(), title: "orange", isDone: false},
      {id: v1(), title: "ananas", isDone: false},
      {id: v1(), title: "kiwi", isDone: true},
    ],

  })

  return (
    <div className="App">
      {
        todoLists.map((tl) => {

          let tasksForTodoList = tasksObj
    [tl.id];

          if(tl.filter === 'completed') {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
          }
          if(tl.filter === 'active') {  
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
          } 

          return <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodoList}
            deleteTask={deleteTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={tl.filter}
            removeTodoList={removeTodoList}
          />
        })
      }
    </div>
  );
}

export default App;
