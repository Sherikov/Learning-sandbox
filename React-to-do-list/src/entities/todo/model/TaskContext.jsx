import { createContext, useMemo } from "react";
import useTasks from "../model/useTasks"
import useIncompleteTaskScroll from "./useIncompleteTaskScroll";

export const TaskContext = createContext({});


const TaskProvider = (props) => {
    const {children} = props;

const {
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
} = useTasks();

const {
    firstIncompleteTaskId,
    firstIncompleteTaskRef,

} = useIncompleteTaskScroll(tasks);

const value = useMemo(()=> ({
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
    appearingTaskId,
    firstIncompleteTaskId,
    firstIncompleteTaskRef,

}),[
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
        appearingTaskId,
        firstIncompleteTaskId,
        firstIncompleteTaskRef,
])

    return (
         <TaskContext.Provider value = {value}>
                    {children}
       </TaskContext.Provider>
    )
}


export default TaskProvider;
