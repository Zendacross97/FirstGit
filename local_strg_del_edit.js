function handleFormSubmit(event) {
  event.preventDefault();
  const username = event.target.username.value;
  const email = event.target.email.value;
  const phone = event.target.phone.value;
  let obj_Details = {
      username,
      email,
      phone
  }
  localStorage.setItem(obj_Details.email, JSON.stringify(obj_Details));

  //creating ul and li to display below form
  const ul=document.querySelector(`ul`);
  const li=document.createElement(`li`);
  li.innerHTML= obj_Details.username+` - `+obj_Details.email+` - `+obj_Details.phone;

  //create del button to remove local-storage & li
  const del = document.createElement(`button`);
  li.appendChild(del);
  del.textContent = `Del`;
  del.onclick=()=>{
    localStorage.removeItem(obj_Details.email);
    ul.removeChild(li);
  }

  //create edit button to remove local-storage, li & put li values in input.values
  const Edit=document.createElement(`button`);
  Edit.textContent=`Edit`;
  Edit.onclick=()=>{
    document.querySelector(`#username`).value = username;
    document.querySelector(`#email`).value = email;
    document.querySelector(`#phone`).value = phone;        
    localStorage.removeItem(obj_Details.email);
    ul.removeChild(li);
  }
  li.appendChild(Edit);
  ul.appendChild(li);
}
module.exports = handleFormSubmit;