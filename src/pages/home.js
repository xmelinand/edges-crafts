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
		<Container className='bg' style={{flex:1}}>
			<Row style={{ borderBottom: `solid 1px white` }}>
				<h1
					className="tusk mt-2 mb-0 me-1"
					style={{ color: 'white', fontSize: 40 }}
				>
					HOME
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
