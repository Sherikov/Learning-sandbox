import { memo, useContext, useMemo } from "react";
import { TaskContext } from "@/entities/todo";

const ToDoInfo = (props) => {
  const {styles} = props;
  const {tasks, deleteAllTasks,} = useContext(TaskContext);

  const total = tasks.length
  const hasTask = total > 0;

  const done = useMemo( () => {
    return tasks.filter(({isDone}) => isDone).length
}, [tasks])

    return (
    <div className={styles.info}>
        <div className={styles.totalTasks}>Done {done} of {total}</div>
        
        {hasTask && (
          <button 
          className={styles.deleteAllButton} 
          type="button"
          onClick={deleteAllTasks}
          >
            Delete all</button>)}
      </div>

    )
}

export default memo(ToDoInfo)