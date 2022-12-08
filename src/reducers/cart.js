export default function (cart = [], action) {
	if (action.type === "addItem") {
		//* 1
		//*if the cart is empty, adds clickedItem to the cart.
		if (cart.length === 0) {
			var updatedCart = [...cart, action.addItem];

			return updatedCart
		} else {
			//* 2
			//* if cart is not empty, checks if the clickedItem is already in the cart with clickedItem id
			const searchDouble = cart.findIndex(
				(el) => el._id === action.addItem._id
			);
			if (searchDouble === -1) {
				// adds clickedItem if id not found
				updatedCart = [...cart, action.addItem];
				return updatedCart;

			} else {
				//* 3
				//* otherwise shows error message
				alert("already added to cart");
				return cart

			}
		}
		} else if (action.type === "removeItem") {
		 	console.log("removed?");
			updatedCart = cart.filter(el => el !== action.removeItem);
			return updatedCart
	} else {
		return cart;
	}
}
