import Swal from "sweetalert2";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "#e2522e",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

 

export const fireAlert2 = (title: string, message: string, icon: any, url: any, props: any) => { 
   
  swalWithBootstrapButtons.fire({
    title: title  ,
    html: message,
    icon:icon,
    showCancelButton: false, 
    cancelButtonText: "OK",
     confirmButtonText: "Okay"
  }).then(function () { 
    // Redirect the user
    	localStorage.removeItem('mwanga'); 
      window.location.replace(url);     
    }); 
};
 
