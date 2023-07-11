import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "../App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType> // TaskType[]
    deleteTask: (taskId: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (todoListId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {
    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
    // const onChangeHandler = () => {console.log('whant to change');
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const changeTodoListTitle = (newTitle: string) => {
        // debugger;
        props.changeTodoListTitle(props.id, newTitle)
    }
    
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    // function addTodoList(title:string) {

    // }

    return (
        <div>
            <h2> <EditableSpan title={props.title} onChange={changeTodoListTitle} />
                <button onClick={removeTodoList}>X</button>
            </h2> 

            <AddItemForm addItem={addTask} />
            <ul>
                {
                    props.tasks.map(t => {
                        const onDeleteHandler = () => {props.deleteTask(t.id, props.id)}
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            props.changeTaskStatus(t.id, newIsDoneValue, props.id)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }

                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox"
                                onChange={onChangeStatusHandler} />
                            <EditableSpan title={t.title} 
                                          onChange={onChangeTitleHandler} />
                            <button onClick={onDeleteHandler}>X</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={ props.filter === 'all' ? "active-filter" : ""} onClick={onAllClickHandler}>All tasks</button>
                <button className={ props.filter === 'active' ? "active-filter" : ""} onClick={onActiveClickHandler}>Active tasks</button>
                <button className={ props.filter === 'completed' ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed tasks</button>
            </div>
        </div>
    )
}

