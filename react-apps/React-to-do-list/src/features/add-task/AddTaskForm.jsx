import { useContext, useState } from "react";
import { TaskContext } from "@/entities/todo";
import Button from "@/shared/UI/Button";
import Field from "@/shared/UI/Field";

const AddTaskForm = (props) => {

    const {styles} = props;
    const [newTaskTitle, setNewTaskTitle] = useState("");
    
    const { addTask ,
        newTaskInputRef 
    } = useContext(TaskContext);

const [error, setError] = useState('');

    const clearNewTaskTitle = newTaskTitle.trim();
    const isNewTaskTitleEmpty = clearNewTaskTitle.length === 0;

    const onSubmit = (event) => {
        event.preventDefault();
        if(!isNewTaskTitleEmpty){
                addTask(clearNewTaskTitle, ()=>{ setNewTaskTitle('')});
        }
        
    }

    const onInput = (event) => {
        const { value} = event.target;
        const clearValue = value.trim();
        const hasOnlySpaces = value.length > 0 && clearValue.length === 0;

        setNewTaskTitle(event.target.value);
        setError(hasOnlySpaces ? 'Ma boy, this shit can\'t be empty' : '')
    }
        

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <Field 
                className={styles.field}
                id="new-task"
                error={error}
                label="New Task title"
                value={newTaskTitle}
                onInput={onInput}
                ref = {newTaskInputRef}   
            />
            <Button 
            type="submit"
            isDisabled={isNewTaskTitleEmpty}
        >
                Add
            </Button>
        </form>
    )
}

export default AddTaskForm