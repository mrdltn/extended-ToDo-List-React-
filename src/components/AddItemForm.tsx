import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from '@mui/material/Button';
import { IconButton, TextField } from "@mui/material";
import PlaylistAddSharpIcon from '@mui/icons-material/PlaylistAddSharp';


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.code === "Enter") {
            props.addItem(newTaskTitle);
            setNewTaskTitle("");
        }
    }
    const addTask = () => {
        // debugger
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle.trim());
            setNewTaskTitle("");
        } else {
            setError('Title is required')
        }
    }


    return <div>
                {/* <input value={newTaskTitle}  */}
                <TextField value={newTaskTitle} 
                    variant={'outlined'}
                    label={'Type value'}
                    onChange={onNewTitleChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    error = { !!error }
                    helperText={error}
                />
                {/* <IconButton onClick={addTask} variant={'contained'} color={'primary'}></IconButton> */}
                <IconButton onClick={addTask} color={'primary'}>
                    <PlaylistAddSharpIcon />
                </IconButton>
                {/* { error && <div className="error-message">{error}</div> } */}

            </div>
}