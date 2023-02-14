import { Container, Row } from "react-bootstrap";
import { primaryColor } from "../config";

export default function Contact() {
	var infos = `Pour tout courriel envoyé, une réponse vous sera adressée dans les 24-48h les jours ouvrés.`;

	return (
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
						className="tusk text-center mt-2 mb-0 me-1 ms-1"
						style={{ color: primaryColor, fontSize: 40 }}
					>
						CONTACT
					</h1>
				</div>
			</Row>

			<Row sx={styles.contact}>
				<div
					style={{
						textAlign: "center",
						padding: "5%",
						color: primaryColor,
						//backgroundColor: "rgba(255,255,255,0.85)",
						borderRadius: "5px",
					}}
				>
					<p>{infos}</p>
				</div>
			</Row>
		</Container>
	);
}

const styles = {
	container: {
		flex: 1,
		display: 'block',

	},
	content: {
		display: "flex",
		justifyContent: "center",
	},
	contact: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "50%",
	},
};
