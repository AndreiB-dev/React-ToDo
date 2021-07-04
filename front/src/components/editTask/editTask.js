import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {editTask, setTaskToEdit} from '../../redux/action';
import {Row, Col} from 'reactstrap';
import style from './style.module.css';

export default function EditTask() {

    const {task_id, task} = useSelector(state => state.mainReducer.taskToEdit);
    const dispatch = useDispatch();
    const [newTask, setNewTask] = useState(task);
    const handlerClick = () => {
        const url = 'http://127.0.0.1:3001/todolist/editTask';
            dispatch(editTask(url, task_id, newTask));
            dispatch(setTaskToEdit(false));
    }; 

    return(
        <Row>
            <Col>
                <div className = {style.wrapper}>
                    <input
                        className = {style.input}
                        onChange = {e => setNewTask(e.target.value)}
                        value = {newTask}
                    ></input>
                    <button
                        className = {style.button}
                        onClick = {handlerClick}
                    >Edit</button>
                </div>
            </Col>
        </Row>
    )
}