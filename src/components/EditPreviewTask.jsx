import React from 'react'


const EditPreviewTask = (props) => {
    const {setEditTitle, editTitle, setTaskDescription, taskDescription, handlePreviewEdit, togglePreviewForm, formError } = props;
  return (
    <section className="flex items-center w-[100%]"id='preview_form'>
    <form className="flex flex-col items-center gap-2 
        rounded-lg w-[80%] mx-auto "
         onSubmit={handlePreviewEdit}
         >
        <button onClick={togglePreviewForm} type='button'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
          strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-lg text-slate-200">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>

      </button>
     <input className="border p-2 rounded-md my-2 w-full"
         id="title_edit"
        type="text"
         value={editTitle}
         onChange={(e) => setEditTitle(e.target.value)}
       />
      <textarea
      className="border p-2 rounded-md w-full h-full"
         id="todo_description"
         value={taskDescription}
         onChange={(e) => setTaskDescription(e.target.value)}
       ></textarea>
      

        
        <button className="p-1 bg-amber-600 rounded-lg mb-4 text-white" 
        type="submit">Update</button>
       
       {formError?.isError && (<span className="text-sm text-red-400">{formError.errorMessage}
    </span>)}

            </form>

    </section>
  // <section class="flex items-center w-[100%]"  id="preview_form">
  //       <form className="flex flex-col items-center gap-2 
  //       rounded-lg w-[80%] mx-auto">
        // <button onClick="previewEditForm(event)">
        //       <svg
        //         xmlns="http://www.w3.org/2000/svg"
        //         fill="none"
        //         viewBox="0 0 24 24"

        //         stroke-width="1.5"
        //         stroke="currentColor"
        //         className="w-6 h-6 p-2"
        //       >
        //         <path
        //           stroke-linecap="round"
        //           stroke-linejoin="round"
        //           d="M6 18L18 6M6 6l12 12"
        //         />
        //       </svg>
        //     </button>
  //           <input
  //             value={editTitle}
  //             onChange={(e) => setEditTitle(e.target.value)}
  //             name="title_edit"
  //             id="title_edit"
  //             placeholder="Edit Task Title"
  //             className="border p-2 rounded-md my-2 w-full"
  //           />
  //           <textarea
  //             id="todo_description"
  //             value={taskDescription}
  //             // type="text"
  //             // name="description"
  //             placeholder="Write description here"
              
  //             rows="4"
  //             className="border p-2 rounded-md w-full h-full"
  //             onChange={(e) => setTaskDescription(e.target.value)}
  //           ></textarea>
  //           <button className="p-1 bg-amber-600 rounded-lg mb-4 text-white" 
  //           type='submit'
          
  //           onClick={handlePreviewEdit}
           
  //           // onClick="handlePreviewEdit(event)"
  //           >
  //             Update
  //           </button>
  //         </form>
  //   </section>
   
  )

   
}




export default EditPreviewTask