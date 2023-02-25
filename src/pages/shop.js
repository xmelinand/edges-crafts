import { Container, Row, Col, Card } from "react-bootstrap";
import { Button1, Button2 } from "../components/anm-btn";
import { primaryColor } from "../config";
import { GiSewingString, GiCandleHolder, GiCrystalBars } from "react-icons/gi";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

function Shop(props) {
	const [articles, setArticles] = useState([]);

	//get all articles from DB at loading
	useEffect(() => {
		async function loadArticles() {
			const rawResponse = await fetch(
				"http://localhost:3000/articles/load-articles"
			);
			var response = await rawResponse.json();
			setArticles(response.articles);
		}
		loadArticles();
	}, []);
	
	function addToCart(clickedItem) {
		props.addItem(clickedItem);
	}


	/* Generate a list of cards for all the articles found in the dataBase
	Reverse the list to display the newest article first.
	*/
	const items = articles
		.slice(0)
		.reverse()
		.map(function (item, i) {
			// sold articles will show hollow
			var opacity = item.sold ? 0.5 : 1;
			// disable addToCart button if sold 
			var buttonToggle = item.sold ? true : false;
			var name;

			if (item.sold === true){
				name = 'Vendu'
			} else {
				name = "Ajouter au panier"
			}

			return (
				<Col key={i} className="cards">
					<Card
						className="shadow"
						style={{
							opacity: opacity,
							margin: "10px",
							borderRadius: 0,
							border: "1px solid #967469",
							padding: 0,
						}}
					>
						<Card.Img
							variant="top"
							style={{ padding: "2%", objectFit: "cover" }}
							alt="Sample"
							height={270}
							src={item.pic}
						/>
						<Card.Body>
							<Card.Title tag="h5">{item.name}</Card.Title>
							<Card.Subtitle className="mb-2 text-muted" tag="h6">
								{item.type}
							</Card.Subtitle>
							<Card.Text>{item.description}</Card.Text>
							<div className="d-flex align-items-center justify-content-between">
								<Button1
									disable={buttonToggle}
									name={name}
									action={() => {
										addToCart(item);
									}}
								/>
								<div>
									{" "}
									<strong>{item.price}$</strong>{" "}
								</div>
							</div>
						</Card.Body>
					</Card>
				</Col>
			);
		});
	return (
		<Container style={{ flex: 1 }}>
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
						SHOP
					</h1>
					<Button2
						icon={<GiSewingString size="12px" />}
						name="MURALES"
						// action={() => {
						// 	console.log("twat");
						// }}
					></Button2>
					<Button2
						icon={<BsFillMoonStarsFill size="10px" />}
						name="SUSPENSIONS"
						// action={console.log("ass")}
					></Button2>
					<Button2
						icon={<GiCandleHolder size="12px" />}
						name="FLEURS SÉCHÉES"
						// action={() => {
						// 	console.log("fuck");
						// }}
					></Button2>
					<Button2
						icon={<GiCrystalBars size="12px" />}
						name="ACCESSOIRES"
						// action={() => {
						// 	console.log("tits");
						// }}
					></Button2>
				</div>
			</Row>
			<Row style={{ display: "flex" }} xs="1" sm="2" lg="3" xl="4">
				{items}
			</Row>
		</Container>
	);
}

function mapStateToProps(state) {
	return { cart: state.cart };
}

function mapDispatchToProps(dispatch) {
	return {
		addItem: function (item) {
			dispatch({ type: "addItem", addItem: item });
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop);