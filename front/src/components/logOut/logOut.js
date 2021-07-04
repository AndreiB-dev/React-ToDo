import React from 'react';
import {useDispatch} from 'react-redux';
import {logOut} from '../../redux/action';
import style from './style.module.css';

export default function LogOut() {

    const dispatch = useDispatch();
    const handlerClick = () => {
        const url = 'http://127.0.0.1:3001/todolist/logOut';
        dispatch(logOut(url));
    }

    return (
        <button
            className = {style.button}
            onClick = {handlerClick}
        >Выйти</button>
    )
}