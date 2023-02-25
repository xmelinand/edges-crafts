import {React, useState} from "react";
import { ternaryColor } from "../config";
import { Typography, Box, Tabs, Tab } from "@mui/material";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import UserLogin from "./UserLogin";
import UserSignUp from "./UserSignUp";

function UserConnection(props) {

	//! Popover tabs states and functions
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<Box>
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="Sign-in/Sign-up tabs"
					TabIndicatorProps={{ style: { background: ternaryColor } }}
				>
					<Tab label="SE CONNECTER" {...a11yProps(0)} />
					<Tab label="CRÉER UN COMPTE" {...a11yProps(1)} />
				</Tabs>
			</Box>
			<TabPanel value={value} index={0}>
				<UserLogin/>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<UserSignUp/>
			</TabPanel>
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

export default connect(null, mapDispatchToProps)(UserConnection);

//*TABS SETUP*----------------------------------------------------------------
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
