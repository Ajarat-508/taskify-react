import React from "react";

const EditPreviewTask = (props) => {
  const {
    setEditTitle,
    editTitle,
    setTaskDescription,
    taskDescription,
    handlePreviewEdit,
    togglePreviewForm,
    formError,
  } = props;
  return (
    <section className="flex items-center w-[100%]" id="preview_form">
      <form
        className="flex flex-col items-center gap-2 
        rounded-lg w-[80%] mx-auto "
        onSubmit={handlePreviewEdit}
      >
        <button onClick={togglePreviewForm} type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-lg text-slate-200"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <input
          className="border p-2 rounded-md my-2 w-full"
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

        <button
          className="p-1 bg-amber-600 rounded-lg mb-4 text-white"
          type="submit"
        >
          Update
        </button>

        {formError?.isError && (
          <span className="text-sm text-red-400">{formError.errorMessage}</span>
        )}
      </form>
    </section>
  );
};

export default EditPreviewTask;
