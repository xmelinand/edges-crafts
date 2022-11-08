import { Container, Row, Col} from 'react-bootstrap';
import { primaryColor } from "../config";

export function About() {
	var bio = 
	`Célia, jeune maman de deux enfants est une passionnée de décoration murale.
	 Elle a tout d'abord longtemps travailler en tant que que coiffeuse-visagiste et styliste. C'est après avoir travailler quelques années dans un bar qu'elle a tout arrêté pour vivre sa première grossesse pleinement. Puis un autre bébé arrive et sa jolie famille devient un doux cocon qui lui donne l'envie d'épanouir son esprit créatif. Son mari l'incite au macramé et la magie opère instantanément !
	Depuis, c'est de la belle ville de Montréal que Célia vous confectionne ses œuvres prêtes à partir.
	
	Le désir de vouloir être réellement originale l'a amené à se démarquer avec l'univers Witch qui l'a toujours inspiré. C'est dans un univers décalé et parfois un peu sombre tout en étant mystique et féérique que Célia tisse de créations uniques.
	Elle apprécie tout particulièrement les fleurs séchées ainsi que les pierres semi-précieuses qu'elle intègre à ses créations afin d'y ajouter une touche de magie.
	Les cordes utilisées par Célia viennent principalement de France via La Corderie Mansas ou du Royaume-Uni où elle commande des cordes 100% coton recyclé. Pour ses colis, elle utilise des cartons recyclés dans une démarche écologique.
	
	Les commandes se font à partir de créations uniques disponibles sur sa boutique en ligne. N'hésitez pas à suivre son actualité sur les réseaux sociaux afin de ne rien rater des nouveautés.
	
	Vous trouverez sur sa boutique en ligne des suspensions murales et des marques pages en macramé ainsi que des décorations en fleurs séchées.`

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
