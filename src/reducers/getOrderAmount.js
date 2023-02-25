export default function (orderAmount = {}, action) {
	if (action.type === "getOrderAmount") {
        const newOrderAmount = (Number.parseFloat(action.orderAmount).toFixed(2)/100);;
		console.log('reducer works ?', newOrderAmount);
			return newOrderAmount;
	} else {
		return orderAmount;
	}
}
