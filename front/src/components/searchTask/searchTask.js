import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {searchTask} from '../../redux/action';
import {Row, Col} from 'reactstrap';
import style from './style.module.css';


export default function SearchTask() {

    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');
    const userId = useSelector(state => state.mainReducer.user.user_id);

    const handlerChange = (e) => {
        setSearchText(e.target.value);
    };

    useEffect(() => {
        const url = 'http://127.0.0.1:3001/todolist/searchTask';
        dispatch(searchTask(url, searchText, userId))
    }, [searchText]);

    return (
        <Row>
            <Col>
                <div className = {style.wrapper}>
                    <input
                        className = {style.input}
                        placeholder = ' 🔍 найти задачу'
                        onChange = {e => handlerChange(e)}
                        value = {searchText}
                    ></input>
                </div>
            </Col>
        </Row>
    )
}
