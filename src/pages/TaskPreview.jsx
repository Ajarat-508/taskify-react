import React from 'react'

import { Link, Route, useParams } from 'react-router-dom'

import { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage} from '../utility/local-storage';
import { getDate } from '../utility/task';
import PreviewLoader from '../components/PreviewLoader';
import Swal from 'sweetalert2';
import EditPreviewTask from '../components/EditPreviewTask';




const TaskPreview = () => {
  const { task_id } = useParams();
  const [task, setTask] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [isPreviewFormHidden, setIsPreviewFormHidden] = useState(false);
  const [taskStatus, setTaskStatus] = useState('Pending');
  const [formError, setFormError] = useState({
    isError: false,
    errorMessage: null,
  });
 

  const imageUrl =    'https://cdn.hashnode.com/res/hashnode/image/upload/v1700173797804/48f89484-bffe-4d65-b044-f727cc2d3c9e.png';
  
  
  
  const getTaskById = () => {
    const tasks_ls_name = process.env.REACT_APP_TASK_LOCAL_STORAGE_NAME;
    const tasks_ls = getLocalStorage(tasks_ls_name);
    const currentTask = tasks_ls.find((task) => task.id === task_id);
    if (currentTask) {
      setTask(currentTask);
      }
    };
    

      useEffect(() => {
        if (task_id) {
          getTaskById();
        }
      }, [task_id]);


  
  
  const handlePreviewEdit = (e) => {
    e.preventDefault();
    const tasks_ls_name = process.env.REACT_APP_TASK_LOCAL_STORAGE_NAME;
    const task_ls = getLocalStorage(tasks_ls_name);
    const taskIndex = task_ls.findIndex((taskItem) => taskItem.id === task_id);
    
    
    try {
    if (taskIndex !== -1) {
      if (editTitle === '' || taskDescription === '') {
        setFormError({
          isError: true,
          errorMessage: "Task Title and Description are required",
         
        })
        setTimeout(() =>{
          setFormError({
            isError: false,
            errorMessage: null,
          })
      }, 4000);
      return;
      } else {
        const updatedCurrentTask = {
          ...task_ls[taskIndex],
          title: editTitle,
          description: taskDescription,
        };
        task_ls[taskIndex] = updatedCurrentTask;
        setLocalStorage(tasks_ls_name, task_ls);
        getTaskById();
      }
      
      setEditTitle('');
      setTaskDescription('');
     
      document.querySelector("#preview_form").classList.add("hidden");
      
      
    } }catch (error) {
      setFormError({
        isError: true,
        errorMessage: error.message,
      });
    }
  };
  

  const togglePreviewForm = () => {
    setIsPreviewFormHidden(prevState => !prevState);
  };
 

   const handleStatusChange = (e) => {
    const checkTask = e.target;
    const newStatus = checkTask.checked ? 'Completed' : 'Pending';
    setTaskStatus(newStatus);
  };
  const deleteTask = (id) => {
    Swal.fire({
      title: "Delete Task",
      text: "Do you want to delete this task",
      icon: "warning",
      confirmButtonText: "Yes!",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
       
        const tasks_ls_name = process.env.REACT_APP_TASK_LOCAL_STORAGE_NAME;
        const task_ls = getLocalStorage(tasks_ls_name);
        const new_task_ls = task_ls.filter((task) => task.id !== id);
        
        setLocalStorage(tasks_ls_name, new_task_ls);
        
    
      } else {
        return;
      }
    });
  };

  if (!task) {
    return <PreviewLoader />;
  }

  

 

 
  return (
    
      <section className="container mt-10 mx-auto bg-slate-700 rounded-lg w-[80%] px-3
     sm:w-[30%]">
  <header className="px-5 py-4 mx-auto flex justify-center 
    items-center gap-3">
       <img className=" mt-2 w-[40px] h-[40px] rounded-lg" src={imageUrl} alt="Taskify Logo" />
  
    <h1 className="text-3xl text-center text-slate-200 mt-5 
  font-medium">Taskify</h1>
  </header>
  <main className="px-5 mt-5 max-w-lg mx-auto">

    <section id="preview-container">
    <section className=" group flex justify-between items-center gap-2">
    <div className=' flex items-center gap-2 mb-2'>

      <input className="p-3 gap-1" type="checkbox" id="complete" 
       onChange={handleStatusChange}
    
     />
    <h3 className="text-xl text-slate-100">
      {task.title}</h3>
    </div>
      
    <div className="items-center gap-3 hidden group-hover:block">
      <button
      onClick={togglePreviewForm}
       >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
        className="w-5 h-5 text-slate-200 hover:text-slate-300 hover:font-bold
                   ">
          <path strokeLinecap="round"
          strokeLinejoin="round" 
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      </button>

  
      <button
        onClick= {() => deleteTask(task.id) } 
       
       type="button">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
         className="w-5 h-5 text-red-500 hover:text-red-300 
               ">
          <path strokeLinecap="round" 
          strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>  
      </button>
    
    </div>
  </section>

  
  <section>

  {(!task.description || task.description.trim() === '') && (
  <p className="text-sm text-slate-300">
    Your description will appear here once you add it
  </p>
)}


  <p className="text-sm text-slate-300">
    {task.description || 'No description added'}
  </p>


    <section className="mt-4">
      <span className="text-slate-200 text-sm">
       { getDate(task.date)}
      </span>
      <span className="mx-2 text-white">·</span>
     
      <span
        className={` text-slate-100 text-sm px-2 py-1 rounded-full ${
          taskStatus === 'Completed' ? 'bg-green-700' : 'bg-amber-600'
        }`}
        id="task"
      >
        {taskStatus}
        </span>
    </section>
  </section>


    </section>

  </main>
  <section className="mt-5">
    <Link to="/">
      <button className="flex items-center gap-1 text-slate-300 hover:text-amber-600
      hover:bg-slate-200 rounded-full  p-1">
     
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
        </svg>
        <span className="text-sm font-medium 
           ">
          View all Tasks
        </span>
      </button>
    </Link>
  </section>
 { isPreviewFormHidden ? 
 <EditPreviewTask
 setEditTitle = {setEditTitle}
  editTitle = {editTitle}
  setTaskDescription = {setTaskDescription} 
  taskDescription = {taskDescription}
   handlePreviewEdit = {handlePreviewEdit}
   togglePreviewForm = {togglePreviewForm}
   formError = {formError}
 /> : null}
  
   
    
     
    </section>
   
  );
};

export default TaskPreview;

