const userForm = document.querySelector('#userForm');
userForm.addEventListener('submit', function (e) {

    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const number = e.target.number.value;
    const obj = { name, email, number };

    axios
    .post('http://localhost:3000/users/add-user', obj)
    .then(res => {
        console.log(res);
        display(res.data.newUserDetails);
    })

    e.target.name.value = '';
    e.target.email.value = '';
    e.target.number.value = '';

});

window.addEventListener('DOMContentLoaded', () => {
    axios
    .get('http://localhost:3000/users/get-users')
    .then(res => {
        console.log(res);
        for(let i=0; i<res.data.newUserDetails.length; i++) {
            display(res.data.newUserDetails[i]);
        }
    });
});

function display(data) {
    const ul = document.querySelector('ul');
    const li = document.createElement('li');
    const br = document.createElement('br');
    li.innerHTML = `${data.name}-${data.email}-${data.number} <button class="delete">Delete</button>`;
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
    .delete(`http://localhost:3000/users/delete-user/${id}`)
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    });
}