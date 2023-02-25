import { Container, Row } from "react-bootstrap";
import { primaryColor } from "../config";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Box, IconButton } from "@mui/material";
import { EmailRounded } from "@mui/icons-material";

export default function Contact() {
	var infos = `Pour tout courriel envoyé, une réponse vous sera adressée dans les 24-48h les jours ouvrés.`;

	return (
		<div  className="contact_container">
		<Container style={styles.container}>
			<Row style={{ borderBottom: `solid 1px ${primaryColor}` }}>
				<div
					className="d-flex flex-row justify-content-space-between align-items-center p-0"
					xs="1"
					sm="2"
					lg="3"
					xl="4"
				>
					<h1
					className="Pangram mt-2 mb-2 me-1"
					style={{ color: primaryColor, fontSize: 20 }}
					>
						CONTACT
					</h1>
				</div>
			</Row>

			<Row sx={styles.contact}>
				<div
					style={styles.content}
				>
					<p>{infos}</p>
					<Box sx={styles.iconsBox}>
						<Box>
						<IconButton href="mailto:edgescrafts.pro@gmail.com" target='blank' sx={styles.buttons}>
							<EmailRounded fontSize="large" />
						</IconButton>
						<a className='App-link' target='blank' href="mailto:edgescrafts.pro@gmail.com">
							edgescrafts.pro@gmail.com
						</a>
						</Box>
						<Box>
						<IconButton href="https://www.instagram.com/edge.s.crafts/" target='blank' sx={styles.buttons}>
							<InstagramIcon fontSize="large" />
						</IconButton>
						<a className='App-link' target='blank' href="https://www.instagram.com/edge.s.crafts/">
						@edge.s.crafts
						</a>
						</Box>
					</Box>
				</div>
			</Row>
		</Container>
		</div>
	);
}

const styles = {
	container: {
		flex: 1,
		display: "block",
	},
	content: {
		textAlign: "center",
		padding: "5%",
		color: primaryColor,
		backgroundColor: "rgba(255,255,255,0.85)",
		borderRadius: "5px",
		width:"100%",
		height:"100%",
		marginTop:'10px',
	},
	contact: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "50%",
	},
	buttons: {
		
		color: primaryColor,
		borderColor: primaryColor,
		marginRight: 'auto',
		"&:hover": { transition:"0.2s", backgroundColor: primaryColor, color: "#fff" },
	},
	iconsBox: {
		mt: 6,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		"& > :not(style)": { m: 0.5 },
	},
};
