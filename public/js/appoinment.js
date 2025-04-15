function handleFormSubmit(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const number = e.target.number.value;
    const obj = { name, email, number };
    axios.post('http://localhost:3000/appoinment/add', obj)
        .then(res => {
            console.log(res);
            showAppoinment(res.data.appoinmentDetails);
        })
        .catch(err => {
            console.error('Error in POST request:', err); // Debugging log
        });
    e.target.name.value = "";
    e.target.email.value = "";
    e.target.number.value = "";    
}
window.addEventListener("DOMContentLoaded", () => {
    axios.get("http://localhost:3000/appoinment/get")
    .then((res) => {
        console.log(res);
        for (var i = 0; i < res.data.appoinmentDetails.length; i++) {
            showAppoinment(res.data.appoinmentDetails[i]);            
        } 
    })
    .catch(err => {
        console.log('Error fetching users:', err);
    });
});

function showAppoinment(data){
    const ul = document.querySelector('ul');
    const li = document.createElement('li');
        li.innerHTML = `${data.name} - ${data.email} - ${data.number} <button class="delete">Delete</button> <button>Edit</button>`;
        ul.appendChild(li);
        const Delete = li.querySelector('.delete');
        Delete.onclick = () => {
            ul.removeChild(Delete.parentElement);
            deleteAppoinment(data.id);
        }
}

function deleteAppoinment(userId){
    axios.delete(`http://localhost:3000/appoinment/delete/${userId}`)
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    });
}