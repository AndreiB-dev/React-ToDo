import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Main from "./components/main/main";
import Login from "./components/logIn/logIn";
import Registration from "./components/registration/registration";
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { checkUser } from "./redux/action";
import { useSelector } from "react-redux";
import "./bootstrap.min.css";

function App() {
    const auth = useSelector((state) => state.mainReducer.isAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            const url = "http://127.0.0.1:3001/todolist/checkUser";
            dispatch(checkUser(url));
        }, 200);
    }, []);

    return (
        <div className="App">
            {/* {auth ? <Main /> : <Routes/>} */}
            <Switch>
                <Route exact path="/signin" component={Login} />
                <Route exact path="/signup" component={Registration} />
                <Route
                    path="/"
                    render={() =>
                        auth ? <Main /> : <Redirect to="/signin" />
                    }
                />
            </Switch>
        </div>
    );
}

export default App;
