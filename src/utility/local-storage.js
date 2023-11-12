// Local Storage
export const getLocalStorage = (name) =>{
    if (!name) {
        throw new Error("Local Storage name not found"); 
    }
    return JSON.parse(localStorage.getItem(name)) || [];
    };

export const setLocalStorage = (name, new_todo_LS) =>{
        if (!(name)) {
            throw new Error("Local Storage name not found...");
        }
        if (!(new_todo_LS)) {
            throw new Error("new Data not found...");
        }
 localStorage.setItem(name, JSON.stringify(new_todo_LS));
    }
