import React from "react";
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
const SuccessBox = ({ message }) => {
	return (
		<div className="success_box d-flex align-items-center">
			<VerifiedRoundedIcon style={{marginRight:2}}/>
			<p style={{width:'100%', textAlign:'center', margin:0}}>{message}</p>
		</div>
	);
};

export { SuccessBox };
