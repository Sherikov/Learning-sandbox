import TasksProvider from '../../entities/todo';
import ToDo from '@/widgets/ToDo';

const TasksPage = () => {

    return (
      <TasksProvider>
        <ToDo />
      </TasksProvider>
    );

}

export default TasksPage;