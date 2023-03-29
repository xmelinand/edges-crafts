import React from "react";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

const AlertBox = ({ message, action }) => {
	return (
		<div className="error_box d-flex align-items-center justify-content-between">
			<ReportProblemOutlinedIcon style={{marginRight:8}}/>
			<p style={{width:'100%', textAlign:'center', marginBottom:0}}>{message}</p>
			<CancelRoundedIcon style={{marginLeft:8, opacity:0.7}} onClick={action}/>
		</div>
	);
};

export { AlertBox };
