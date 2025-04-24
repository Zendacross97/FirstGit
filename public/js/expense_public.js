function add(event){
    event.preventDefault();
    const amount = event.target.amount.value;
    const description = event.target.description.value;
    const category = event.target.category.value;
    let expenseDetails = { amount, description, category };
    axios.post('http://localhost:3000/expense/add', expenseDetails)
    .then((res) => {
        showExpense(res.data)
    })
    event.target.amount.value = '';
    event.target.description.value = '';
    event.target.category.value = '';
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get('http://localhost:3000/expense/get')
    .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
            showExpense(res.data[i]);
        }
    })
});

function showExpense(data){
    let ul=document.querySelector(`ul`);
    let li=document.createElement(`li`);
    li.innerHTML = `${data.amount} - ${data.description} - ${data.category} <button class="delete">Delete</button> <button class="edit">Edit</button>`;
    ul.appendChild(li);
    const Delete = li.querySelector('.delete');
    Delete.onclick = () => {
        ul.removeChild(Delete.parentElement);
        deleteExpense(data.id);
    }
}

function deleteExpense(userId){
    axios.delete(`http://localhost:3000/expense/delete/${userId}`)
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    });
}