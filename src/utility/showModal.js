import Swal from 'sweetalert2'
export const showConfirmModal = ( {
    title,
    text,
    icon,
    confirmButtonText,
    showCancelButton = false,
    cancelButtonText,
    cb, // callback
} ) => {
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonText,
        showCancelButton,
        cancelButtonText,
    }).then((res) => {
        if (res.isConfirmed) {
            if (cb){
                cb();
            }
            
        }
    });
}


