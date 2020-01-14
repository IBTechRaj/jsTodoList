
// class TodoData {

// }
const itemList = document.querySelector(".item-list");
const feedback = document.querySelector(".feedback");
// let itemData = JSON.parse(localStorage.getItem("list")) || [];



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

// class LocalStorage {
//     static addProject(project) {
//         const projs = LocalStorage.getProjects();

//         projs.push(project);

//         localStorage.setItem('projs', JSON.stringify(projs));
//         console.log(projs)
//     }
//     static getProjects() {
//         let projs;
//         if (localStorage.getItem('projs') === null) {
//             projs = [];
//         } else {
//             projs = JSON.parse(localStorage.getItem('projs'));
//         }


//         return projs;
//     }
//     static removeProjects(ctitle, index) {
//         const projs = LocalStorage.getProjects();

//         projs.forEach(function (project) {
//             if (project.ptitle === ctitle) {
//                 projs.splice(index, 1);
//             }
//         });

//         localStorage.setItem('projs', JSON.stringify(projs));
//     }

//     static updateProjects1(ptitle, index) {
//         this.removeProjects(ptitle, index);
//         this.addProject(ptitle);
//     }

//     static updateProjects(project, index) {
//         localStorage.setItem('projs', JSON.stringify(project));
//     }

// }
// Event Listeners

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
        projectItem.innerHTML = projects[i].ptitle;
        projectItem.style.fontSize = "2.2rem";
        projectItem.style.padding = "20px";
        projectItem.style.marginBottom = "10px";
        projectList.appendChild(projectItem);
    }

    return projectList;
}








