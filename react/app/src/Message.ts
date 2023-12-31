import { toast } from "react-toastify";
export namespace Message {
    export const success = (text: string) => {
       toast.success(text, {
         position: "bottom-center",
         autoClose: 2000,
         hideProgressBar: true,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: false,
       });
   }
    export const failure = (text: string) => {
         toast.error(text, {
           position: "bottom-center",
           autoClose: 2000,
           hideProgressBar: true,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: false,
         });

    }

}

