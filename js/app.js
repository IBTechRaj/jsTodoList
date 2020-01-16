/***** My Local Storage */

class LocalStorage {
    static addProject(project) {
        const projs = LocalStorage.getProjects();
        projs.push(project);
        localStorage.setItem('projs', JSON.stringify(projs));
    }
    static getProjects() {
        let projs;
        if (localStorage.getItem('projs') === null) {
            projs = [];
        } else {
            projs = JSON.parse(localStorage.getItem('projs'));
        }
        //just to clear the list 

        return projs;
    }
    static addTodo(project) {
        const projs = LocalStorage.getProjects();
        projs.forEach(function (proj) {
            if (proj.ptitle === project.ptitle) {
                proj.toDoItems = project.toDoItems;
            }
        });
        localStorage.setItem('projs', JSON.stringify(projs));
    }

    static delEdTodo(project, dtitle) {
        const projs = LocalStorage.getProjects();

        project.toDoItems.forEach(function (todo_item, index) {
            if (todo_item.title === dtitle) {
                console.log(todo_item.title + ": " + dtitle);
                project.toDoItems.splice(index, 1);
            }
        });
    }

    static deleteTodo(project, dtitle) {
        const projs = LocalStorage.getProjects();

        projs.forEach(function (proj) {
            console.log(dtitle + " " + project.ptitle);
            console.log(proj);


            if (proj.ptitle === project.ptitle)
                proj.toDoItems.forEach(function (todo_item, index) {
                    if (todo_item.title === dtitle) {
                        console.log(todo_item.title + ": " + dtitle);
                        proj.toDoItems.splice(index, 1);
                    }
                });

        });
        localStorage.setItem('projs', JSON.stringify(projs));
    }

    static renderSample() {


        const projs = LocalStorage.getProjects();
        let firstProj = '';
        if (projs.length === 0) {
            let defaultProject = project("Sample");
            firstProj = defaultProject;
            projects.push(defaultProject);
            defaultProject.addToDoItem(toDoItem("Buy Milk", "Buy Milk from store", "Urgent", "16/5/2020"));
            defaultProject.addToDoItem(toDoItem("Buy Cheese slices", "Buy Cheese from hotel", "Ordinary", "16/5/2019"));

            LocalStorage.addProject(defaultProject);
            renderToDoList(defaultProject, defaultProject.toDoItems);
        }


        // let defaultProject = project("Sample");
        //  renderToDoList(firstProj, firstProj.toDoItems);
        // renderProjectName("Sample");
        projects = [];
        const prs = LocalStorage.getProjects();
        prs.forEach(function (pr) {
            console.log(pr);
            projects.push(pr);
        });
        renderProjectsList();
        addEventListenerToProjectItem();
        renderProjectName(prs[0].ptitle);
        renderToDoList(prs[0], prs[0].toDoItems);

        // const defaultProjectElement = document.querySelector("#project-list li");
        // defaultProjectElement.classList.add("selected");

    }

}


/********************* Event Listeners **************/

const addNewProjectBtn = document.querySelector("#new-project-btn");

addNewProjectBtn.addEventListener("click", () => {
    const formContainer = document.querySelector(".new-project-form-container");
    formContainer.classList.remove("hidden");
    formContainer.classList.add("show");
});

const newProjectForm = document.querySelector("#new-project-form");

newProjectForm.addEventListener("submit", (e) => {
    const projectName = document.querySelector("#project-name").value;
    defaultProject = project(projectName);
    projects.push(defaultProject);

    LocalStorage.addProject(defaultProject);

    renderProjectsList();
    addEventListenerToProjectItem();

    const formContainer = document.querySelector(".new-project-form-container");
    formContainer.classList.remove("show");
    formContainer.classList.add("hidden");
    e.preventDefault();
});


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

            renderToDoList(project, project.toDoItems);
        });
    }
}


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

    let selectedProjectElement = document.querySelector(".selected");


    if (selectedProjectElement) {
        let project = projects[selectedProjectElement.id - 1];
        project.addToDoItem(toDoItem(todoTitle, todoDescription, todoPriority, todoDueDate));
        console.log(project.toDoItems);
        LocalStorage.addTodo(project);
        renderToDoList(project, project.toDoItems);
    }

    const formContainer = document.querySelector(".new-todo-form-container");
    formContainer.classList.remove("show");
    formContainer.classList.add("hidden");
    e.preventDefault();
});







