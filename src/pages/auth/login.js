import { app } from "@/utils/firebase";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
const auth = getAuth(app);
const login = () => {
  const router = useRouter()
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const login_user = () => {
    signInWithEmailAndPassword(auth, loginUser.email, loginUser.password)
      .then((userCredential) => {
        if (userCredential) {
          console.log(userCredential);
          JSON.stringify(
            localStorage.setItem("accessToken", userCredential.user.accessToken)
          );
          localStorage.setItem(
            "userProfileData",
            JSON.stringify(userCredential.user.providerData[0])
          );
          localStorage.setItem(
            "metadata",
            JSON.stringify(userCredential.user.metadata)
          );
          localStorage.setItem("UUID", JSON.stringify(userCredential.user.uid));
          localStorage.setItem(
            "stsTokenManager",
            JSON.stringify(userCredential.user.stsTokenManager)
          );

          router.push("/dashboard")
          
        }
       
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.message);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const googleLogin = ()=>{
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
  .then((userCredential) => {
    console.log(userCredential);
    // This gives you a Google Access Token. You can use it to access the Google API.
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    if (userCredential) {
      console.log(userCredential);
      JSON.stringify(
        localStorage.setItem("accessToken", userCredential.user.accessToken)
      );
      JSON.stringify(
        localStorage.setItem("operationType", userCredential.operationType)
      );
      JSON.stringify(
        localStorage.setItem("providerId", userCredential.providerId)
      );
      localStorage.setItem(
        "userProfileData",
        JSON.stringify(userCredential.user.providerData[0])
      );
      localStorage.setItem(
        "metadata",
        JSON.stringify(userCredential.user.metadata)
      );
      localStorage.setItem("UUID", JSON.stringify(userCredential.user.uid));
      localStorage.setItem(
        "stsTokenManager",
        JSON.stringify(userCredential.user.stsTokenManager)
      );

      // router.push("/dashboard")
    }
  }).catch((error) => {
    console.log(error);
  });
  }
  const gitHubLogin = ()=>{
    const provider = new GithubAuthProvider();

    signInWithPopup(auth, provider)
  .then((userCredential) => {
    console.log(userCredential);
    // This gives you a Google Access Token. You can use it to access the Google API.
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    if (userCredential) {
      console.log(userCredential);
      JSON.stringify(
        localStorage.setItem("accessToken", userCredential.user.accessToken)
      );
      JSON.stringify(
        localStorage.setItem("operationType", userCredential.operationType)
      );
      JSON.stringify(
        localStorage.setItem("providerId", userCredential.providerId)
      );
      localStorage.setItem(
        "userProfileData",
        JSON.stringify(userCredential.user.providerData[0])
      );
      localStorage.setItem(
        "metadata",
        JSON.stringify(userCredential.user.metadata)
      );
      localStorage.setItem("UUID", JSON.stringify(userCredential.user.uid));
      localStorage.setItem(
        "stsTokenManager",
        JSON.stringify(userCredential.user.stsTokenManager)
      );

      // router.push("/dashboard")
    }
  }).catch((error) => {
    console.log(error);
  });
  }
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
      <form>
        <h3>Login Here</h3>

        <label for="username">Email</label>
        <input
          type="text"
          placeholder="Email"
          id="username"
          value={loginUser.email}
          onChange={(e) =>
            setLoginUser({ ...loginUser, email: e.target.value })
          }
        />

        <label for="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={loginUser.password}
          onChange={(e) =>
            setLoginUser({ ...loginUser, password: e.target.value })
          }
        />

        <button type="button" onClick={login_user}>
          Log In
        </button>
        <div class="social">
          {/* <div class="go"><i class="fab fa-google"></i>  Google</div> */}
          <button type="button" class="login-with-google-btn" onClick={googleLogin}>
            Sign in with Google
          </button>
        </div>
        <div class="social">
          {/* <div class="go"><i class="fab fa-google"></i>  Google</div> */}
          <button type="button" class="login-with-github-btn" onClick={gitHubLogin}>
            Sign in with Github
          </button>
        </div>
        <div class="fbs">
          <i class="fab fa-facebook"></i> Dont have an account ?{" "}
          <Link href={"/auth/register"}>Sign up here</Link>
        </div>
        <div class="fbs">
          <i class="fab fa-facebook"></i> Login via ?{" "}
          <Link href={"/auth/phone"}>Phone</Link>
        </div>
      </form>
    </div>
  );
};

export default login;
