import { React, useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import AddItems from "./addItems";
import DeleteItems from "./deleteItems";
import Orders from "./Orders";

export default function BackOffice() {
	const [value, setValue] = useState(0);

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
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="warning"
					aria-label="basic tabs example"
				>
					<Tab label="Ajouter un article" {...a11yProps(0)} />
					<Tab label="Supprimer un article" {...a11yProps(1)} />
					<Tab label="Modifier un article" disabled {...a11yProps(2)} />
					<Tab label="Commandes" {...a11yProps(3)} />
				</Tabs>
			</Box>
			<TabPanel value={value} index={0}>
				<AddItems />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<DeleteItems />
			</TabPanel>
			<TabPanel value={value} index={2}>
				Item Three
			</TabPanel>
			<TabPanel value={value} index={3}>
				<Orders />
			</TabPanel>
		</Box>
	);
}
