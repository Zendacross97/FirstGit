function add(event){
    event.preventDefault();
    const amount = event.target.amount.value;
    const description = event.target.description.value;
    const category = event.target.category.value;
    let expenseDetails = { amount, description, category };
    axios.post('http://localhost:3000/expense/addExpense', expenseDetails)
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
    axios.get('http://localhost:3000/expense/getExpense')
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
    let ul=document.querySelector(`ul`);
    let li=document.createElement(`li`);
    li.innerHTML = `${data.amount} - ${data.description} - ${data.category} <button class="delete">Delete Expense</button>`;
    ul.appendChild(li);
    const Delete = li.querySelector('.delete');
    Delete.onclick = () => {
        ul.removeChild(Delete.parentElement);
        deleteExpense(data.id);
    }
}

function deleteExpense(userId){
    axios.delete(`http://localhost:3000/expense/deleteExpense/${userId}`)
    .then(res => {
        const p = document.querySelector('.expense_message');
        p.innerHTML = res.data.message;
    })
    .catch(err => {
        const p = document.querySelector('.expense_message');
        p.innerHTML = err.response.data.error ? err.response.data.error : 'An error occured';
    });
}