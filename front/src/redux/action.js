import Axios from 'axios';

export function setTaskslist(value) {
    return {
        type: 'SET_TASKLIST',
        payload: value
    };
};

export function setUser(user) {
    return {
        type: 'SET_USER',
        payload: user
    };
};

export function setIsAuth(bool) {
    return {
        type: 'SET_IS_AUTH',
        payload: bool
    };
}

export function setTaskToEdit(task) {
    return {
        type: 'SET_TASKTOEDIT',
        payload: task
    };
};

export function setListRoute(value) {
    return {
        type: 'SET_FILEROUTE',
        payload: value
    };
};

export function logIn(url, name, pass) {
    return dispatch => {
        return Axios.post(url, {name: name, pass: pass})
            .then(res => {
                dispatch(setIsAuth(true));
                dispatch(setUser(res.data.userData));
                localStorage.setItem('token', res.data.token);
                return res.data;
            })
            .catch(error => console.log(error) )
    };
};

export function regUser(url, name, pass) {
    return dispatch => {
        Axios.post(url, {name: name, pass: pass})
            .then( res => {
                dispatch(setUser(res.data.userData));
                localStorage.setItem('token', res.data.token);
            })
            .catch(error => console.log(error))
    };
};

export function logOut(url) {
    let token = localStorage.token;
    return dispatch => {
        Axios.post(url, {}, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => { 
                dispatch(setIsAuth(false)); 
                localStorage.clear(); })
            .catch(error => console.log(error))

    };
};

export function checkUser(url) {
    let token = localStorage.token;
    return dispatch => {
        Axios.post(url, {}, {headers: {"Authorization": `Bearer ${token}`}})
            .then(res => {
                if (res.data.result !== false) {
                    console.log("ceck", res.data.result)
                    dispatch(setIsAuth(true));
                    dispatch(setUser(res.data.result.userData));
                } else {
                    dispatch(setIsAuth(false));
                }
            })
            .catch(error => console.log(error))
    };
};

export function addTask(url, task, userId) {
    let token = localStorage.token;
    return dispatch => {
        Axios.post(url, {task: task, user_id: userId}, {headers: {"Authorization": `Bearer ${token}`}})
            .then(res => {dispatch(setTaskslist(res.data.result))} )
            .catch(error => console.log(error))
    };
};

export function getTasks(url, userId) {
    let token = localStorage.token;
    return dispatch => {
        Axios.post(url, {user_id: userId}, {headers: {"Authorization": `Bearer ${token}`}})
            .then(res => {dispatch(setTaskslist(res.data.result))})
            .catch(error => console.log(error))
    };
};

export function changeStatus(url, task_id, status, userId) {
    let token = localStorage.token;
    return dispatch => {
        Axios.post(url, {task_id, status: !status, user_id: userId},
            {headers: {"Authorization": `Bearer ${token}`}})
            .then(res => {dispatch(setTaskslist(res.data.result))})
            .catch(error => console.log(error))
    };
};

export function deleteTask(url, task_id) {
    let token = localStorage.token;
    return dispatch => {
        Axios.post(url, {task_id}, {headers: {"Authorization": `Bearer ${token}`}})
            .then(res => {dispatch(setTaskslist(res.data.result))})
            .catch(error => console.log(error))
    };
};

export function editTask(url, task_id, task) {
    let token = localStorage.token;
    return dispatch => {
        Axios.post(url, {task_id, task}, {headers: {"Authorization": `Bearer ${token}`}})
            .then(res => {dispatch(setTaskslist(res.data.result))})
            .catch(error => console.log(error))
    };
};

export function searchTask(url, searchText, userId) {
    let token = localStorage.token;
    return dispatch => {
        Axios.post(url, {text: searchText, user_id: userId},
            {headers: {"Authorization": `Bearer ${token}`}})
            .then(res => {dispatch(setTaskslist(res.data.result))})
            .catch(error => console.log(error))
    };
};

export function avatarUpload(url, data) {
    let token = localStorage.token;
    return dispatch => {
        Axios.post(url, data,
            {headers: {'Content-Type': 'multipart/form-data', "Authorization": `Bearer ${token}`}})
            .then(res => {dispatch(setUser(res.data.result))})
            .catch(error => console.log(error))
    };
};

export function writeList(url, userId) {
    let token = localStorage.token;
    return dispatch => {
        Axios.post(url, {user_id: userId},
            {headers: {"Authorization": `Bearer ${token}`}})
            .then(res => {dispatch(setListRoute(res.data.userPath))})
            .catch(error => console.log(error))
    };
};

