import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addTask} from '../../redux/action';
import {Row, Col} from 'reactstrap';
import style from './style.module.css';

export default function AddTask() {

    const userId = useSelector(state => state.mainReducer.user.user_id);
    const dispatch = useDispatch();
    const [task, setTask] = useState();
    const handlerClick = () => {
        const url = 'http://127.0.0.1:3001/todolist/addTask';
        if (userId && task.length > 0) {
            dispatch(addTask(url, task, userId));
            setTask('');
        }
    } 

    return(
        <Row>
            <Col>
                <div className={style.wrapper}>
                <input
                    className={style.input}
                    onChange = {e => setTask(e.target.value)}
                    value = {task}
                ></input>
                <button
                    className={style.button}
                    onClick = {handlerClick}
                >ADD</button>
                </div>
            </Col>
        </Row>
    )
}