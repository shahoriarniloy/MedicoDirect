import axios from 'axios';
const axiosPublic = axios.create({
    baseURL:'https://medico-direct-server.vercel.app'
})
const UseAxiosPublic = () => {
   
        return axiosPublic;
    
};

export default UseAxiosPublic;