import { useEffect, useState } from 'react';
import tasksAPI from '@/shared/api/tasks';

const TaskPage = (props) => {
    const { param } = props;
    const taskId = param.id;

    const [task, setTask] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        tasksAPI.getById(taskId)
            .then((taskData) => { 
                setTask(taskData);
                setHasError(false);

            })
            .catch(() => setHasError(true))
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (hasError) {
        return <div> Task not found!</div>
    }


    return (
        <div>
            <h1>{task.title} </h1>
            <p>{task.isDone ? 'Completed' : 'Not completed'} </p>
        </div>
    );

}

export default TaskPage;