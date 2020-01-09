
// // // form  ............ from other project ......................
// const itemForm = document.getElementById("itemForm");
// const itemInput = document.getElementById("itemInput");
// const itemList = document.querySelector(".item-list");
// const clearBtn = document.getElementById("clear-list");
// const feedback = document.querySelector(".feedback");
// // let itemData = [];

// let itemData = JSON.parse(localStorage.getItem("list")) || [];

// if (itemData.length > 0) {
//     itemData.forEach(function (singleItem) {
//         itemList.insertAdjacentHTML(
//             "beforeend",
//             `<div class="item my-3">
//       <h5 class="item-name text-capitalize">${singleItem}</h5>
//       <div class="item-icons">
//        <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
//        <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
//        <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
//       </div>
//      </div>`
//         );
//         handleItem(singleItem);
//     });
// }


// itemForm.addEventListener("submit", function (event) {
//     event.preventDefault();
//     const textValue = itemInput.value;
//     if (textValue === "") {
//         showFeedback("please enter valid value", "danger");
//     } else {
//         addItem(textValue);
//         itemInput.value = "";
//         // add to data;
//         itemData.push(textValue);
//         // console.log(itemData);

//         //updated local storage
//         localStorage.setItem("list", JSON.stringify(itemData));

//         // add event listeners to icons
//         handleItem(textValue);
//     }
// });

// function showFeedback(text, action) {
//     feedback.classList.add("showItem", `alert-${action}`);
//     feedback.innerHTML = `<p>${text}</p>`;

//     setTimeout(function () {
//         feedback.classList.remove("showItem", `alert-${action}`);
//     }, 3000);
// }

// function addItem(value) {
//     const div = document.createElement("div");
//     div.classList.add("item", "my-3");
//     div.innerHTML = `<h5 class="item-name text-capitalize">${value}</h5>
//       <div class="item-icons">
//        <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
//        <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
//        <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
//       </div>`;
//     itemList.appendChild(div);
// }

// function handleItem(textValue) {
//     const items = itemList.querySelectorAll(".item");
//     items.forEach(function (item) {
//         if (item.querySelector(".item-name").textContent === textValue) {
//             // complete event listener
//             item
//                 .querySelector(".complete-item")
//                 .addEventListener("click", function () {
//                     item.querySelector(".item-name").classList.toggle("completed");
//                     this.classList.toggle("visibility");
//                 });
//             // edit event listener
//             item.querySelector(".edit-item").addEventListener("click", function () {
//                 itemInput.value = textValue;
//                 itemList.removeChild(item);
//                 itemData = itemData.filter(function (item) {
//                     return item !== textValue;
//                 });
//                 localStorage.setItem("list", JSON.stringify(itemData));

//                 // console.log(itemData);
//             });
//             // delete event listener
//             item.querySelector(".delete-item").addEventListener("click", function () {
//                 itemList.removeChild(item);
//                 showFeedback("item deleted", "success");
//                 itemData = itemData.filter(function (item) {
//                     return item !== textValue;
//                 });
//                 localStorage.setItem("list", JSON.stringify(itemData));
//             });
//         }
//     });
// }

// clearBtn.addEventListener("click", function () {
//     itemData = [];
//     localStorage.removeItem("list");
//     const items = itemList.querySelectorAll(".item");
//     if (items.length > 0) {
//         items.forEach(function (item) {
//             itemList.removeChild(item);
//         });
//     }
// });


// render to do list
// function renderToDoList1(toDoItems) {
//     const toDoList = document.querySelector("#item-list"); //"#todo-list"

//     if (toDoList.children.length > 0) {
//         while (toDoList.children.length !== 0) {
//             toDoList.removeChild(toDoList.lastChild);
//         }
//     }

//     for (let i = 0; i < toDoItems.length; i++) {
//         const toDoItem = document.createElement("li");
//         toDoItem.setAttribute("id", `${i + 1}`);

//         const taskCompletedCheckbox = document.createElement('div');
//         taskCompletedCheckbox.classList.add("taskCompleteChbx");

//         if (toDoItems[i].isCompleted) {
//             taskCompletedCheckbox.style.backgroundImage = "url('icons/checked.png')";
//         } else {
//             taskCompletedCheckbox.style.backgroundImage = "url('icons/not-checked.png')";
//         }
//         taskCompletedCheckbox.style.backgroundRepeat = "no-repeat";
//         taskCompletedCheckbox.style.backgroundPosition = "center";
//         taskCompletedCheckbox.style.flex = 1;

//         const prioritySelectionBox = document.createElement('div');
//         prioritySelectionBox.classList.add("priorityStatus");

//         if (toDoItems[i].isUrgent) {
//             prioritySelectionBox.style.backgroundImage = "url('icons/important.png')";
//         } else {
//             prioritySelectionBox.style.backgroundImage = "url('icons/not-important.png')";
//         }
//         prioritySelectionBox.style.backgroundRepeat = "no-repeat";
//         prioritySelectionBox.style.backgroundPosition = "center";
//         prioritySelectionBox.style.flex = 1;

//         const toDoItemTitle = document.createElement("span");
//         toDoItemTitle.innerHTML = toDoItems[i].title;
//         toDoItemTitle.style.flex = 5;

        // const toDoItemDueDate = document.createElement("date");
        // toDoItemDueDate.innerHTML = toDoItems[i].dueDate;
        // toDoItemDueDate.style.flex = 5;

//         const expandOption = document.createElement("div");
//         expandOption.style.flex = 1;
//         const expandOptionBtn = document.createElement("button");
//         expandOptionBtn.innerHTML = "&#x25BC";
//         expandOptionBtn.style.backgroundColor = "inherit";
//         expandOptionBtn.style.border = "0";
//         expandOptionBtn.style.cursor = "pointer";
//         expandOption.appendChild(expandOptionBtn);
//         expandOptionBtn.classList.add("expandBtn");

