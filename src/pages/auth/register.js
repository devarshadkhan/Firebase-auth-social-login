import Link from "next/link";
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "@/utils/firebase";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/router";



const auth = getAuth(app);
const register = () => {
const router = useRouter()
   const [user,setUser] = useState({
    name:"",
    email:"",
    password:""
   }) 

   /**
 * @param {Register User With Firebase} 
 */
 const register_user = ()=>{
    createUserWithEmailAndPassword(auth, user.email, user.password)
    .then((userCredential) => {
        if(userCredential){
            console.log(userCredential);
            toast.success('Successfully Register!')
            router.push("/auth/login")
        }
      // Signed in
    //   const user = userCredential.user;
      // ...
    })
    .catch((error) => {
        console.log(error);
        toast.error(error?.message)
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
 }
  return (
    <div>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
      <form >
        <h3>Register Here</h3>

        {/* <label for="username">Username</label>
        <input type="text" placeholder="Username" id="username" value={user.name} onChange={(e)=> setUser({...user, name:e.target.value})} /> */}
        <label for="username">Email</label>
        <input type="email" placeholder="Email" id="username" value={user.email} onChange={(e)=> setUser({...user, email:e.target.value})} />

        <label for="password">Password</label>
        <input type="password" placeholder="Password" id="password" value={user.password} onChange={(e)=> setUser({...user, password:e.target.value})} />

        <button type="button" onClick={register_user}>Register</button>
        <div class="social">
          {/* <div class="go"><i class="fab fa-google"></i>  Google</div> */}
          {/* <button type="button" class="login-with-google-btn" >
  Sign in with Google
</button> */}
        </div>
        <div class="fbs">
          <i class="fab fa-facebook"></i> Already have an account ?{" "}
          <Link href={"/auth/login"}>Login here</Link>
        </div>
      </form>
    </div>
  );
};

export default register;
