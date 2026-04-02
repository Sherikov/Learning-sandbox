import tasksAPI from "@/shared/api/tasks/index.js";
import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";

const taskReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ALL' : {
            return Array.isArray(action.tasks) ? action.tasks : state;
        }
        case 'ADD' : {
                return [...state, action.task]
        }
        case 'DELETE' : {
            return state.filter((task) => task.id !== action.taskId)
        }
        case 'TOGGLE_COMPLETE' : {
            const {isDone, taskId} = action;

            return state.map((task) => {
                return task.id === taskId ? {...task, isDone} : task
            })
        }
        case 'DELETE_ALL' : {
            return []
        }
        default: {
            return state;
        }
    }
}


const useTasks = () => {
   
    const [tasks, dispatch] = useReducer(taskReducer, []);

   
    const [searchQuery, setSearchQuery] = useState('');
    const [disappearingTaskId, setDisappearingTaskId] = useState(null);
    const [appearingTaskId, setAppearingTaskId] = useState(null);

    const  newTaskInputRef = useRef(null)




const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm("Are you sure you want to delete all tasks?");

    if (isConfirmed) {
     tasksAPI.deleteAll(tasks).then(() => dispatch({ type: 'DELETE_ALL' }))
    }
}, [tasks])

const deleteTask = useCallback((taskId) => {
    

  tasksAPI.delete(taskId)
  
    .then(() => {
        setDisappearingTaskId(taskId)
        setTimeout(() => {
            dispatch({ type: 'DELETE', taskId });
            setDisappearingTaskId(null)
        }, 400);
       ;
    })
})

const toggleTaskComplete = useCallback((taskId, isDone) => {
    tasksAPI.toggleComplete(taskId, isDone)
    .then(() => {
        dispatch({ type: 'TOGGLE_COMPLETE', taskId, isDone });
    })
}, [])



const addTask = useCallback((title, callbackAfterAdding) => {

        const newTask = {

            title,
            isDone: false
        }

        tasksAPI.add(newTask)
        .then((addedTask) => {
            dispatch({ type: 'ADD', task: addedTask });
            callbackAfterAdding();
            setSearchQuery('');
            newTaskInputRef.current.focus()
            setAppearingTaskId(addedTask.id);
            setTimeout(() => {
                setAppearingTaskId(null);
            }, 400);
        })
}, [])




useEffect( () => {
    newTaskInputRef.current.focus()

    tasksAPI.getAll().then((allTasks) => dispatch({ type: 'SET_ALL', tasks: allTasks }))
},[])


const filtredTasks = useMemo( () => {
    const clearSearchQuery = searchQuery.trim().toLowerCase()

    return clearSearchQuery.length > 0 ? tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery)) : null
}, [searchQuery, tasks])


return {
    tasks,
    deleteTask,
    toggleTaskComplete,
    addTask,
    deleteAllTasks,
    filtredTasks,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    disappearingTaskId,
    appearingTaskId
}
}

export default useTasks;
