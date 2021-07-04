import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {avatarUpload} from '../../redux/action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import style from './style.module.css';

export default function Avatar() {

    const [file, setFile] = useState();
    const userId = useSelector(state => state.mainReducer.user.user_id);
    const dispatch = useDispatch();
    const avatar = useSelector(state => state.mainReducer.user.avatar);
    const avatarSrc = `http://127.0.0.1:3001/images/${avatar}`

    const HandlerSubmit = () => {
        const url = 'http://127.0.0.1:3001/files/avatarUpload';
        const data = new FormData();
        data.append('file', file);
        data.append('user_id', userId);
        data.append('avatar', avatar);

        dispatch(avatarUpload(url, data));
    }


    return (
        <form onSubmit = {HandlerSubmit}>
        <img style = {{width: '100%'}} src = {avatarSrc}/>
            <div className = {style.wrapper}>
                <input 
                    type="file" 
                    name="file" 
                    id="file" 
                    onChange = {e => setFile(e.target.files[0])} 
                />
                    <label htmlFor="file" className={style.label}>
                        <span >Выбрать аватар</span>
                    </label>
                <button className = {style.button} type = "submit">
                    <FontAwesomeIcon icon={faUpload} transform = "up-2"/>
                </button>
            </div>
        </form>
    )
}