/******** Helper methods *******/


function handleItem(todoItem, project) {
    const items = itemList.querySelectorAll(".item");
    items.forEach(function (item) {
        if (item.querySelector(".item-name").textContent === todoItem.title) {
            // complete event listener
            item
                .querySelector(".complete-item")
                .addEventListener("click", function () {
                    item.querySelector(".item-name").classList.toggle("completed");
                    this.classList.toggle("visibility");
                });
            // edit event listener
            item.querySelector(".edit-item").addEventListener("click", () => {
                console.log(project);
                LocalStorage.delEdTodo(project, todoItem.title);
                console.log(project, todoItem.title);
                LocalStorage.deleteTodo(project, todoItem.title);
                itemList.removeChild(item);
                const formTodoContainer = document.querySelector(".new-todo-form-container");
                formTodoContainer.classList.remove("hidden");
                formTodoContainer.classList.add("show");
                document.querySelector("#todo-title").value = todoItem.title;
                document.querySelector("#todo-description").value = todoItem.description;
                document.querySelector("#prio-select").value = todoItem.priority;
                document.querySelector("#todo-due-date").value = todoItem.dueDate;

            });
            // delete event listener
            item.querySelector(".delete-item").addEventListener("click", function () {
                itemList.removeChild(item);
                LocalStorage.delEdTodo(project, todoItem.title);
                LocalStorage.deleteTodo(project, todoItem.title);
                showFeedback("item deleted", "success");

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



function renderProjectName(name) {
    const projectName = document.querySelector("#project-name-heading");
    projectName.innerHTML = name;
}

window.addEventListener('load', LocalStorage.renderSample);

window.onerror = function (msg, url, lineNo, columnNo, error) {
    // ... handle error ...
    this.console.log(msg);

    return false;
}



const itemList = document.querySelector(".item-list");
const feedback = document.querySelector(".feedback");

let projects = [];

const project = (ptitle) => {
    let toDoItems = [];

    const addToDoItem = (toDoItem) => {
        toDoItems.push(toDoItem);
    }

    return { ptitle, toDoItems, addToDoItem };
}


const toDoItem = (title, description, priority, dueDate) => {
    return { title, description, priority, dueDate };
}


function renderProjectsList() {
    const projectListContainer = document.querySelector(".project-list-container");
    // const projects = LocalStorage.getProjects();
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
        projectItem.innerHTML = projects[i].ptitle;
        projectItem.style.fontSize = "2.2rem";
        projectItem.style.padding = "20px";
        projectItem.style.marginBottom = "10px";
        projectList.appendChild(projectItem);
    }

    return projectList;
}


function renderToDoList(project, toDoItems) {
    const toDoList = document.querySelector(".item-list");

    if (toDoList.children.length > 0) {
        while (toDoList.children.length !== 0) {
            toDoList.removeChild(toDoList.lastChild);
        }
    }
    if (toDoItems.length > 0) {
        for (let i = 0; i < toDoItems.length; i++) {
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

            handleItem(toDoItems[i], project);
        }
    }
}

/******** notes
 * added line below(1) - l.277
 * const projects=LocalStorage.getProjects(); to display proj list on loading
 *
 * added below to display default proj todo items(2) - l.82-83
 * const prs = LocalStorage.getProjects();
*      renderToDoList(prs[0], prs[0].toDoItems);

 */