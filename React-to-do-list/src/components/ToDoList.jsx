import ToDoItem from "./ToDoItem";

const ToDoList = (props) => {
    const {
      tasks = [],
      onDeleteTaskButtonClick,
        onTaskCompleteChange
    } = props;
    const hashTask = true;
   
    if (!hashTask) {
        return <div className="todo__empty-message"></div>
    }

    return (
         <ul className="todo__list">
            {tasks.map((task) => (
                <ToDoItem
                className="todo__item"
                key={task.id}
                id={task.id}
                onDeleteTaskButtonClick={onDeleteTaskButtonClick}
                title={task.title}
                isDone={task.isDone}
                onTaskCompleteChange={onTaskCompleteChange}
                />
            ))}
      </ul>
    )
}

export default ToDoList;