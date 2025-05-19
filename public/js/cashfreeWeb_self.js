const cashfree = Cashfree({
    mode: "sandbox"
});

document.getElementById("renderBtn").addEventListener("click", () => {
    axios.post('http://localhost:3000/pay')
    .then((res) => {
        let checkoutOptions = {
            paymentSessionId: res.data.paymentSessionId,
            redirectTarget: "_self" //default
        };
        cashfree.checkout(checkoutOptions)
    })
    .catch((err) => {
        console.log(err.message);
    })
});