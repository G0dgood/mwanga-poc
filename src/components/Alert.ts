import Swal from "sweetalert2";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-primary",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

export const fireAlert = (title: string, message: string, icon: any, url: any, props: any) => {
 

  swalWithBootstrapButtons.fire({
    title: title,
    html: message,
    icon: icon,
    showCancelButton: false,
    cancelButtonText: "OK",
    confirmButtonText: "Okay"
  }).then(function () {
    // Use history.push() to navigate to the specified URL
    // history.push(url);
  });
};

 

 
