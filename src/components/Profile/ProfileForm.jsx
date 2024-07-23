import { useContext, useRef } from "react";
import classes from "./ProfileForm.module.css";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

const ProfileForm = () => {
	const newPasswordInputRef = useRef();
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();

	const submitHandler = (event) => {
		event.preventDefault();
		const enterNewPassword = newPasswordInputRef.current.value;

		fetch(
			"https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDRlYEqzcIvwe9SfM2F0-_2BMux1kqacNY",
			{
				method: "POST",
				body: JSON.stringify({
					idToken: authCtx.token,
					password: enterNewPassword,
					returnSecureToken: false,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			}
		).then((res) => {
			if (res.ok) {
				// Handle success
				alert("Password updated successfully!");
				navigate("/");
			} else {
				// Handle errors, such as invalid token
				res.json().then((data) => {
					let errorMessage = "Password update failed!";
					if (data && data.error && data.error.message) {
						errorMessage = data.error.message;
					}
					alert(errorMessage);
				});
			}
		});
	};
	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<div className={classes.control}>
				<label htmlFor="new-password">New Password</label>
				<input
					type="password"
					id="new-password"
					minLength="7"
					ref={newPasswordInputRef}
				/>
			</div>
			<div className={classes.action}>
				<button>Change Password</button>
			</div>
		</form>
	);
};

export default ProfileForm;
