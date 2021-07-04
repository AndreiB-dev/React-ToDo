import React from 'react';
import {useSelector} from 'react-redux';
import style from './style.module.css';

export default function DLFile() {

    const userLink = useSelector(state => state.mainReducer.fileRoute);

    return (
    <form method="get" action={userLink}>
        <button 
            type="submit"
            className = {style.button}
            >Посмотреть</button>
     </form>
    )
}