import React from "react";
import { useSelector } from "react-redux";
import LogOut from "../logOut/logOut";
import Avatar from "../avatar/avatar";
import WriteList from "../writeListToFile/writeListToFile";
import DLFile from "../downloadFile/downloadFile";
import GetTasks from "../getTasks/getTasks";
import AddTask from "../addTask/addTask";
import EditTask from "../editTask/editTask";
import SearchTask from "../searchTask/searchTask";
import { Row, Col, Spinner } from "reactstrap";
import style from "./style.module.css";

export default function Main() {
    const taskToEdit = useSelector((state) => state.mainReducer.taskToEdit);
    const user = useSelector((state) => state.mainReducer.user);
    const fileLink = useSelector((state) => state.mainReducer.fileRoute);
    const list = useSelector((state) => state.mainReducer.taskslist);
    function activeTaskFilter(item) {
        if (
            user.user_id &&
            item.status === false &&
            item.user_id === user.user_id
        ) {
            return true;
        } else {
            return false;
        }
    }

    const activeTasks = list.filter(activeTaskFilter);

    return (
        <>
            {!user ? (
                <Spinner color="primary" />
            ) : (
                <Row>
                    <Col
                        xs={{ size: 2, offset: 3 }}
                        className={style.avatarwrap}>
                        <Avatar />
                        {fileLink === false ? <WriteList /> : <DLFile />}
                        {/* <FileUpload />
                        <LogOut /> */}
                    </Col>
                    <Col xs={{ size: 4 }} className={style.wrapper}>
                        <Row>
                            <Col>
                                <h1 className={style.title}>Список задач</h1>
                                <h2 className={style.subtitle}>
                                    Активных задач: {activeTasks.length}
                                </h2>
                            </Col>
                        </Row>
                        <SearchTask />
                        <GetTasks />
                        {taskToEdit === false ? <AddTask /> : <EditTask />}
                        <LogOut />
                    </Col>
                </Row>
            )}
        </>
    );
}
