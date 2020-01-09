// todos work

//let format = require('date-fns/format');
const itemList = document.querySelector(".item-list");
const feedback = document.querySelector(".feedback");
let itemData = JSON.parse(localStorage.getItem("list")) || [];

let projects = [];

const project = (title) => {
    let toDoItems = [];

    const addToDoItem = (toDoItem) => {
        toDoItems.push(toDoItem);
    }

    return { title, toDoItems, addToDoItem };
}

// const toDoItem = (title, discription, dueDate, isUrgent, isCompleted) => {
//     return { title, discription, dueDate, isUrgent, isCompleted };
// }
const toDoItem = (title, description, priority, dueDate) => {
    return { title, description, priority, dueDate };
}

// Event Listeners

const addNewProjectBtn = document.querySelector("#new-project-btn");

addNewProjectBtn.addEventListener("click", () => {
    //  console.log("hi");

    const formContainer = document.querySelector(".new-project-form-container");
    formContainer.classList.remove("hidden");
    formContainer.classList.add("show");
});


const newProjectForm = document.querySelector("#new-project-form");

newProjectForm.addEventListener("submit", (e) => {
    const projectName = document.querySelector("#project-name").value;
    // console.log(projectName);
    projects.push(project(projectName));
    renderProjectsList();
    addEventListenerToProjectItem();

    const formContainer = document.querySelector(".new-project-form-container");
    formContainer.classList.remove("show");
    formContainer.classList.add("hidden");
    e.preventDefault();
});



function renderProjectsList() {
    const projectListContainer = document.querySelector(".project-list-container");
    const projectList = getProjectsList(projects);
    projectListContainer.appendChild(projectList);
}



function getProjectsList(projects) {
    const projectList = document.querySelector("#project-list");
    if (projectList.children.length > 0) {
        while (projectList.children.length !== 0) {
            projectList.removeChild(projectList.lastChild);
        }
    }

    for (let i = 0; i < projects.length; i++) {
        const projectItem = document.createElement("li");
        projectItem.setAttribute("id", `${i + 1}`);
        projectItem.innerHTML = projects[i].title;
        projectItem.style.fontSize = "2.2rem";
        projectItem.style.padding = "20px";
        projectItem.style.marginBottom = "10px";
        projectList.appendChild(projectItem);
    }

    return projectList;
}






// Default Project Initialized

let defaultProject = project("Sample");
projects.push(defaultProject);
defaultProject.addToDoItem(toDoItem("Buy Milk", "Buy Milk from store", "Urgent", "16/5/2019"));
defaultProject.addToDoItem(toDoItem("Buy Cheese slices", "Buy Cheese from store", "Ordinary", "16/5/2019"));
renderProjectsList();
addEventListenerToProjectItem();
renderProjectName("Sample");
renderToDoList(defaultProject.toDoItems);

const defaultProjectElement = document.querySelector("#project-list li");
defaultProjectElement.classList.add("selected");

function renderProjectName(name) {
    const projectName = document.querySelector("#project-name-heading");
    projectName.innerHTML = name;
}



//... redefining render todos

function renderToDoList(toDoItems) {
    const toDoList = document.querySelector(".item-list");//"#todo-list"

    if (toDoList.children.length > 0) {
        while (toDoList.children.length !== 0) {
            toDoList.removeChild(toDoList.lastChild);
        }
    }
    if (toDoItems.length > 0) {
        for (let i = 0; i < toDoItems.length; i++) {
            //toDoItems.forEach(function (singleItem) {
            itemList.style.width = "800px";
            itemList.insertAdjacentHTML(
                "beforeend",
                `<div class="item my-3">
                
      <h5 class="item-name text-capitalize style = "width: 300px; color: red">${toDoItems[i].title}</h5>
      <h5 class="item-name text-capitalize">${toDoItems[i].description}</h5>
     <h5 class="item-name text-capitalize">${toDoItems[i].priority}</h5> 
      
      <h5 class="item-name text-capitalize">${toDoItems[i].dueDate}</h5>
    
      
      <div class="item-icons">
       <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
       <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
       <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
      </div>
     </div>`
            );


            // itemList.appendChild(row);
            handleItem(toDoItems[i].title);
        }
    }
}


