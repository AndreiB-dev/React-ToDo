import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {changeStatus,
        deleteTask,
        setTaskToEdit} from '../../redux/action';
import {ListGroupItem} from 'reactstrap';
import style from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

export default function TasksItem(props) {

    const{
        task,
        task_id,
        status
    } = props;
    const userId = useSelector(state => state.mainReducer.user.user_id);
    const dispatch = useDispatch();

    const handlerChanger = (task_id, status, userId) => {
        const url = 'http://127.0.0.1:3001/todolist/changeStatus';
        dispatch(changeStatus(url, task_id, status, userId));
    };

    const handlerDel = (task_id) => {
        const url = 'http://127.0.0.1:3001/todolist/deleteTask';
        dispatch(deleteTask(url, task_id));
    };

    const handlerEdit = (task_id, task) => {
        dispatch(setTaskToEdit({task_id, task}));
    };

    return(
        <ListGroupItem className = {status ? style.taskStatusDone : style.taskStatusActive}>
                <input
                    className={style.check} 
                    type="checkbox" 
                    checked = {status}
                    onChange = {() => handlerChanger(task_id, status, userId)}
                ></input>
            <span>
            {task}
            </span>
            <button
                className = {style.delbtn}
                onClick = {() => handlerDel(task_id)}
            >
                <FontAwesomeIcon icon={faTrashAlt} />
            </button>
            <button 
                className = {style.editbtn}
                onClick = {() => handlerEdit(task_id, task)}
            >
                <FontAwesomeIcon icon={faEdit} />
            </button>
        </ListGroupItem>
    )
}