//         toDoItem.appendChild(taskCompletedCheckbox);
//         toDoItem.appendChild(prioritySelectionBox);
//         toDoItem.appendChild(toDoItemTitle);
//         // toDoItem.appendChild(toDoItemDueDate);
//         toDoItem.appendChild(expandOption);
//         toDoList.appendChild(toDoItem);
//     }

//     if (toDoList.children.length === 0) {
//         const toDoItem = document.createElement("li");
//         toDoItem.innerHTML = "Click on <strong> Add To Do </strong> Button to add a new To Do Item";
//         toDoItem.style.padding = "30px";
//         toDoList.appendChild(toDoItem);
//     }

//     const todoItemsContainer = document.querySelector(".todo-items-container");
//     todoItemsContainer.appendChild(toDoList);

//     addEventListenerToCheckBox();
//     addEventListenerToPrioritykBox();
//     addEventListenerToExpandOption();
// }
// const prioritySelectionBox = document.createElement('div');
//         prioritySelectionBox.classList.add("priorityStatus");

//         if (toDoItems[i].isUrgent) {
//             prioritySelectionBox.style.backgroundImage = "url('icons/important.png')";
//         } else {
//             prioritySelectionBox.style.backgroundImage = "url('icons/not-important.png')";
//         }
//         prioritySelectionBox.style.backgroundRepeat = "no-repeat";
//         prioritySelectionBox.style.backgroundPosition = "center";
//         prioritySelectionBox.style.flex = 1;
// const e = document.getElementById("prio-select");
// var priority = e.options[e.selectedIndex].text;

//         toDoItemDueDate.innerHTML = toDoItems[i].dueDate;
//         toDoItemDueDate.style.flex = 5;


// function toggleImportance(toDoItem) {
//     if (toDoItem.isUrgent) {
//         toDoItem.isUrgent = false;
//     } else {
//         toDoItem.isUrgent = true;
//     }
// }




// function addEventListenerToCheckBox() {
//     const checkBoxItems = document.querySelectorAll(".taskCompleteChbx");
//     for (let i = 0; i < checkBoxItems.length; i++) {
//         checkBoxItems[i].addEventListener("click", (e) => {
//             let selectedProjectElement = document.querySelector(".selected");

//             let selectedProject = projects[selectedProjectElement.id - 1];

//             let toDoItem = selectedProject.toDoItems[e.target.parentNode.id - 1];

//             if (toDoItem.isCompleted) {
//                 toDoItem.isCompleted = false;
//             } else {
//                 toDoItem.isCompleted = true;
//             }

//             if (selectedProjectElement) {
//                 renderToDoList(selectedProject.toDoItems);
//             }
//         });
//     }
// }

// function addEventListenerToPrioritykBox() {
//     const prioritySelectionItems = document.querySelectorAll(".priorityStatus");
//     for (let i = 0; i < prioritySelectionItems.length; i++) {
//         prioritySelectionItems[i].addEventListener("click", (e) => {
//             let selectedProjectElement = document.querySelector(".selected");

//             let selectedProject = projects[selectedProjectElement.id - 1];

//             let toDoItem = selectedProject.toDoItems[e.target.parentNode.id - 1];

//             if (toDoItem.isUrgent) {
//                 toDoItem.isUrgent = false;
//             } else {
//                 toDoItem.isUrgent = true;
//             }

//             if (selectedProjectElement) {
//                 renderToDoList(selectedProject.toDoItems);
//             }
//         });
//     }
// }

// function addEventListenerToExpandOption() {
//     const ExapandBtns = document.querySelectorAll(".expandBtn");
//     for (let i = 0; i < ExapandBtns.length; i++) {
//         ExapandBtns[i].addEventListener("click", (e) => {
//             let selectedProjectElement = document.querySelector(".selected");

//             let toDoItemElement = e.target.parentNode.parentNode;
//             toDoItemElement.style.borderBottom = "0";

//             let selectedProject = projects[selectedProjectElement.id - 1];

//             let toDoItem = selectedProject.toDoItems[toDoItemElement.id - 1];

//             const descriptionItem = document.createElement("li");
//             const description = document.createElement("p");
//             description.innerHTML = toDoItem.description;
//             description.style.paddingLeft = "22px";
//             descriptionItem.appendChild(description);
//             // description.style
//             // e.target.parentNode.parentNode.appendChild(description);
//             toDoItemElement.parentNode.insertBefore(descriptionItem, toDoItemElement.nextSibling);
//         });
//     }
// }


// function openForm() {
//     document.getElementById("new-project-form").style.display = "block";
// }

// function closeForm() {
//     document.getElementById("new-project-form").style.display = "none";
// }
// // When the user clicks anywhere outside of the modal, close it

// window.onclick = function (event) {
//     var modal = document.getElementById('new-project-form');
//     if (event.target == modal) {
//         closeForm();
//     }
// }


// const newProjectCancelBtn = document.querySelector("#project-cancel-btn");

// newProjectCancelBtn.addEventListener("click", () => {
//     const formContainer = document.querySelector(".new-project-form-container");
//     formContainer.classList.remove("show");
//     formContainer.classList.add("hidden");
// });

// const newTodoCancelBtn = document.querySelector("#todo-cancel-btn");

// newTodoCancelBtn.addEventListener("click", () => {
//     const formContainer = document.querySelector(".new-todo-form-container");
//     formContainer.classList.remove("show");
//     formContainer.classList.add("hidden");
// });



// function toggleCompleteness(toDoItem) {
//     if (toDoItem.isCompleted) {
//         toDoItem.isCompleted = false;
//     } else {
//         toDoItem.isCompleted = true;
//     }
// }
