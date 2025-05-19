const { Cashfree, CFEnvironment } = require('cashfree-pg');

const cashfree = new Cashfree(CFEnvironment.SANDBOX, process.env.CASHFREE_APP_ID, process.env.CASHFREE_SECRET_KEY);

exports.createOrder = async (
    orderId,
    orderAmount = 1.00,
    orderCurrency = 'INR',
    customerId = `user_${orderId}`,
    customerPhone = "8474090589"
) => {
    try {
        const expiryDate = new Date(Date.now() + 60 * 60 * 1000);// 1 hour from now
        const formattedExpiryDate = expiryDate.toISOString();
        const request = {
            order_amount: orderAmount,
            order_currency: orderCurrency,
            order_id: `${orderId}_${Date.now()}`,// Unique order ID
            customer_details: {
                customer_id: customerId,
                customer_phone: customerPhone
            },
            order_meta: {
                return_url: `http://localhost:3000/payment-status/${orderId}`,
                payment_methods: "cc,dc,upi,nb"
            },
            order_expiry_time: formattedExpiryDate
        }
        const response = await cashfree.PGCreateOrder(request);
        return response.data;
    } catch (error) {
        console.log(error)
        console.error('Error creating order:', error.response.data.message);
    }
};

exports.getPaymentStatus = async (order_Id) => {
    try {
        const response = await cashfree.PGOrderFetchPayments(order_Id);
        let getOrderResponse = response.data;
        let orderStatus;
        if (getOrderResponse.filter((transaction) => transaction.payment_status === "SUCCESS").length > 0) {
            orderStatus = "SUCCESS";
        }
        else if (getOrderResponse.filter((transaction) => transaction.payment_status === "PENDING").length > 0) {
            orderStatus = "PENDING";
        }
        else {
            orderStatus = "FAILED";
        }
        return orderStatus;
    } catch (error) {
        console.error('Error:', error.response.data.message);
    }
};