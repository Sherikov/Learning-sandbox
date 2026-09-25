
import {ToDoItem, TaskContext } from "@/entities/todo";
import { memo, useContext } from "react";


const ToDoList = (props) => {

    const {styles} = props;

    const {tasks, filtredTasks} = useContext(TaskContext);
    const hashTask = tasks.length > 0 ;
    const isEmptyFilteredTasks = filtredTasks?.length === 0;
   
    if (!hashTask) {
        return <div className={styles.emptyMessage}>Ma boy, there r noy tasks</div>
    }

    if (hashTask && isEmptyFilteredTasks) {
        return <div className={styles.emptyMessage}>Ma boy, can not find this tasks</div>
    }

    return (
         <ul className={styles.list}>
            {(filtredTasks ?? tasks).map((task) => (
                <ToDoItem
                className={styles.item}
                key={task.id}
                id={task.id}
                title={task.title}
                isDone={task.isDone}
                />
            ))}
      </ul>
    )
}

export default memo(ToDoList);
