import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";

export function Home() {
	useEffect(() => {
		async function check() {
			const rawResponse = await fetch("/check");
			var response = await rawResponse.json();
			console.log("connection", response);
		}
		check();
	}, []);

	return (<div className="bg">
		<Container style={{flex:1}}>
			<Row style={{ borderBottom: `solid 1px white` }}>
				<h1
					className="Pangram mt-2 mb-2 p-0"
					style={{ color: 'white', fontSize: 20 }}
				>
					DERNIÈRES CRÉATIONS  
				</h1>
			</Row>
			<Row
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
				xs="1"
				sm="2"
				lg="3"
				xl="4"
			></Row>
		</Container>
		</div>
	);
}
