import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Row, Col, Input, FormGroup } from "reactstrap";
import { logIn } from "../../redux/action";
import { useDispatch } from "react-redux";
import style from "./style.module.css";
import { Link } from "react-router-dom";

export default function LogIn() {
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();
    const handlerClick = () => {
        const url = "http://127.0.0.1:3001/todolist/logIn";
        dispatch(logIn(url, name, pass));
        history.push("/");
        setName("");
        setPass("");
    };

    return (
        <Row>
            <Col xs={{ size: 2, offset: 5 }} className={style.wrapper}>
                <Row>
                    <Col>
                        <h1 className={style.title}>Вход</h1>
                    </Col>
                </Row>
                <Form onSubmit={handlerClick}>
                    <FormGroup>
                        <label className={style.label}>Логин</label>
                        <Input
                            placeholder="введите имя"
                            value={name}
                            onChange={(e) => setName(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup>
                        <label className={style.label}>Пароль</label>
                        <Input
                            placeholder="введите пароль"
                            type="password"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup>
                        <button
                            type="submit"
                            className={style.button}
                            // onClick = {handlerClick}
                        >
                            Войти
                        </button>
                    </FormGroup>
                </Form>
                <p className={style.parag}>Ещё не зарегестрированны?</p>
                <Link to={"/signup"}>Зарегестрироваться</Link>
            </Col>
        </Row>
    );
}
