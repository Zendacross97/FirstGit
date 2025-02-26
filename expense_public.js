function add(event) {
    event.preventDefault();

    const amount = event.target.amount.value;
    const description = event.target.description.value;
    const category = event.target.category.value;

    const obj = {
        amount,
        description,
        category
    };

    axios
        .post("http://localhost:3000/expense/add-expense", obj)
        .then((response) => {
            console.log(response);
            display(response.data.newExpenseDetails);
        })
        .catch(err => {
            console.error('Error adding expense:', err);
        });

    event.target.amount.value = '';
    event.target.description.value = '';
    event.target.category.value = '';
}

window.addEventListener('DOMContentLoaded', () => {
    axios
        .get("http://localhost:3000/expense/get-expense")
        .then(res => {
            for (let i = 0; i < res.data.newExpenseDetails.length; i++) {
                display(res.data.newExpenseDetails[i]);
            }
        })
        .catch(err => {
            console.error('Error fetching expenses:', err);
        });
});

function display(data) {
    const ul = document.querySelector('ul');
    const li = document.createElement('li');
    const br = document.createElement('br');
    li.innerHTML = `${data.amount}-${data.description}-${data.category} <button class="delete">Delete</button>`;
    ul.appendChild(li);
    ul.appendChild(br);

    const deleteButton = li.querySelector('.delete');
    deleteButton.onclick = () => {
        ul.removeChild(deleteButton.parentElement);
        const id = data.id;
        deleteData(id);
    };
}

function deleteData(id) {
    axios
        .delete(`http://localhost:3000/expense/delete-expense/${id}`)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.error('Error deleting expense:', err);
        });
}