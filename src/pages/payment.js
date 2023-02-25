import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "../Stripe.css";
import { Button1 } from "../components/anm-btn";
import { Link } from "react-router-dom";

import CheckoutForm from "../components/CheckoutForm";

import { connect } from "react-redux";
import { darkColor } from "../config";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
	"pk_test_51LvlTKGYA9pH077i5yL7nWfbSeAOE5BO0Mxs19hmS3yB3QF7XHzcjDDEovBXyQYuWVPVOJamq7p9gucuDy5h9X8t00zLK83HRQ"
);

function Payment(props) {
	const [clientSecret, setClientSecret] = useState("");

	useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		fetch("/create-payment-intent", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ items: props.cart }),
		})
			.then((res) => res.json())
			.then((data) => {
				setClientSecret(data.clientSecret);
				if (data.amount) {
					props.getOrderAmount(data.amount);
				}
			});
	}, [props, props.cart]);

	const appearance = {
		theme: "stripe",
		variables: {
			colorPrimary: darkColor,
		},
	};
	const options = {
		clientSecret,
		appearance,
	};

	return (
		<Container style={{ flex: 1, padding: "0px 0px 50px 0px " }}>
			{props.cart.length > 0 ? (
				clientSecret && (
					<Elements options={options} stripe={stripePromise}>
						<CheckoutForm />
					</Elements>
				)
			) : (
				<Row>
          <Col style={{paddingTop:"50px"}}>
					<h5 style={{ color: "gray" }}>1. Récapitulatif de la commande.</h5>
					<h1>{Number.parseFloat(0).toFixed(2)} $CA</h1>
					<p style={{ color: "red", margin: 0 }}>
						<strong>Aucun article dans le panier</strong>
					</p>
					<div style={{ marginTop: 13 }}>
						<Link to="/shop" style={{ textDecoration: "none" }}>
							<Button1 name="Retour à la boutique" />
						</Link>
					</div>
          </Col>
				</Row>
			)}
		</Container>
	);
}

function mapStateToProps(state) {
	console.log("mapState", state.cart);
	return { cart: state.cart };
}

function mapDispatchToProps(dispatch) {
	return {
		getOrderAmount: function (number) {
			dispatch({ type: "getOrderAmount", orderAmount: number });
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
