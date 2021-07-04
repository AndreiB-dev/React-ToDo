import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {regUser} from '../../redux/action';
import {Link} from 'react-router-dom';
import {Row, Col, Form, Input, FormGroup} from 'reactstrap';
import style from './style.module.css';


export default function Registration() {

    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [pass2, setPass2] = useState('');
    const dispatch = useDispatch();
    const handlerClick = () => {
        const url = 'http://127.0.0.1:3001/todolist/Registration';
        if (name !== null && pass !== null && pass === pass2) {
            dispatch(regUser(url, name, pass));
            setName('');
            setPass('');
            setPass2('');
        } else {
            alert('Все поля должны быть запнены и пароли должны совпадать')
        }
    }

    return (
        <Row>
            <Col xs={{ size: 2, offset: 5 }} className = {style.wrapper}>
                <Row>
                    <Col>
                        <h1 className = {style.title}>Регестрация</h1>
                    </Col>
                </Row>
                <Form>
                    <FormGroup>
                        <label className = {style.label}>Имя пользователя</label>
                        <Input
                            placeholder = 'введите имя'
                            value = {name}
                            onChange = {e => setName(e.target.value)}
                        >
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <label className = {style.label}>Пароль</label>
                        <Input
                            placeholder = "введите пароль"
                            type = 'password'
                            value = {pass}
                            onChange = {e => setPass(e.target.value)}
                        >
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <label className = {style.label}>Повторите пароль</label>
                        <Input
                            placeholder = "повторите пароль"
                            type = 'password'
                            value = {pass2}
                            onChange = {e => setPass2(e.target.value)}
                        >
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <button
                            className = {style.button}
                            onClick = {handlerClick}
                        >Зарегестрироваться</button>
                    </FormGroup>
                </Form>
                <p className = {style.parag}>Уже зарегестрированны?</p>
                <Link to = "/signin">Войти</Link>
            </Col>
        </Row>
    )
}