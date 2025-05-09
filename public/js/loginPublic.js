function signUp(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const loginDetails = { name, email, password };
    axios.post('http://localhost:3000/user/signup', loginDetails) // Updated endpoint
    .then((res) => {
        console.log(res.data);
    })
    .catch((err) => {
        console.log(err);
    });
    event.target.name.value = '';
    event.target.email.value = '';
    event.target.password.value = '';
}