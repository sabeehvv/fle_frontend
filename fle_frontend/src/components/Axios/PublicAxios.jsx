import axios from "axios";

const baseURL = "https://shoppershope.online/api/"


const publicInstance = axios.create({
    baseURL:baseURL,
   
  });

  export default publicInstance