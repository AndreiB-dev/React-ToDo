const initialState = {
    taskslist: [],
    user: false,
    taskToEdit: false,
    isAuth: !!localStorage.token,
    fileRoute: false,
};

export function mainReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_TASKLIST":
            return { ...state, taskslist: action.payload };
        case "SET_USER":
            return { ...state, user: action.payload };
        case "SET_TASKTOEDIT":
            return { ...state, taskToEdit: action.payload };
        case "SET_IS_AUTH":
            return { ...state, isAuth: action.payload };
        case "SET_FILEROUTE":
            return { ...state, fileRoute: action.payload };
        default:
            return state;
    }
}
