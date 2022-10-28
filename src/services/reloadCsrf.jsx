import axios from "axios";



export const reloadCsrf=async()=>{
        await axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
        /**
         * console log para mostrar la respuesta
         */
          //console.log("response userAction Login:")
        //console.log(response);
        console.log("ReloadCsrf .. Get csrf Reponse")
        console.log(response);
        //return response.data;
    })
}