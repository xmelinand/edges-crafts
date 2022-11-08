import { React, useState } from "react";
import { Button } from "@mui/material";
import { primaryColor, ternaryColor } from "../config";

const Button1 = ({ name, action }) => {
	const [hover, setHover] = useState("");

	let styles = {
		btn: {
			marginRight: "10px",
			fontFamily: "Fjalla One",
			border: "solid 1px #967469",
			padding: "10px",
			backgroundColor: !hover ? "transparent" : primaryColor,
			transition: ".3s",
			borderRadius: 0,
			color: !hover ? primaryColor : "white",
		},
	};

	return (
		<Button
			style={styles.btn}
			onMouseEnter={() => {
				setHover(true);
			}}
			onMouseOut={() => {
				setHover(false);
			}}
			onClick={action}
		>
			{name}
		</Button>
	);
};

const Button2 = ({ name, action, icon }) => {
	const [hover, setHover] = useState("");
	const [clicked, setClicked] = useState(false);

	let styles = {
		btn: {
			display: "flex",
			justifyContent: "center",
			height: "80%",
			width: "100%",
			margin: 2,
			padding: 0,
			fontFamily: "Fjalla One",
			fontSize:"0.7rem",
			letterSpacing: 0,
			lineHeight: "14px",
			backgroundColor: !hover ? "transparent" : ternaryColor,
			opacity: !hover ? 1 : 0.5,
			transition: ".3s",
			border: "none",
			color: !hover ? ternaryColor : "white",
		},
		activeBtn: {
			height: "80%",
			width: "100%",
			fontSize:"0.7rem",
			margin: 2,
			padding: 0,
			fontFamily: "Fjalla One",
			letterSpacing: 0,
			lineHeight: "14px",
			backgroundColor: primaryColor,
			opacity: 0.5,
			border: "none",
			color: "white",
		},
	};

	return (
		<Button
			style={!clicked ? styles.btn : styles.activeBtn}
			onMouseEnter={() => {
				setHover(true);
			}}
			onMouseOut={() => {
				setHover(false);
			}}
			onClick={() => {
				setClicked(!clicked);
			}}
			toggle={true}
			startIcon={icon}
		>
			<>{name}</>
		</Button>
	);
};

export { Button1, Button2 };
