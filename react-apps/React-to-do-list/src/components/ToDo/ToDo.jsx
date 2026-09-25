import { useContext } from "react";
import ToDoList from "../../../entities/todo/ui/ToDoList/ToDoList";
import AddTaskForm from "../../../features/add-task/AddTaskForm";
import SearchTaskForm from "../../../features/search-task/SearchTaskForm";
import ToDoInfo from "../../../features/stats/ToDoInfo";
import { TaskContext } from "../../context/TaskContext";
import Button from "../../shared/UI/Button";
import styles from "./ToDo.module.scss";


const ToDo = () => { 

    const {firstIncompleteTaskRef} = useContext(TaskContext);

    return (
        <div className={styles.todo}>
                <h1 className={styles.title}>To Do List</h1>
                <AddTaskForm styles={styles} />
                <SearchTaskForm  styles={styles}/>
                <ToDoInfo styles={styles}/>
                <Button onClick ={() => firstIncompleteTaskRef.current?.scrollIntoView({behavior: 'smooth'})}>
                    Show first incomplete task</Button>
                <ToDoList styles={styles} />
        
            </div>
    )
}


export default ToDo;