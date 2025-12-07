import React from 'react';
import * as yup from 'yup'
import Cookie from "js-cookie"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login=()=>{
  let navigate=useNavigate()
const loginSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().min(6).matches(new RegExp('^[a-zA-Z0-9]{6,30}$')).required()
});
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange"
  });
  let loginFormSubmit=async(data)=>{
    try {
        let response=await axios.post("http://localhost:3000/user/login",data)
        console.log(response.data)
        Cookie.set("token",response.data.token)
        navigate("/")
    } catch (error) {
        console.error("LoginFormSubmitError!",error.message)
    }
  }
    return (
      <div>
        <div>Login Page</div>
        <form onSubmit={handleSubmit(loginFormSubmit)}>
          <div>
            <input placeholder='username' {...register("username")} />
            {errors.username && <span>{errors.username.message}</span>}
          </div>

          <div>
            <input type='password' placeholder='password' {...register("password")} />
            {errors.password && <span>{errors.password.message}</span>}
          </div>

          <button type='submit'>Login</button>
        </form>
      </div>
    )
}
export default Login;