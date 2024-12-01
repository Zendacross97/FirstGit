const count=document.querySelector(`#number`);
function handleFormSubmit(event){
    event.preventDefault();
    const email=event.target.email.value;
    const password=event.target.password.value;
    const details={email,password};

    axios
        .post("https://crudcrud.com/api/6d71d342566542828c50d2ef90ba1042/password",details)
        .then((res)=>{
            console.log(res);
            display(res.data);
        })
        .catch(err=>console.log(err));    
    
    event.target.email.value="";
    event.target.password.value="";
    ++count.value; 
}

window.addEventListener("DOMContentLoaded",()=>{
    axios
        .get("https://crudcrud.com/api/6d71d342566542828c50d2ef90ba1042/password")
        .then((result)=>{
            for(i=0;i<result.data.length;i++){
                display(result.data[i]);
            }
            count.value=i;
        })
        .catch(err=>console.log(err));
})

function display(details){

    const ul=document.querySelector(`ul`);
    const li=document.createElement(`li`);
    li.innerHTML=`${details.email}-${details.password}`;
    
    const Delete=document.createElement(`button`);
    const Delete_text=document.createTextNode(`Delete`);
    Delete.appendChild(Delete_text);
    Delete.onclick=()=>{
        --count.value;
        ul.removeChild(Delete.parentElement);
        axios
            .delete(`https://crudcrud.com/api/6d71d342566542828c50d2ef90ba1042/password/${details._id}`)
            .then(res=>display(res))
            .catch(err=>console.log(err));
    }

    const Edit=document.createElement(`button`);
    const Edit_text=document.createTextNode(`Edit`);
    Edit.appendChild(Edit_text);
    Edit.onclick=()=>{
        --count.value;
        document.getElementById("email").value = details.email;
        document.getElementById("password").value = details.password;
        ul.removeChild(Edit.parentElement);
        axios
            .delete(`https://crudcrud.com/api/6d71d342566542828c50d2ef90ba1042/password/${details._id}`)
            .then(res=>display(res))
            .catch(err=>console.log(err));
    }
    li.appendChild(Delete);
    li.appendChild(Edit);
    ul.appendChild(li);
}

const filter=document.querySelector(`#filter`);
filter.addEventListener("keyup",function(event){
    const search_items=document.querySelectorAll(`li`);
    for(let i=0;i<search_items.length;i++){
        if(search_items[i].firstChild.textContent.toLowerCase().indexOf(filter.value.toLowerCase())===-1)
            search_items[i].style.display=`none`;
        else 
        search_items[i].style.display=`flex`;
    } 
})