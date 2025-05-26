const token = localStorage.getItem('token');

function add(event){
    event.preventDefault();
    const amount = event.target.amount.value;
    const description = event.target.description.value;
    const category = event.target.category.value;
    let expenseDetails = { amount, description, category };
    axios.post('http://localhost:3000/expense/addExpense', expenseDetails, { headers: { 'Authorization': token } })
    .then((res) => {
        const p = document.querySelector('.expense_message');
        p.innerHTML = res.data.message;
        showExpense(res.data.expense)
    })
    .catch((err) => {
        const p = document.querySelector('.expense_message');
        p.innerHTML = err.response.data.error ? err.response.data.error : 'An error occured';
    })
    event.target.amount.value = '';
    event.target.description.value = '';
    event.target.category.value = '';
}

window.addEventListener("DOMContentLoaded", () => {
    checkMembership();
    getExpense(page = 1);
});

function checkMembership(){
    axios.get('http://localhost:3000/expense/payment_status', { headers: { 'Authorization': token } })
    .then((res) => {
        const header = document.querySelector('.header');
        const h = header.querySelector('#premium');
        if (res.data.orderStatus === 'SUCCESS') {
            h.innerHTML = 'You are a premium user <button id="premiumBtn">Show leaderboard</button> <button id="reportBtn">Show Report</button>';
            const premiumBtn = header.querySelector('#premiumBtn');
            premiumBtn.onclick = () => {
                axios.get('http://localhost:3000/expense/leaderboard', { headers: { 'Authorization': token } })
                .then((res) => {
                    showLeaderboard(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })
            }
            const reportBtn = header.querySelector('#reportBtn');
            reportBtn.onclick = () => {
                window.location.href = `../views/expenseReport.html`;
            }
        }
    })
}

function getExpense(page) {
    const ul = document.querySelector(`ul`);
    ul.innerHTML = ''; // Clear previous expenses
    axios.get(`http://localhost:3000/expense/getExpense?page=${page}`, { headers: { 'Authorization': token } })
    .then((res) => {
        for (let i = 0; i < res.data.expense.length; i++) {
            showExpense(res.data.expense[i]);
        }
        showPageination(res.data);
    })
    .catch((err) => {
        const p = document.querySelector('.expense_message');
        p.innerHTML = err.response.data.error ? err.response.data.error : err.message;
    })
}

function showExpense(data){
    const ul=document.querySelector(`ul`);
    const li=document.createElement(`li`);
    li.id = `li_${data.id}`;
    li.innerHTML = `${data.amount} - ${data.description} - ${data.category} <button id="delete_${data.id}">Delete Expense</button>`;
    ul.appendChild(li);
    const Delete = li.querySelector(`#delete_${data.id}`);
    Delete.onclick = () => {
        deleteExpense(data.id);
    }
}

function showPageination({ lastPage, currentPage, nextPage, previousPage }) {
    const pagination = document.createElement('div');
    pagination.className = 'pagination';
    document.body.appendChild(pagination);
    if (previousPage) {
        const previousBtn = document.createElement('button');
        previousBtn.innerHTML = `${previousPage}`;
        previousBtn.onclick = () => {
            pagination.innerHTML = ''; // Clear previous pagination
            getExpense(previousPage);
        }
        pagination.appendChild(previousBtn);
    }
    const currentBtn = document.createElement('button');
    currentBtn.innerHTML = `${currentPage}`;
    currentBtn.onclick = () => {
        pagination.innerHTML = ''; // Clear previous pagination
        getExpense(currentPage);
    }
    pagination.appendChild(currentBtn);
    if (nextPage) {
        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = `${nextPage}`;
        nextBtn.onclick = () => {
            pagination.innerHTML = ''; // Clear previous pagination
            getExpense(nextPage);
        }
        pagination.appendChild(nextBtn);
    }
    if (lastPage !== currentPage && lastPage !== nextPage) {
        const lastBtn = document.createElement('button');
        lastBtn.innerHTML = `${lastPage}`;
        lastBtn.onclick = () => {
            pagination.innerHTML = ''; // Clear previous pagination
            getExpense(lastPage);
        }
        pagination.appendChild(lastBtn);
    }
}

function deleteExpense(expenseId){
    axios.delete(`http://localhost:3000/expense/deleteExpense/${expenseId}`, { headers: { 'Authorization': token } })
    .then(res => {
        const p = document.querySelector('.expense_message');
        const ul = document.querySelector(`ul`);
        const li = ul.querySelector(`#li_${expenseId}`);
        p.innerHTML = res.data.message;
        const Delete = li.querySelector(`#delete_${expenseId}`);
        ul.removeChild(Delete.parentElement);
    })
    .catch(err => {
        const p = document.querySelector('.expense_message');
        p.innerHTML = err.response.data.error ? err.response.data.error : 'An error occured';
    });
}

function showLeaderboard(data){
    // Remove old leaderboard header if it exists
    const oldHeader = document.querySelector('#leaderboard');
    if (oldHeader) document.body.removeChild(oldHeader);

    // Remove old leaderboard list if it exists
    const oldList = document.querySelector('.leaderboard');
    if (oldList) document.body.removeChild(oldList);

    const h = document.createElement('h2');
    h.id = 'leaderboard';
    h.innerHTML = 'Leaderboard:';
    const ul = document.createElement('ul');
    ul.className = 'leaderboard';
    for (let i = 0; i < data.length; i++) {
        const li = document.createElement('li');
        li.innerHTML = `Name: ${data[i].name} - Total Expense: ${data[i].totalExpense}`;
        ul.appendChild(li);
    }
    document.body.appendChild(h);
    document.body.appendChild(ul);
}
