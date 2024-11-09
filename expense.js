function add(event){
    event.preventDefault();
    const amount = event.target.amount.value;
    const description = event.target.description.value;
    const category = event.target.category.value;
    let obj_Details = {
        amount,
        description,
        category
    }
    localStorage.setItem(obj_Details.amount, JSON.stringify(obj_Details));
    let li=document.createElement(`li`);
    li.innerHTML=obj_Details.amount+`-`+obj_Details.description+`-`+obj_Details.category;
    let ul=document.querySelector(`ul`);
    ul.appendChild(li);
    let Delete=document.createElement(`button`);
    Delete.textContent=`Delete`;
    Delete.className=`btn btn-outline-danger`;
    Delete.onclick=()=>{
        localStorage.removeItem(obj_Details.amount);
        ul.removeChild(li);
    }
    li.appendChild(Delete);
    let Edit=document.createElement(`button`);
    Edit.textContent=`Edit`;
    Edit.className=`btn btn-outline-secondary`;
    li.appendChild(Edit);
    Edit.onclick=()=>{
        document.querySelector(`#amount`).value=amount;
        document.querySelector(`#description`).value=description;
        document.querySelector(`#category`).value=category;
        localStorage.removeItem(obj_Details.amount);
        ul.removeChild(li);
    }
}

