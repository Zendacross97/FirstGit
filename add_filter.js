const form=document.querySelector(`form`);
const fruits=document.querySelector(`.fruits`);
function add(event){
    event.preventDefault();
    const fruit=document.createElement(`li`);
    fruit.className=`fruit`;
    fruit.innerHTML=document.querySelector(`#fruitsToAdd`).value+` <button class="dlt_btn">Delete</button>`+`  <button class="edit_btn">Edit</button>`+`<br></br>`;
    fruits.appendChild(fruit);
}
fruits.addEventListener('click',(e)=>{
    if(e.target.classList.contains(`dlt_btn`)){
        fruits.removeChild(e.target.parentElement);
    }
    else if(e.target.classList.contains(`edit_btn`)){
        document.querySelector(`#fruitsToAdd`).value=e.target.parentElement.firstChild.textContent;
        fruits.removeChild(e.target.parentElement);
    }
})
function find(name){
    const search_name=document.querySelector(`#search`).value.toLowerCase();
    const fruit_name=document.querySelectorAll(`.fruit`);
    for(let i=0;i<fruit_name.length;i++){
        if(fruit_name[i].firstChild.textContent.toLowerCase().indexOf(search_name)===-1){
            fruit_name[i].style.display=`none`;
        }
        else{
            fruit_name[i].style.display=`flex`;
        }
    }
}