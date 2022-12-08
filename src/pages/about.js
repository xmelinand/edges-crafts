import { Grid, Typography } from "@mui/material";
import {
	darkColor,
	secondaryColor,
	ternaryColor,
} from "../config";

export function About() {
	return (
		< Grid container>
		<Grid container sx={styles.content}>
			<Grid
				item
				xs={12}
				md={6}
				sx={styles.bgTop}
			>
				<Typography sx={{ fontFamily:'Noe',fontSize: "2.7rem", lineHeight: "3.3rem" }}>
					<span style={styles.highlight}>Edge's Crafts</span> c'est moi! Je suis une créatrice
					d'objets de décoration intérieure spécialisée dans le macramé
					<span style={styles.highlight}>.</span>
				</Typography>
				{/* <Box>
					<img style={{ width:"13rem", borderRadius:'50%'}} alt='portrait de la fondatrice' src='../../celia.jpg'/>
				</Box> */}
			</Grid>
			<Grid
				item
				xs={12}
				md={6}
				sx={{
					color: secondaryColor,
					padding: "8%",
				}}
			>
				<Typography sx={{ fontSize: "1.3rem" }}>
					Des modèles élégants et en exemplaire unique, fabriqués à la main avec des produits
					de qualité alliant la chaleur du bois et la douceur de la corde,
					parfois ornés de différents charmes et parures florales.
					<br />
					<br />
					L'univers bohême me fascine et j'aime à imprégner mes créations de ses vibrations et de sa spiritualité.
				</Typography>
			</Grid>
		</Grid>
		<Grid container sx={[styles.content, {backgroundColor:"lightgrey", zIndex:-1}]}>
				<Grid
					item
					xs={12}
					md={6}
					sx={{
						color: darkColor,
						padding: "8%",
					}}
				>
					<Typography sx={{ fontSize: "1.3rem" }}>
						Si un modèle vous plaît mais qu'il n'est malheureusement plus en vente, je pourrais en faire une reproduction sur demande, dépendant de mes ressources.
						<br />
						<br />
						Pour passer commande, je vous invite à prendre contact avec moi par email.
					</Typography>
				</Grid>
			<Grid
				item
				xs={12}
				md={6}
				sx={{
					color: darkColor,
					fontWeight: "bold",
					borderRadius: "5px",
					textAlign: "center",
					padding: "8%",
				}}
			>
				<Typography sx={{ fontFamily:'Noe',fontSize: "2.7rem", lineHeight: "3.3rem" }}>
					<span style={styles.highlight}>Délai de traitement</span>: 
				</Typography>
				<Typography>
					<span style={{fontFamily:'Noe',fontSize: "10rem", }}>0</span>jours.
				</Typography>
				{/* <Box>
					<img style={{ width:"13rem", borderRadius:'50%'}} alt='portrait de la fondatrice' src='../../celia.jpg'/>
				</Box> */}
			</Grid>
		</Grid>
		</Grid>
	);
}

const styles = {
	content: {
		display: "flex",
		justifyContent: "center",
		backgroundColor: darkColor,
		minheight:"100vh"
	},
	highlight: {
		fontFamily: "Noe",
		color: ternaryColor,
	},
	bgTop:{
		color: secondaryColor,
		fontWeight: "bold",
		borderRadius: "5px",
		padding: "8%",
		backgroundImage: "url(../../stone.svg)",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		backgroundSize: "60%",
		paddingBottom:20,
		marginBottom: -20,
		overflow: "visible",
	}
};
