import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'


const baseURL = 'http://127.0.0.1:8000/'

const useAxios = (authTokens, setAuthTokens, setUser, logoutUser) => {

    const axiosInstance = axios.create({
        baseURL,
        headers:{
            'Authorization': `Bearer ${authTokens?.access_token}`,
        }
    });


    axiosInstance.interceptors.request.use(
        async (req) => {
            const user = jwt_decode(authTokens.access_token);
            const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    
            if (!isExpired) return req;
    
            try {
                const response = await axios.post(`${baseURL}account/token/refresh/`, {
                    refresh_token: authTokens.refresh_token
                });
    
                localStorage.setItem('authTokens', JSON.stringify(response.data));
                setAuthTokens(response.data);
                setUser(jwt_decode(response.data.access_token));
    
                req.headers.Authorization = `Bearer ${response.data.access_token}`;
                return req;
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("cancellation error");
                } else {
                    console.log(error.response.data.detail);
                    logoutUser();
                }
                return Promise.reject(error);
            }
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    
    return axiosInstance
}

export default useAxios;




// const useAxios = (authTokens, setAuthTokens, setUser, logoutUser) => {

//     const axiosInstance = axios.create({
//         baseURL,
//         headers:{
//             'Authorization': `Bearer ${authTokens?.access_token}`,
//         }
//     });


//     axiosInstance.interceptors.request.use(
//         (req)=> {
//             const user = jwt_decode(authTokens.access_token)
//             const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
        
//             if(!isExpired) return req
        
//             axios.post(`${baseURL}account/token/refresh/`, {
//                 refresh_token: authTokens.refresh_token
//             }).then((response)=>{
                
//                 localStorage.setItem('authTokens', JSON.stringify(response.data))
//                 setAuthTokens(response.data)
//                 setUser(jwt_decode(response.data.access_token))
                
//                 req.headers.Authorization = `Bearer ${response.data.access_token}`
//                 return req
//             }).catch(error => {
//                 console.log(error.response.data.detail);
//                 logoutUser()
//             });
//         }, 
//         (error)=> {
//             return Promise.reject(error);
//         })


        
    
//     return axiosInstance
// }

// export default useAxios;