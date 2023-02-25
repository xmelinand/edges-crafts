import React from "react";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";

const AlertBox = ({ message }) => {
	return (
		<div className="error_box d-flex align-items-center">
			<ReportProblemOutlinedIcon style={{marginRight:3}}/>
			<p style={{width:'100%', textAlign:'center', margin:0}}>{message}</p>
		</div>
	);
};

export { AlertBox };
