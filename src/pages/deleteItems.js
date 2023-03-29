import { Container, Row, Col, Card } from "react-bootstrap";
import { Button1, Button2 } from "../components/anm-btn";
import { primaryColor } from "../config";
import { GiSewingString, GiCandleHolder, GiCrystalBars } from "react-icons/gi";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { SuccessBox } from "../components/SuccessBox";

function Shop(props) {
	const [articles, setArticles] = useState([]);
	const [filters, setFilters] = useState([]);
	const [deleteMessage, setDeleteMessage] = useState('');
	const [deletion, setDeletion] = useState(0);

	//get all articles from DB at loading, then reload articles after each deletion
	useEffect(() => {
		async function loadArticles() {
			const rawResponse = await fetch(
				"http://localhost:3000/articles/load-articles"
			);
			var response = await rawResponse.json();
			setArticles(response.articles);
		}
		loadArticles();
	}, [deleteMessage]);

	// Whenever a category is clicked, sends filters to backend to get only filtered articles from DB.
	// Backend route sends all articles if no filters is selected.
	useEffect(() => {
		if (filters) {
			console.log("usf", filters);
			async function filterArticles() {
				var rawResponse = await fetch(
					"http://localhost:3000/articles/filter-articles",
					{
						method: "POST",
						headers: { "Content-Type": "application/x-www-form-urlencoded" },
						body: `filters=${filters}`,
					}
				);
				let response = await rawResponse.json();
				setArticles(response.articles);
			}
			filterArticles();
		}
	}, [filters]);

	// add filter if not already in filters useState, deletes it if clicked again.
	function handleFilters(filterName) {
		if (filters.includes(filterName)) {
			setFilters(filters.filter((e) => e !== filterName));
		} else {
			setFilters([...filters, filterName]);
		}
	}

    /* Deletes selected article from DB then triggers Success notification
        by updating deletion state and message. */
	const handleDelete = async (item) => {
		console.table(item);
		const rawResponse = await fetch(
			`http://localhost:3000/articles/delete-item`,
			{
				method: "DELETE",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: `itemId=${item._id}`,
			}
		);
		const response = await rawResponse.json();
        if(response.success === true){
        setDeleteMessage(response.message)
        setDeletion(deletion+1)
		console.log('oui?',response.message);
        }
	};

	/* Generate a list of cards for all the articles found in the dataBase, 
	list of articles in the state can be updated w/ filters wich change items displayed.
	Reverse the list to display the newest article first.
	*/
	const items = articles
		.slice(0)
		.reverse()
		.map(function (item, i) {
			var name = "Supprimer";

			return (
				<Col key={i} className="cards">
					<Card
						className="shadow"
						style={{
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
								{item.category.map(function (cat, i) {
									return i > 0 ? `- ${cat} ` : `${cat} `;
								})}
							</Card.Subtitle>
							<Card.Text>{item.description}</Card.Text>
							<div className="d-flex align-items-center justify-content-between">
								<Button1
									name={name}
									action={() => {
										handleDelete(item);
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
			<Row>
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
						ARTICLES
					</h1>
					{/* CATEGORY FILTERS */}
					<Button2
						icon={<GiSewingString size="12px" />}
						name="MURALES"
						action={() => handleFilters("Murale")}
					></Button2>
					<Button2
						icon={<BsFillMoonStarsFill size="10px" />}
						name="SUSPENSIONS"
						action={() => handleFilters("Suspension")}
					></Button2>
					<Button2
						icon={<GiCandleHolder size="12px" />}
						name="FLEURS SÉCHÉES"
						action={() => handleFilters("Fleurs séchées")}
					></Button2>
					<Button2
						icon={<GiCrystalBars size="12px" />}
						name="ACCESSOIRES"
						action={() => handleFilters("Accessoires")}
					></Button2>
				</div>
			</Row>
            {/* visual confirmation of article deletion based on deleteMessage existance */}
            <Row>
                {deleteMessage ? <SuccessBox message={deleteMessage} action={()=> setDeleteMessage('')}/> : ''}
            </Row>
			<Row style={{ display: "flex" }} xs="1" sm="2" lg="3" xl="4">
				{items}
			</Row>
		</Container>
	);
}

export default Shop;
