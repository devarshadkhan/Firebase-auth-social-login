// import { app } from "@/utils/firebase";
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber   } from "firebase/auth";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import React, { useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// const auth = getAuth(app);

// // const phoneNumberUser = getPhoneNumberFromUserInput();
// // const appVerifier = window.recaptchaVerifier;
// const phoneNumber = () => {
//     const [number,setNumber] = useState()
//     const sendVerificationCode = (phoneNumber) => {
//         signInWithPhoneNumber(auth, phoneNumber)
//           .then((confirmationResult) => {
//             console.log(confirmationResult);
//             // The SMS verification code has been sent successfully.
//             // Store the confirmation result to later confirm the code.
//             // You may also handle SMS code confirmation here.
//           })
//           .catch((error) => {
//             // Handle errors, e.g., invalid phone number
//             console.error(error);
//           });
//       };
 
//   return (
//     <div>
//       <Toaster position="top-center" reverseOrder={false} />
//       <div class="background">
//         <div class="shape"></div>
//         <div class="shape"></div>
//       </div>
//       <form>
//         <h3>Login Here</h3>

//         <label for="username">Phone Number</label>
//         <input
//           type="number"
//           placeholder="Enter your phone no..."
//           id="username"
//           value={number}
//           onChange={(e) =>
//             setNumber(e.target.value )
//           }
//         />


//         <button type="button" onClick={sendVerificationCode}>
//           Continue
//         </button>
//         <div class="social">
//           {/* <div class="go"><i class="fab fa-google"></i>  Google</div> */}
//           {/* <button type="button" class="login-with-google-btn">
//             Sign in with Google
//           </button> */}
//         </div>
//         {/* <div class="fbs">
//           <i class="fab fa-facebook"></i> Dont have an account ?{" "}
//           <Link href={"/auth/register"}>Sign up here</Link>
//         </div>
//         <div class="fbs">
//           <i class="fab fa-facebook"></i> Login via ?{" "}
//           <Link href={"/auth/register"}>Phone</Link>
//         </div> */}
//       </form>
//     </div>
//   );
// };

// export default phoneNumber;


import { app } from "@/utils/firebase";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Link from "next/link";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { isValidPhoneNumber } from "libphonenumber-js"; // Import a library for phone number validation
import { useRouter } from "next/router";
import PhoneInput from "react-phone-input-2";
import OtpInput from 'react-otp-input';

// import "react-phone-input-2/lib/style.css";
const auth = getAuth(app);

const PhoneNumber = () => {
  const [number, setNumber] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const router = useRouter();
  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier( auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log(response);
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    // setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + number;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        console.log(confirmationResult);
        window.confirmationResult = confirmationResult;
        // setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
        // setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div id="recaptcha-container"></div>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form>
        <h3>Login Here</h3>

        {/* <label htmlFor="username">Phone Number</label> */}
        {/* <input
          type="tel"
          placeholder="Enter your phone no..."
          id="username"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        /> */}
        
        <PhoneInput country={"in"} value={number} onChange={setNumber} />

        <OtpInput
      value={showOTP}
      onChange={setShowOTP}
      numInputs={4}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} style={{width:"40px"}} />}
    />


        <button type="button" onClick={onSignup}>
          Continue
        </button>

        {/* Add the reCAPTCHA container above the button */}
        {/* <div id="recaptcha-container"></div> */}

        <div className="social">
          {/* Add social login buttons or links if needed */}
        </div>

        <div className="fbs">
          {/* Add registration and other links */}
        </div>
      </form>
    </div>
  );
};

export default PhoneNumber;
