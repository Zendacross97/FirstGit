function signUp(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const signUpDetails = { name, email, password };
    axios.post('http://localhost:3000/user/signup', signUpDetails)
    .then((res) => {
        const p = document.querySelector('.signup-message');
        p.innerHTML = res.data.message;
    })
    .catch((err) => {
        const p = document.querySelector('.signup-message');
        p.innerHTML = err.response.data.error ? err.response.data.error : 'An error occurred';
        console.log(err.message);
    });
    event.target.name.value = '';
    event.target.email.value = '';
    event.target.password.value = '';
}

function logIn(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const loginDetails = { email, password };
    axios.post('http://localhost:3000/user/login', loginDetails)
    .then((res) => {
        if (res.data.message) {
            alert(res.data.message);
            localStorage.setItem('token', res.data.token);
            window.location.href = '../views/expense_view.html';
        }
    })
    .catch((err) => {
        const p = document.querySelector('.login-message');
        p.innerHTML = err.response.data.error ? err.response.data.error : 'An error occurred';
        console.log(err.message);
    });
    event.target.email.value = '';
    event.target.password.value = '';
}