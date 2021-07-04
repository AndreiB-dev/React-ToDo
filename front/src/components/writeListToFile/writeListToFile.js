import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {writeList} from '../../redux/action';
import style from './style.module.css';

export default function WriteList() {

    const userId = useSelector(state => state.mainReducer.user.user_id);
    const dispatch = useDispatch();

    const handlerClick = () => {
        const url = 'http://127.0.0.1:3001/files/writeList';
        dispatch(writeList(url, userId));
    }

    return (
        <button
            className = {style.button}
            onClick = {handlerClick}
        >Сохранить в файл</button>
    )
}