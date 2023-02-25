import { Box } from '@mui/material';
import {React, useState} from 'react';
import { connect } from 'react-redux';
import { AlertBox } from './AlertBox';


function UserSignUp(props) {
    const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [emailConfirm, setEmailConfirm] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [signupErrorMessage, setSignupErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);


	const handleCreateUser = async (e) => {
		e.preventDefault();
        setIsLoading(true);
		if (emailConfirm !== email) {
			setSignupErrorMessage("L'adresse email est différente");
		}
		if (passwordConfirm !== password) {
			setSignupErrorMessage("Les mot de passe ne correspondent pas.");
		}

		if (email === emailConfirm && password === passwordConfirm) {
			var rawResponse = await fetch("/users/create-user", {
				mode: "no-cors",
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: `firstName=${firstName}&lastName=${lastName}&email=${email}&password=${password}`,
			});
			let response = await rawResponse.json();
			console.log("response", response);
			if (response.userToken){
			props.addUserToken(response.userToken);
            setSignupErrorMessage(null);
			} else {
				setSignupErrorMessage(response.error);
			}
		}
        setIsLoading(false);
	};
  return (
    <Box>
					<form
						id="Sign-up-form"
						style={styles.forms}
						onSubmit={handleCreateUser}
					>
						<input
							className="inputs"
							type="text"
							onChange={(e) => setFirstName(e.target.value)}
							placeholder="Prénom"
							value={firstName}
							required
						/>
						<input
							className="inputs"
							type="text"
							onChange={(e) => setLastName(e.target.value)}
							placeholder="Nom"
							value={lastName}
							required
						/>
						<input
							className="inputs"
							type="email"
							onChange={(e) => setEmail(e.target.value)}
							placeholder="E-mail"
							value={email}
							required
						/>
						<input
							className="inputs"
							type="email"
							onChange={(e) => setEmailConfirm(e.target.value)}
							placeholder="Confirmer e-mail"
							value={emailConfirm}
							required
						/>
						<input
							className="inputs"
							type="password"
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Mot de passe"
							value={password}
							required
						/>
						<input
							className="inputs"
							type="password"
							onChange={(e) => setPasswordConfirm(e.target.value)}
							placeholder="Confirmer mot de passe"
							value={passwordConfirm}
						/>
						{signupErrorMessage ? <AlertBox message={signupErrorMessage} /> : ""}
						{/* <input
							type="submit"
							className="sign-in_button"
							value="CREER UN COMPTE"
						></input> */}
                        <button className="stripe_button" disabled={isLoading} id="submit">
						<span id="button-text">
							{isLoading ? (
								<div className="spinner" id="spinner"></div>
							) : (
								`CRÉER UN COMPTE`
							)}
						</span>
					</button>
					</form>
				</Box>
  )
}

function mapDispatchToProps(dispatch) {
	return {
		addUserToken: function (token) {
			dispatch({ type: "addUserToken", userToken: token });
		},
	};
}

export default connect(null, mapDispatchToProps)(UserSignUp);

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