import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid'; // {v4 as uuid}
import { getLocalStorage, setLocalStorage} from './utility/local-storage';
import './App.css';
import { TaskLoader } from './components/TaskLoader';
import { TaskList } from './components/TaskList';

const tasks_ls_name = process.env.REACT_APP_TASK_LOCAL_STORAGE_NAME
function App() {
  const [loadingTasks, setLoadingTask] = useState(true);
  const [tasks, setTasks] = useState([]);
 const [todoInput, setTodoInput] = useState("");
const [formError, setFormError] = useState({
  isError: false,
  errorMessage: null,
});
  
  console.log(process.env.REACT_APP_TASK_LOCAL_STORAGE_NAME);  
  const createTask =  (e) => {
    e.preventDefault();
    try {    
    if(!todoInput){
      setFormError({
        isError: true,
        errorMessage: "Kindly Enter a task title",
       
      })
      setTimeout(() =>{
        setFormError(null)
    }, 4000);
  }

    const newTask = {
        id: uuid(),
        title: todoInput,
        date: Date.now(),
    };
    // console.log(newTodo)

    // check if local storage is empty
    
    const task_LS = getLocalStorage(
     tasks_ls_name
    )

    const newTasks = [...task_LS, newTask];
  
    // // add new task to local storage
    setLocalStorage(tasks_ls_name, newTasks);
    // // fetchTask();
    // // // setting the input field to empty after clicking the add todo button
    // // resetFormInput();
}
catch (error) {
    formError(error.message);  
}
};


// READ TODO FUNCTION
const fetchTask = () => {
  const tasks = getLocalStorage(tasks_ls_name);
  setTasks(tasks);
  setTimeout(() =>{
    setLoadingTask(false);
  } , 2000); 

};


// // Sort the todos by date in descending order
// const sortedTodos = sortTodosByDate(todo_Db);

// // Render todos
useEffect(() => {
  fetchTask();
}, [])
// console.log(tasks);

  return (
<section className="container mt-10 mx-auto rounded-lg bg-blue-900 w-[80%] px-3
     sm:w-[30%]">
  <header className="px-5 py-4 mx-auto flex justify-center 
    items-center gap-1">
    <img src="./taskifyLogo.png" alt="Taskify Logo" className="w-[40px] h-[40px] rounded-lg" />
    <h1 className="text-xl text-center text-slate-200 mt-5 
  font-medium">Taskify</h1>
  </header>
  <main className="px-5 mt-5 max-w-lg mx-auto">
    <form className="flex flex-col items-center sm:flex-row gap-3" action>
      <input value = {todoInput}
      onChange={(e) => setTodoInput(e.target.value)} 
      className="border border-slate-300 shadow 
      rounded-lg mb-2 px-2.5 py-2 hover:bg-gray-100 
      focus:outline-slate-400 w-full" type="text" 
      placeholder="What needs to be done today?" />

      <button className="bg-blue-600 rounded-lg 
          hover:bg-indigo-700 text-white text-sm mb-2
            px-2.5 py-2 w-[120px]"
            onClick={createTask} type="button" 
            id="add_todo_btn"
            >
        Add Task
      </button>

      <button className="bg-amber-500 rounded-lg hidden
          hover:bg-amber-300 text-white
           text-sm font-bold px-2.5 py-2 w-[120px]"
            // onClick={updateTodo} 
            type="button" id="update_todo_btn">
        Update
      </button>
      {/* <button className="bg-amber-500 rounded-lg hidden
          hover:bg-amber-300 text-white text-sm font-bold 
          px-2.5 py-2 w-[120px]" type="button" id="cancel_todo_btn">
        Cancel
      </button> */}
    </form>
    {formError?.isError && (<span className="text-sm text-red-400">{formError.errorMessage}
    </span>)}

   {!loadingTasks && tasks.length === 0 && 
  ( <p className="text-center text-sm text-slate-200">
   No task yet! Your tasks will appear here once you add them...
   </p>
   )}
{/* <TaskLoader /> */}
   
<section className="mt-5">
{loadingTasks ? (
  <>
  <TaskLoader />
  <TaskLoader />
  <TaskLoader />
  </>
) : (
  <>
    {tasks.map((task) => (
      <TaskList
        title={task.title}
        id={task.id}
        date={task.date}
        key={task.id}
      />
    ))}
  </>
)}
  </section>
  </main>
</section>

  );
}

export default App;
