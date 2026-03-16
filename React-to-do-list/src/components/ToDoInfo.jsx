const ToDoInfo = (props) => {

  const {
    total,
    done,
    onDeleteAllButtonClick
  } = props;

  const hashTask = total > 0;

    return (
    <div className="todo__info">
        <div className="todo__total-tasks">Done {done} of {total}</div>
        
        {hashTask && (
          <button 
          className="todo__delete-all-button" 
          type="button"
          onClick={onDeleteAllButtonClick}
          >
            Delete all</button>)}
      </div>

    )
}

export default ToDoInfo