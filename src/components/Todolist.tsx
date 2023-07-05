import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "../App";
import { AddItemForm } from "./AddItemForm";


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
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
}

export function Todolist(props: PropsType) {
    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
    // const onChangeHandler = () => {console.log('whant to change');
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    
    const addTask = (title: string) => {
        // debugger
        props.addTask(title, props.id)
    }

    function addTodoList(title:string) {

    }

    return (
        <div>
            <h2>{props.title} <button onClick={removeTodoList}>X</button></h2> 

            <AddItemForm addItem={addTask} />
            <ul>
                {
                    props.tasks.map(t => {
                        const onDeleteHandler = () => {props.deleteTask(t.id, props.id)}
                        const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        }

                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox"
                                onChange={onNewTitleChangeHandler} />
                            <span>{t.title}</span>
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
