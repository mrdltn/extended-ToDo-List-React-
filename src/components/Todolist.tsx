import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "../App";

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
    // debugger
    const [newTaskTitle, setNewTaskTitle] = useState("");// локальный useState для временного хранения введенных данных, но если кликаем на +, то данные ухходят в глобальный useState в App-e.
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.code === "Enter") {
            props.addTask(newTaskTitle, props.id);
            setNewTaskTitle("");
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle.trim(), props.id);
            setNewTaskTitle("");
        } else {
            setError('Title is required')
        }
    }
    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
    // const onChangeHandler = () => {console.log('whant to change');
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    

    return (
        <div>
            <h2>{props.title} <button onClick={removeTodoList}>X</button></h2> 
            <div>
                <input value={newTaskTitle} 
                    onChange={onNewTitleChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className = { error ? 'error' : "" }
                />
                <button onClick={addTask}>+</button>
                { error && <div className="error-message">{error}</div> }
            </div>
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