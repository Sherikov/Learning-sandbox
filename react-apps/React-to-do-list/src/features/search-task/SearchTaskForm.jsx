import { useContext } from "react";
import { TaskContext } from "@/entities/todo";
import Field from "@/shared/UI/Field";
;

const SearchTaskForm = (props) =>
  
  
  {
    const {styles} = props;
    const { searchQuery, setSearchQuery} = useContext(TaskContext);

    return (
        <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
          
          <Field 
            className={styles.field}
            id="search-task"
            label="Search task"
            type="search"
            value= {searchQuery}
            onInput={(event) => setSearchQuery(event.target.value)}

          />
        </form>
    ) 
}

export default SearchTaskForm