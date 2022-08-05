import { useContext, useRef } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const changePasswordRef = useRef();
  const authCtx = useContext(AuthContext);
  console.log(authCtx);
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredPassword = changePasswordRef.current.value;

    fetch(
      `${"https://identitytoolkit.googleapis.com/v1/accounts:update?key="}${
        process.env.REACT_APP_FIREBASE_API
      }`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      //assumptinon : Always Succeeds!
      console.log(res);
    });
  };
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          minLength="6"
          id="new-password"
          ref={changePasswordRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
