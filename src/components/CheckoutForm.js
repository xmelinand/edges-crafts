import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

import {
	PaymentElement,
	useStripe,
	useElements,
	AddressElement,
} from "@stripe/react-stripe-js";
import { connect } from "react-redux";
import CheckoutRecap from "./CheckoutRecap";

function CheckoutForm(props) {
	const stripe = useStripe();
	const elements = useElements();

	const [email, setEmail] = useState("");
	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get(
			"payment_intent_client_secret"
		);
		console.log(clientSecret);

		if (!clientSecret) {
			return;
		}

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			switch (paymentIntent.status) {
				case "succeeded":
					setMessage("Paiement effectué avec succès!");
					break;
				case "processing":
					setMessage("Le paiement est en cours.");
					break;
				case "requires_payment_method":
					setMessage("Le paiement à échoué, veuillez réesayer.");
					break;
				default:
					setMessage("Une erreur est survenue.");
					break;
			}
		});
	}, [stripe]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		setIsLoading(true);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				// Make sure to change this to your payment completion page
				return_url: "http://localhost:3001/shop",
				receipt_email: email,
			},
		});

		// This point will only be reached if there is an immediate error when
		// confirming the payment. Otherwise, your customer will be redirected to
		// your `return_url`. For some payment methods like iDEAL, your customer will
		// be redirected to an intermediate site first to authorize the payment, then
		// redirected to the `return_url`.
		if (error.type === "card_error" || error.type === "validation_error") {
			setMessage(error.message);
		} else {
			setMessage(
				"Une erreur est survenue lors du paiement. Verifiez les informations de la carte. Votre enseigne bancaire à peut-être refusé le paiement."
			);
		}

		setIsLoading(false);
	};

	const paymentElementOptions = {
		layout: "tabs",
	};

	return (
		<form
			className="stripe"
			style={{ marginLeft: 0 }}
			id="payment-form"
			onSubmit={handleSubmit}
		>
			<Row className="App" xs="1" sm="2" lg="3">
				<Col>
					<h5 style={{ color: "gray" }}>1. Récapitulatif de la commande.</h5>
					<CheckoutRecap />
				</Col>
				<Col>
					<h5 style={{ color: "gray" }}>2. Adresse de livraison</h5>
					<AddressElement
						onChange={(event) => {
							if (event.complete) {
								// Extract potentially complete address
								const address = event.value.address;
								console.log("cunt", address);
							}
						}}
						options={{
							fields: {
								name: 'always',
								line1: 'always',
								city: 'always',
								state: 'always',
								country: 'always',
								postal_code: 'always',
							},
							validation: {
								name: {
									required: "always",
								},
								line1: {
									required: "always",
								},
								city: {
									required: "always",
								},
								state: {
									required: "always",
								},
								country: {
									required: "always",
								},
								postal_code: {
									required: "always",
								},
							},
							mode: "shipping",
							allowedCountries: ["US", "CA"],
						}}
					/>
				</Col>
				<Col>
					<h5 style={{ color: "gray" }}>3. Moyens de paiment</h5>
					<label for="courriel">Adresse courriel</label>
					<input
						id="courriel"
						className="inputs"
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Adresse courriel"
					/>
					<PaymentElement
						id="payment-element"
						options={paymentElementOptions}
					/>

					<button
						className="stripe_button"
						disabled={isLoading || !stripe || !elements}
						id="submit"
					>
						<span id="button-text">
							{isLoading ? (
								<div className="spinner" id="spinner"></div>
							) : (
								`Payer ${props.orderAmount}$`
							)}
						</span>
					</button>
					{/* Show any error or success messages */}
					{message && <div id="payment-message">{message}</div>}
				</Col>
			</Row>
		</form>
	);
}

function mapStateToProps(state) {
	return { orderAmount: state.orderAmount };
}

export default connect(mapStateToProps, null)(CheckoutForm);
