import { React, useState, useEffect } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@mui/material";
import { dateFormat } from "../helpers/dateFormat";
import { priceFormat } from "../helpers/priceFormat";

export default function Orders() {
	const [orders, setOrders] = useState([]);
	useEffect(() => {
		async function loadArticles() {
			const rawResponse = await fetch(
				"http://localhost:3000/orders/load-orders"
			);
			var response = await rawResponse.json();
			setOrders(response.orders);
		}
		loadArticles();
	}, []);

	const ordersList = orders.map(function (item, i) {
		let date = new Date(item.orderDate);
		date = dateFormat(date);
		return (
			<TableRow
				key={i}
				sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
			>
				<TableCell component="th" scope="row">
					{i}
				</TableCell>
				<TableCell align="right">{item.user}</TableCell>
				<TableCell align="right">{date}</TableCell>
				<TableCell align="right">{priceFormat(item.amount)}</TableCell>
				{/* <TableCell align="right">{row.protein}</TableCell> */}
			</TableRow>
		);
	});

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Order ID</TableCell>
						<TableCell align="right">Client</TableCell>
						<TableCell align="right">Date de la commande</TableCell>
						<TableCell align="right">Montant</TableCell>
						<TableCell align="right">Statut</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>{ordersList}</TableBody>
			</Table>
		</TableContainer>
	);
}
