const handleOnSubmit = (e) => {
    e.preventDefault();
    const product = e.target.productName.value;
    const obj = {product};
    axios.post('http://localhost:3000/products',obj)
        .then(res => {//{"addedProduct":"cvbnm,"}
            console.log(res.data.addedProduct)//cvbnm,
        })
}