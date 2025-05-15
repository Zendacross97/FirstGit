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
    axios.get('http://localhost:3000/expense/getExpense', { headers: { 'Authorization': token } })
    .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
            showExpense(res.data[i]);
        }
    })
    .catch((err) => {
        const p = document.querySelector('.expense_message');
        p.innerHTML = err.response.data.error ? err.response.data.error : 'An error occured';
    })
});

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