import * as React from "react";
import { primaryColor, ternaryColor } from "../config";
import PropTypes from "prop-types";

import { useState } from "react";
import {
	Typography,
	TextField,
	Box,
	Tabs,
	Tab,
	Button,
} from "@mui/material";

export default function UserButtonContent () {

    	//! Froms states and functions
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [loginEmail, setLoginEmail] = useState("");
	const [email, setEmail] = useState("");
	const [emailConfirm, setEmailConfirm] = useState("");
	const [password, setPassword] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");

	const handleFirstName = (event) => {
		setFirstName(event.target.value);
	};
	const handleLastName = (event) => {
		setLastName(event.target.value);
	};
	const handleLoginEmail = (event) => {
		setLoginEmail(event.target.value);
	};
	const handleEmail = (event) => {
		setEmail(event.target.value);
	};
	const handleEmailConfirm = (event) => {
		setEmailConfirm(event.target.value);
	};
	const handlePassword = (event) => {
		setPassword(event.target.value);
	};
	const handleLoginPassword = (event) => {
		setLoginPassword(event.target.value);
	};
	const handlePasswordConfirm = (event) => {
		setPasswordConfirm(event.target.value);
	};

    	//! Popover tabs states and functions
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

    const handleCreateUser = async () => {
        var rawResponse = await fetch(
			`http://192.168.0.28:3000/users/create-user`,
			{
				mode: 'no-cors',
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: `firstName=${firstName}&lastName=${lastName}&email=${email}&password=${password}`,
			}
		);
		let response = await rawResponse.json();
		console.log(response);
    }
    return (
        <Box>
					<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
						<Tabs
							value={value}
							onChange={handleChange}
							aria-label="basic tabs example"
                            TabIndicatorProps={{style: {background:ternaryColor}}}
						>
							<Tab label="SE CONNECTER" {...a11yProps(0)} />
							<Tab label="CRÉER UN COMPTE" {...a11yProps(1)} />
						</Tabs>
					</Box>
					<TabPanel value={value} index={0}>
                    <Box sx={styles.forms}>
							<TextField
                                size="small"
								sx={styles.inputs}
								id="outlined-basic"
								label="email"
								variant="outlined"
								value={loginEmail}
								onChange={handleLoginEmail}
							/>
							<TextField
                                size="small"
								sx={styles.inputs}
								id="outlined-basic"
								label="Mot de Passe"
								variant="outlined"
								value={loginPassword}
                                type="password"
								onChange={handleLoginPassword}
							/>
							<Button
								fullWidth
								variant="contained"
								sx={styles.button}
								onClick={() => console.log("coucou")}
							>
								SE CONNECTER
							</Button>
						</Box>
					</TabPanel>
					<TabPanel value={value} index={1}>
					<Box sx={styles.forms}>
							<TextField
                                size="small"
                                fullWidth
								sx={styles.inputs}
								id="outlined-basic"
								label="Prénom(s)"
								variant="outlined"
								value={firstName}
								onChange={handleFirstName}
							/>
							<TextField
								sx={styles.inputs}
								id="outlined-basic"
                                size="small"
                                fullWidth
								label="Nom"
								variant="outlined"
								value={lastName}
								onChange={handleLastName}
							/>
							<TextField
								sx={styles.inputs}
                                size="small"
								id="outlined-basic"
								label="email"
								variant="outlined"
								value={email}
                                fullWidth
								onChange={handleEmail}
							/>
							<TextField
								sx={styles.inputs}
								id="outlined-basic"
                                size="small"
                                fullWidth
								label="Confirmer email"
								variant="outlined"
								value={emailConfirm}
								onChange={handleEmailConfirm}
							/>
							<TextField
								sx={styles.inputs}
								id="outlined-basic"
								label="Mot de passe"
                                size="small"
                                fullWidth
								variant="outlined"
								value={password}
                                type="password"
								onChange={handlePassword}
							/>
							<TextField
								sx={styles.inputs}
								label="Confirmer mot de passe"
								variant="outlined"
                                size="small"
                                fullWidth
                                type="password"
								value={passwordConfirm}
								onChange={handlePasswordConfirm}
							/>
							<Button
								fullWidth
								variant="contained"
								sx={styles.button}
								onClick={handleCreateUser}
							>
								CRÉER UN COMPTE
							</Button>
						</Box>
					</TabPanel>
				</Box>
    )
}

var styles = {
	forms: {
		display: "flex",
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
        "& > :not(style)": { m:0.65}
	},
    button: {
        mt: 1.3,
        backgroundColor: primaryColor,
        color: '#fff',
        '&:hover': {
          backgroundColor: ternaryColor,
          color: '#fff',
      },
}
}

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}
