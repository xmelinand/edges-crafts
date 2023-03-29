import React from "react";
import { connect } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import {
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	ListItemAvatar,
	Avatar,
} from "@mui/material";
import { priceFormat } from "../helpers/priceFormat";

function CheckoutRecap(props) {
	var total = 0;
	var itemsList;

	if (props.cart.length > 0) {
		props.cart.forEach((el) => (total += el.price));

		itemsList = props.cart.map(function (item, i) {
			return (
				<ListItem key={i} disablePadding sx={{ borderRadius: 25 }}>
					<ListItemButton>
						<ListItemAvatar>
							<Avatar alt="Aperçu de l'article" src={item.pic} />
						</ListItemAvatar>
						<ListItemText id={i} primary={item.name} />
						<ListItemText id={i}> {priceFormat(item.price)}</ListItemText>

						<DeleteIcon
							edge="end"
							onClick={() => {
								props.removeItem(item);
							}}
						/>
					</ListItemButton>
				</ListItem>
			);
		});
	}
	return (
		<div className="stripe">
			<h1>{priceFormat(props.orderAmount)}</h1>
			<List dense sx={styles.list}>
				{itemsList}
			</List>
		</div>
	);
}

function mapStateToProps(state) {
	return { cart: state.cart, orderAmount: state.orderAmount };
}

function mapDispatchToProps(dispatch) {
	return {
		removeItem: function (item) {
			dispatch({ type: "removeItem", removeItem: item });
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutRecap);

const styles = {
	subtitle: {
		color: "grey",
	},
	highlight: {
		fontSize: 24,
	},
	list: {
		width: "100%",
		maxWidth: 500,
		bgcolor: "background.paper",
		borderRadius: 2,
		border: "1px solid rgba(50, 50, 93, 0.1)",
		boxSizing: " border-box",
	},
};
