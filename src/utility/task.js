export const sortTasksByDate = (tasks_ls_name) => {
    return tasks_ls_name.sort((a, b) =>
     b.date - a.date);
}


 