/********************* Event Listeners **************/

function addEventListenerToProjectItem() {
    const projectList = document.querySelectorAll("#project-list > li");

    for (let i = 0; i < projectList.length; i++) {
        projectList[i].addEventListener("click", (e) => {
            renderProjectName(e.target.innerText);

            for (let i = 0; i < projectList.length; i++) {
                if (projectList[i].classList.contains("selected")) {
                    projectList[i].classList.remove("selected");
                }
            }

            e.target.classList.add("selected");

            let project = projects[e.target.id - 1];

            renderToDoList(project.toDoItems);
        });
    }
}




// what to do when add-todo-btn clicked

const addNewTodoBtn = document.querySelector("#new-todo-btn");

addNewTodoBtn.addEventListener("click", () => {
    const formTodoContainer = document.querySelector(".new-todo-form-container");
    formTodoContainer.classList.remove("hidden");
    formTodoContainer.classList.add("show");
});

const newTodoForm = document.querySelector("#new-todo-form");

newTodoForm.addEventListener("submit", (e) => {
    const todoTitle = document.querySelector("#todo-title").value;
    const todoDescription = document.querySelector("#todo-description").value;
    const todoDueDate = document.querySelector("#todo-due-date").value;
    const em = document.getElementById("prio-select");
    const todoPriority = em.options[em.selectedIndex].text;
    // let splitDate = todoDueDate.split("-");
    // let convertedDate = new Date(splitDate[0], splitDate[1] - 1, splitDate[2]);
    // const newTodoDueDate = format(convertedDate, "DD/MM/YYYY");
    // const todoImportance = document.querySelector("#importance").checked;

    let selectedProjectElement = document.querySelector(".selected");

    if (selectedProjectElement) {
        let project = projects[selectedProjectElement.id - 1];
        // project.addToDoItem(toDoItem(todoTitle, todoDiscription, newTodoDueDate, todoImportance, false));
        project.addToDoItem(toDoItem(todoTitle, todoDescription, todoPriority, todoDueDate));
        renderToDoList(project.toDoItems);

    }

    const formContainer = document.querySelector(".new-todo-form-container");
    formContainer.classList.remove("show");
    formContainer.classList.add("hidden");
    e.preventDefault();
});







/******** Helper methods *******/


function handleItem(textValue) {
    const items = itemList.querySelectorAll(".item");
    items.forEach(function (item) {
        if (item.querySelector(".item-name").textContent === textValue) {
            // complete event listener
            item
                .querySelector(".complete-item")
                .addEventListener("click", function () {
                    item.querySelector(".item-name").classList.toggle("completed");
                    this.classList.toggle("visibility");
                });
            // edit event listener
            item.querySelector(".edit-item").addEventListener("click", () => {
                const formTodoContainer = document.querySelector(".new-todo-form-container");
                formTodoContainer.classList.remove("hidden");
                formTodoContainer.classList.add("show");
                document.querySelector("#todo-title").value = textValue;
                itemList.removeChild(item);
                itemData = itemData.filter(function (item) {
                    return item !== textValue;
                });
                localStorage.setItem("list", JSON.stringify(itemData));
            });
            // item.querySelector(".edit-item").addEventListener("click", function () {
            //     itemInput.value = textValue;
            //     itemList.removeChild(item);
            //     itemData = itemData.filter(function (item) {
            //         return item !== textValue;
            //     });
            //     localStorage.setItem("list", JSON.stringify(itemData));

            // console.log(itemData);
            // });
            // delete event listener
            item.querySelector(".delete-item").addEventListener("click", function () {
                itemList.removeChild(item);
                showFeedback("item deleted", "success");
                itemData = itemData.filter(function (item) {
                    return item !== textValue;
                });
                localStorage.setItem("list", JSON.stringify(itemData));
            });
        }
    });
}

function showFeedback(text, action) {
    feedback.classList.add("showItem", `alert-${action}`);
    feedback.innerHTML = `<p>${text}</p>`;

    setTimeout(function () {
        feedback.classList.remove("showItem", `alert-${action}`);
    }, 3000);
}
