import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "../App";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    title: string,
    tasks: Array<TaskType> // TaskType[]
    deleteTask: (taskId: string) => void
    addTask: (title: string) => void
    changeFilter: (value: FilterValuesType) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    // debugger
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.code === "Enter") {
            props.addTask(newTaskTitle);
            setNewTaskTitle("");
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle.trim());
            setNewTaskTitle("");
        } else {
            setError('Title is required')
        }
    }
    const onAllClickHandler = () => props.changeFilter('all');
    const onActiveClickHandler = () => props.changeFilter('active');
    const onCompletedClickHandler = () => props.changeFilter('completed');
    // const onChangeHandler = () => {console.log('whant to change');
    

    return (
        <div>
            <h2>{props.title}</h2> 
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
                        const onDeleteHandler = () => {props.deleteTask(t.id)}
                        const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked)
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