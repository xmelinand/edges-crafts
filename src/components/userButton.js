import * as React from 'react';
import {useState} from "react";
import { primaryColor } from "../config";
import { FaUser } from "react-icons/fa";
import {
	IconButton,
	Popover,
} from "@mui/material";
import UserButtonContent from "./userButtonContent";

function UserPopover() {
	//! Popover states and functions
	const buttonRef = React.useRef();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [hoverUser, setHoverUser] = useState(false);

	let colorUser = hoverUser ? primaryColor : "white";
	let colorIconUser = !hoverUser ? primaryColor : "white";
	const handleClick = (event) => {
		setAnchorEl(true);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	return (
		<div>
			<IconButton
				ref={buttonRef}
				style={{
					backgroundColor: `${colorUser}`,
					border: `1px solid ${colorUser}`,
					marginRight: 8,
				}}
				onMouseOver={() => {
					setHoverUser(true);
				}}
				onMouseOut={() => {
					setHoverUser(false);
				}}
				onClick={() => {
					handleClick();
					console.log("userDropDown");
				}}
			>
				<FaUser color={colorIconUser} size={16} />
			</IconButton>
			<Popover
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
				id={id}
				open={open}
				anchorEl={() => buttonRef.current}
				onClose={handleClose}
			>
				{/* //!FORMS */}

				<UserButtonContent/>
			</Popover>
		</div>
	);
}

export default UserPopover;