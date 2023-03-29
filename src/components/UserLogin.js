import { React, useState } from "react";
import { Box } from "@mui/material";
import { AlertBox } from "./AlertBox";
import { connect } from "react-redux";
import { SuccessBox } from "./SuccessBox";

function UserLogin(props) {
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSignIn = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		var rawResponse = await fetch(`/users/sign-in`, {
			mode: "no-cors",
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: `email=${loginEmail}&password=${loginPassword}`,
		});
		let response = await rawResponse.json();
		setIsLoading(false);

		console.log("response", response);
		if (response.logged === true) {
            setSuccess(true);
            setSuccessMessage("Connexion réussie!");
            setErrorMessage("");
            setError(false)
			props.addUserToken(response.userToken);
		} else if (!response.logged) {
            setError(true);
			setErrorMessage(response.error);
			setSuccessMessage("");
            setSuccess(false);
		}
	};

	return (
		<Box>
			<form id="Sign-in-form" style={styles.forms} onSubmit={handleSignIn}>
				<input
					className="inputs"
					type="email"
                    autoComplete="true"
					onChange={(e) => setLoginEmail(e.target.value)}
					placeholder="E-mail"
					value={loginEmail}
					required
				/>
				<input
					className="inputs"
					type="password"
					onChange={(e) => setLoginPassword(e.target.value)}
					placeholder="Mot de passe"
					value={loginPassword}
					required
				/>
				{errorMessage ? <AlertBox message={errorMessage} action={()=> setErrorMessage('')}/> : ""}
				{successMessage ? <SuccessBox message={successMessage} action={()=> setSuccessMessage('')}/> : ""}
				{/* <input type="submit" className="sign-in_button"> */}
					<button className="stripe_button" disabled={isLoading} id="submit">
						<span id="button-text">
							{isLoading ? (
								<div className="spinner" id="spinner"></div>
							) : (
								`SE CONNECTER`
							)}
						</span>
					</button>
				{/* </input> */}
			</form>
		</Box>
	);
}

function mapDispatchToProps(dispatch) {
	return {
		addUserToken: function (token) {
			dispatch({ type: "addUserToken", userToken: token });
		},
	};
}

export default connect(null, mapDispatchToProps)(UserLogin);

const styles = {
	forms: {
		display: "flex",
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		margin: 0.65,
	},
};
