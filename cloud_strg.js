function handleFormSubmit(event){
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    let obj_Details = {
        username,
        email,
        phone
    };
    axios
        .post("https://crudcrud.com/api/1d935f2f55e644beadd4e30be3b39ced/todo",obj_Details)
        .then(res=>{
            displayUserOnScreen(res.data)
            console.log(res.data)
        })
        .catch(err=>console.log(err));

    // Clearing the input fields
  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
}
function displayUserOnScreen(obj_Details) {
    const userItem = document.createElement("li");
    userItem.appendChild(
      document.createTextNode(
        `${obj_Details.username} - ${obj_Details.email} - ${obj_Details.phone}`
      )
    );

    const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  userItem.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.appendChild(document.createTextNode("Edit"));
  userItem.appendChild(editBtn);

  const userList = document.querySelector("ul");
  userList.appendChild(userItem);

  deleteBtn.addEventListener("click", function (event) {
    userList.removeChild(event.target.parentElement);
    localStorage.removeItem(obj_Details.email);
  });
  
  editBtn.addEventListener("click", function (event) {
    userList.removeChild(event.target.parentElement);
    localStorage.removeItem(obj_Details.email);
    document.getElementById("username").value = obj_Details.username;
    document.getElementById("email").value = obj_Details.email;
    document.getElementById("phone").value = obj_Details.phone;
  });
}

