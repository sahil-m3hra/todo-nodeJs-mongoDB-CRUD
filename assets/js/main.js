// Fetching some DOM elements i.e DeleteButton, results div, markasDone button, and Category div
const deleteButtonLink = document.getElementById("deleteButtonLink"),
currentDeleteLink = deleteButtonLink.href,
results = document.getElementsByClassName("results"),
markAsDoneButton = document.getElementsByClassName("markedAsDone"),
catDiv = document.getElementsByClassName("cat-style-div");

// following logic is helping us to apply colors to different selected categories
for (let i = 0; i < results.length; i++) {
    if (catDiv[i].firstElementChild.innerText == 'Personal'){
        catDiv[i].firstElementChild.style.color = '#62B6B7';
    }
    if (catDiv[i].firstElementChild.innerText == 'Work'){
        catDiv[i].firstElementChild.style.color = '#FF9E9E';
    }
    if (catDiv[i].firstElementChild.innerText == 'School'){
        catDiv[i].firstElementChild.style.color = '#D09CFA';
    }
    if (catDiv[i].firstElementChild.innerText == 'Cleaning'){
        catDiv[i].firstElementChild.style.color = '#2B3A55';
    }
    if (catDiv[i].firstElementChild.innerText == 'Other'){
        catDiv[i].firstElementChild.style.color = '#E5BA73';
    }
}  

// following logic will run on everytime this main.js file will load due to refresh or reload and is used to check is the todo is marked as Done then aplly line-through style
for (let i = 0; i < results.length; i++) {
    if(markAsDoneButton[i].attributes.value.value == "true"){
        results[i].children[0].children[1].firstElementChild.style.textDecoration = 'line-through';
        results[i].children[0].children[1].children[1].style.textDecoration = 'line-through';
        markAsDoneButton[i].style.display = 'none';
    }
}  

// following function will run on click when ever 'mark as donw button will pressed. it will toggle the value from 'false' to 'true' and put line throught effect on results and mark them down.
function checkMarkedDoneOrNot(){
    for (let i = 0; i < results.length; i++) {
        if(markAsDoneButton[i].attributes.value.value == "false"){
            markAsDoneButton[i].attributes.value.value = "true";
            results[i].children[0].children[1].firstElementChild.style.textDecoration = 'line-through';
            results[i].children[0].children[1].children[1].style.textDecoration = 'line-through';
            markAsDoneButton[i].style.display = 'none';
            location.reload();
        }
    }    
}

var categories = ['Personal', 'Work', 'School', 'Cleaning', 'Other'];

// following function is used to fetch the todo id from front-end and sending a put (upadte) request to the server
function markAsDone(id){
    checkMarkedDoneOrNot();
    let modURL = `/update-todo/${id}`;
    let payload = {
        id : id
    }
    let options = {
        method : "PUT",
        body: JSON.stringify(payload)
    };
    fetch(modURL,options); 
};
function getId(value){
    const url = currentDeleteLink + '/?id=' + value;
    deleteButtonLink.href = url;
}
