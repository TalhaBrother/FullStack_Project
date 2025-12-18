import { create } from 'zustand'
import axios from 'axios';
import Cookie from 'js-cookie';

const useUser=create((set)=>({
    user:[],
    addUser:(newUser)=>{set((state)=>{
        const previousUsers=state.user;
        const updatedUsers=[...previousUsers,newUser]; 
        return {user:updatedUsers}
    })},
    updatedUsers:(newUsers)=>{set({user:newUsers})}
}))
(async()=>{
    
const token=Cookie.get("token");
    try {
        if(token){
            const response=await axios.get("http://localhost:3000/user/user",{
                headers:{Authorization:`Bearer ${token}`}
            })
            console.log("UserResponse:",response);
            useUser.setState({user:response.data});
        }
    } catch (error) {
        console.error("User fetch error:",error);
    }
}
)();
export default useUser