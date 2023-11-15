import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid'; // {v4 as uuid}
import { getLocalStorage, setLocalStorage} 
from './utility/local-storage';
import './App.css';
import { TaskLoader } from './components/TaskLoader';
import { TaskList } from './components/TaskList';
import { sortTasksByDate } from './utility/task';
import { showConfirmModal } from './utility/showModal';



const tasks_ls_name = process.env.REACT_APP_TASK_LOCAL_STORAGE_NAME
function App() {
  const [showCancelBtn, setShowCancelBtn] = useState(false);
  const [isEditMode , setIsEditMode] = useState(false);
  const [loadingTasks, setLoadingTask] = useState(true);
  const [tasks, setTasks] = useState([]);
 const [taskInput, setTaskInput] = useState("");
const [formError, setFormError] = useState({
  isError: false,
  errorMessage: null,
});

const [taskIdToEdit, setTaskIdToEdit] = useState(null);
  

  const createTask =  (e) => {
    e.preventDefault();
    try {    
    if(!taskInput){
      setFormError({
        isError: true,
        errorMessage: "Kindly Enter a task title",
       
      })
      setTimeout(() =>{
        setFormError({
          isError: false,
          errorMessage: null,
        })
    }, 4000);
    return;
  }

    const newTask = {
        id: uuid(),
        title: taskInput,
        date: Date.now(),
    };
   

    // check if local storage is empty
    
    const task_LS = getLocalStorage(
     tasks_ls_name
    )

    const newTasks = [...task_LS, newTask];
  
    // // add new task to local storage
    setLocalStorage(tasks_ls_name, newTasks);
    fetchTask();
    // setting input field to empty
  setTaskInput("");
}
catch (error) {
      setFormError({
        isError: true,
        errorMessage: error.message,
      });
}
};


// DELETE task FUNCTION

const handleDeleteTask = (id) => {
  const deleteTask = () => {
    
    const tasks_ls = getLocalStorage(tasks_ls_name);
    const new_tasks_ls_name = tasks_ls.filter((task) => task.id !== id)
    setLocalStorage(tasks_ls_name, new_tasks_ls_name);
    fetchTask();
  };

  showConfirmModal({
    title: 'Delete Task',
    text: 'Do you want to delete this task?',
    icon: 'warning',
    confirmButtonText: 'Yes!',
    showCancelButton: true,
    cancelButtonText: 'No, cancel!',
    cb: deleteTask,
  
    
  })
  }

// READ task FUNCTION
const fetchTask = () => {
  const tasks = getLocalStorage(tasks_ls_name);
  const sortedTasks = sortTasksByDate(tasks);
  setTasks(sortedTasks);
  setTimeout(() =>{
    setLoadingTask(false);
  } , 2000); 

};


function handleEditMode(id){
  setShowCancelBtn(false);
  setIsEditMode(true);
  setTaskIdToEdit(id);
  const tasks_ls = getLocalStorage(tasks_ls_name);
  const task_to_edit = tasks_ls.find((task) => task.id === id);
  if(!task_to_edit){
      return;
  }
  
  // console.log(task_to_edit);
  setTaskInput(task_to_edit.title); 
  setShowCancelBtn(true);
 
  
  
  
  };

  const handleCancelTask = () => {
    setTaskInput(""); // Reset form inputs
     setShowCancelBtn(false); // Hide the Cancel button
     setIsEditMode(false); // Show the Add button
   };

   const editTask =  (e) => {
    e.preventDefault();
    try {
      if (!taskInput) {
        setFormError({
          isError: true,
          errorMessage: "Kindly enter a task title to edit",
        });
        setTimeout(() => {
          setFormError({
            isError: false,
            errorMessage: null,
          });
        }, 2000);
      } else {
        const task_LS = getLocalStorage(tasks_ls_name);
        const edited_task_LS = task_LS.map((task) => {
          if (task.id === taskIdToEdit) {
            return { ...task, title: taskInput };
          } else {
            return task;
          }
        });
  
         setLocalStorage(tasks_ls_name, edited_task_LS); // update Storage
       fetchTask(); //  update UI operation
        setTaskInput("");
        setIsEditMode(false);
      }
    } catch (error) {
      setFormError({
        isError: true,
        errorMessage: error.message,
      });
    }
  };
  

   

// // Render tasks
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
    <form className="flex flex-col items-center sm:flex-row gap-3" action >
      <input value = {taskInput}
      onChange={(e) =>setTaskInput(e.target.value)} 
      className="border border-slate-300 shadow 
      rounded-lg mb-2 px-2.5 py-2 hover:bg-gray-100 
      focus:outline-slate-400 w-full" type="text" 
      placeholder="What needs to be done today?" />

      

    {isEditMode? (
      <>
      <button className="bg-amber-500 rounded-lg
          hover:bg-amber-300 text-white
           text-sm font-bold px-2.5 py-2 w-[120px]"
            onClick={editTask} 
            type="submit">
        edit
      </button>
      {showCancelBtn && (
        
       <button className="bg-amber-500 rounded-lg 
          hover:bg-amber-300 text-white text-sm 
          font-bold px-2.5 py-2 w-[120px]"
            onClick={() => handleCancelTask()}
           type="button"
           >
        Cancel
      </button> 
      )}
      </>
    ): (
<button className="bg-blue-600 rounded-lg 
          hover:bg-indigo-700 text-white text-sm mb-2
            px-2.5 py-2 w-[120px]"
            onClick={createTask}
            type="submit" 
            id="add_task_btn"
            >
        Add Task
      </button>
    )}
    </form>
    {formError?.isError && (<span className="text-sm text-red-400">{formError.errorMessage}
    </span>)}

   {!loadingTasks && tasks.length === 0 && 
  ( <p className="text-center text-sm text-slate-200">
   No task yet! Your tasks will appear here once you add them...
   </p>
   )}

   
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
        handleDeleteTask={handleDeleteTask}
        handleEditMode={handleEditMode}
        handleCancelTask={handleCancelTask}
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
