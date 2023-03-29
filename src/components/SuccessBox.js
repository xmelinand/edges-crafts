import React from "react";
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
const SuccessBox = ({ message, action }) => {
	return (
		<div className="success_box d-flex align-items-center">
			<VerifiedRoundedIcon style={{marginRight:8}}/>
			<p style={{width:'100%', textAlign:'center', marginBottom:0}}>{message}</p>
			<CancelRoundedIcon style={{marginLeft:8, opacity:0.7}} onClick={action}/>

		</div>
	);
};

export { SuccessBox };
