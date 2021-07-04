import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getTasks} from '../../redux/action';
import TasksItem from '../tasksItem/tasksItem';
import {Row, Col, ListGroup} from 'reactstrap';
import style from './style.module.css';

export default function GetTasks() {

    const userId = useSelector(state => state.mainReducer.user.user_id);
    const taskslist = useSelector(state => state.mainReducer.taskslist);
    const dispatch = useDispatch();

    useEffect(() =>{
        if (userId) {
            const url = 'http://127.0.0.1:3001/todolist/getTasks';
            dispatch(getTasks(url, userId))
        }
    },[userId]);

    function activeTaskFilter(item) {
        if (userId && item.status === false && item.user_id === userId) {
            return true;
        } else {
            return false;
        };
    };

    function doneTaskFilter(item) {
        if (userId && item.status !== false && item.user_id === userId) {
            return true;
        } else {
            return false;
        };
    };

    const activeTasks = taskslist.filter(activeTaskFilter);
    const doneTasks = taskslist.filter(doneTaskFilter);
    const sortedList = [...activeTasks, ...doneTasks];

    return(
        <Row>
            <Col className = {style.listWrapper}>
                <ListGroup>
                {sortedList.length > 0 && sortedList.map(item =>
                    <TasksItem
                        task_id = {item.task_id}
                        task = {item.task}
                        status = {item.status}
                        key = {item.task_id}
                    />
                )}
                </ListGroup>
            </Col>
        </Row>
    )
} 
