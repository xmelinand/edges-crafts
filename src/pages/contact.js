import { Container, Row, Col} from 'react-bootstrap';
import { primaryColor } from "../config";

export default function Contact() {
	var bio = 
	`Ici prendront place les informations de contact`

	return (
		<Container >
		<Row style={styles.content}>
			<Col xs="10" >
			<div style={{textAlign:'center', padding:'5%', color:primaryColor, fontWeight:'bold', backgroundColor:'rgba(255,255,255,0.85)', borderRadius:'5px'}}>
			<p>{bio}</p>
			</div>
			</Col>
		</Row>
		</Container>
	);
}

const styles = {
	content:{
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	}
};