function renderToDoList(project, toDoItems) {
    const toDoList = document.querySelector(".item-list");//"#todo-list"

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

            renderToDoList(project, project.toDoItems);
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

    let selectedProjectElement = document.querySelector(".selected");


    if (selectedProjectElement) {
        let project = projects[selectedProjectElement.id - 1];
        project.addToDoItem(toDoItem(todoTitle, todoDescription, todoPriority, todoDueDate));

//             const toDoItem = (title, description, priority, dueDate) => {
//     return { title, description, priority, dueDate };
// }
 /////////element.todos.push(todoItem);
//                 window.localStorage.setItem(storeKey, JSON.stringify(store));

        //////////////const newToDoItem=[todoTitle, todoDescription, todoPriority, todoDueDate];
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
    console.log(todoItem, project);
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
               console.log(project );
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



/***** My Local Storage */

class LocalStorage {
    static addProject(project) {
        const projs = LocalStorage.getProjects();

        projs.push(project);

        localStorage.setItem('projs', JSON.stringify(projs));
        // console.log(projs)
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
        //  console.log(projs);
        //  console.log(project.toDoItem.title);
         projs.forEach(function (proj){
             if (proj.ptitle === project.ptitle){
                 //console.log(todoTitle);
                // proj.addToDoItem(project.toDoItem(title, description, priority, dueDate));
                // defaultProject.addToDoItem(toDoItem("Buy Milk", "Buy Milk from store", "Urgent", "16/5/2020"));
                // console.log(proj.toDoItem);
                // proj.toDoItems.push(project.toDoItems);
                proj.toDoItems=project.toDoItems;
                // console.log(proj);
             }
         });
        localStorage.setItem('projs', JSON.stringify(projs));
    }

static delEdTodo(project, dtitle) {
         const projs = LocalStorage.getProjects();
         
        //  projs.forEach(function (proj){
        //      console.log(dtitle + " " + project.ptitle);
        //      console.log(proj);
             
        //      if (proj.ptitle === project.ptitle)
                 
                 
                 project.toDoItems.forEach(function (todo_item,index){
                     if (todo_item.title === dtitle){
                         console.log(todo_item.title +": " +dtitle);
                         project.toDoItems.splice(index, 1);
                     }
                 });   
             
        //  });
        // localStorage.setItem('projs', JSON.stringify(projs));
    }

    static deleteTodo(project, dtitle) {
         const projs = LocalStorage.getProjects();
        //  console.log(projs);
        //  console.log(project.toDoItem.title);
         
         projs.forEach(function (proj){
             console.log(dtitle + " " + project.ptitle);
             console.log(proj);
             

             if (proj.ptitle === project.ptitle)
                 proj.toDoItems.forEach(function (todo_item,index){
                     if (todo_item.title === dtitle){
                         console.log(todo_item.title +": " +dtitle);
                         proj.toDoItems.splice(index, 1);
                     }
                 });



             
                 //console.log(todoTitle);
                // proj.addToDoItem(project.toDoItem(title, description, priority, dueDate));
                // defaultProject.addToDoItem(toDoItem("Buy Milk", "Buy Milk from store", "Urgent", "16/5/2020"));
                console.log(dtitle);
                // proj.toDoItems.push(project.toDoItems);
                // proj.toDoItems=project.toDoItems;
                
             
         });
        localStorage.setItem('projs', JSON.stringify(projs));
    }

    static renderSample() {

        
let defaultProject = project("Sample");
    projects.push(defaultProject);
    defaultProject.addToDoItem(toDoItem("Buy Milk", "Buy Milk from store", "Urgent", "16/5/2020"));
    defaultProject.addToDoItem(toDoItem("Buy Cheese slices", "Buy Cheese from hotel", "Ordinary", "16/5/2019"));

// const projs = LocalStorage.getProjects();
// projs.push(defaultProject);

        LocalStorage.addProject(defaultProject);
        
    renderProjectsList();
    addEventListenerToProjectItem();
    renderProjectName("Sample");
    renderToDoList(defaultProject, defaultProject.toDoItems);
        
    const defaultProjectElement = document.querySelector("#project-list li");
    defaultProjectElement.classList.add("selected");
    
    }
    


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
/************ Local Storage */

// const storage = (() => {
//     let store;
//     const storeKey = 'todos-database';
//     const getStorage = () => {
//         store = window.localStorage.getItem(storeKey);
//         if (!store) {
//             store = [];
//             window.localStorage.setItem(storeKey, JSON.stringify(store));
//         }
//         return store;
//     };

//     const getProjects = () => JSON.parse(getStorage());

    /*
    const getTodos = () => {
      let todos = [];
      getProjects().forEach(project => todos.push(...project.todos));
      return todos;
    };
  
    const getTodosFor = project => {
      for (const p of getProjects()) {
        if (p.name === project) {
          return p.todos;
        }
      }
      return [];
    };*/

    /**
     * Create a new project 
     *
     */
//     const addProject = project => {
//         const projects = getProjects();
//         projects.push(project);

//         window.localStorage.setItem(storeKey, JSON.stringify(projects));
//     };

//     function getProjectById(id) {
//         for (const project of getProjects()) {
//             if (project.id === id) {
//                 return project;
//             }
//         }
//     }

//     function getTodoItemById(projectId, index) {
//         const project = getProjectById(projectId);
//         const todoItem = project.todos[index];
//         return todoItem;
//     }

//     const addTodoItem = (project, todoItem) => {
//         store = getProjects();
//         store.forEach(element => {
//             if (element['name'] === project) {
//                 element.todos.push(todoItem);
//                 window.localStorage.setItem(storeKey, JSON.stringify(store));
//             }
//         });
//     };

//     const deleteProject = evt => {
//         const store = getProjects();
//         let name = getProjects().map(element => element.name);
//         let index = name.findIndex(name => name === evt.target.dataset.target);
//         store.splice(index, 1);
//         window.localStorage.setItem(storeKey, JSON.stringify(store));
//     };

//     const deleteTodoItem = (projectId, index) => {
//         const project = getProjectById(projectId);
//         project.todos.splice(index, 1);
//         updateProject(projectId, project);
//     };

//     const existsProject = name => {
//         const projects = getProjects();
//         for (const project of projects) {
//             if (project.name.toLowerCase().trim() === name.toLowerCase().trim()) {
//                 return true;
//             }
//         }
//         return false;
//     };

//     const updateProject = (id, project) => {
//         const projects = getProjects();
//         let i = -1;
//         projects.forEach((p, index) => {
//             if (id === p.id) {
//                 i = index;
//             }
//         });
//         projects.splice(i, 1, project);
//         window.localStorage.setItem(storeKey, JSON.stringify(projects));
//     };

//     const updateTodoItem = (projectId, index, todoItem) => {
//         const project = getProjectById(projectId);
//         project.todos.splice(index, 1, todoItem);
//         updateProject(projectId, project);
//     };

//     const editProject = (projectId, projectName) => {
//         const project = getProjectById(projectId);
//         project.name = projectName;
//         updateProject(projectId, project);
//     };

//     return {
//         addProject,
//         existsProject,
//         getProjectById,
//         getProjects,
//         addTodoItem,
//         deleteProject,
//         deleteTodoItem,
//         editProject,
//         updateProject,
//         updateTodoItem,
//         getTodoItemById
//     };
// })();

// export default storage;
