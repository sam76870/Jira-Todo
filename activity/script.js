'use strict';
let colorBtn = document.querySelectorAll(".filter_color");
let mainContainer = document.querySelector(".main-container");
let body = document.body;
let plusbtn = document.querySelector(".fa-plus");
let crossBtn = document.querySelector(".fa-times");
let deleteBtn = document.querySelector(".fa-trash-alt");
let FilterContainer = document.querySelector(".all_task");
let navbar = document.querySelector(".toolbar");
// let iconContainer = document.querySelectorAll(".icon_container");
let themeBox = document.querySelector(".theme");
let deleteState = false;
let lightTheme = true;
let taskArr = [];


if (localStorage.getItem("allTask")) {
    taskArr = JSON.parse(localStorage.getItem("allTask"));
    for (let i = 0; i < taskArr.length; i++) {
        let { id, color, task } = taskArr[i];
        createTask(color, task, false, id);
    }
}

plusbtn.addEventListener("click", createModal);
crossBtn.addEventListener("click", setDeleteState);
deleteBtn.addEventListener("click", deleteAllCards);

//create modal by clicking plusbutton
function createModal() {
    // create modal
    let modalContainer = document.querySelector(".modal_container");
    if (modalContainer == null) {
        modalContainer = document.createElement("div");
        modalContainer.setAttribute("class", "modal_container");
        modalContainer.innerHTML = `<div class="input_container">
        <textarea class="modal_input" 
        placeholder="Enter Your text"></textarea>
    </div>
    <div class="modal_filter_container">
        <div class="filter pink"></div>
        <div class="filter blue"></div>
        <div class="filter green"></div>
        <div class="filter black"></div>
    </div>`;
        body.appendChild(modalContainer);
        handleModal(modalContainer);
    }
    let textarea = modalContainer.querySelector(".modal_input");
    textarea.value = "";

    //  event listner 
}

//handle activity on madal
function handleModal(modal_container) {
    let cColor = "black"
    let modalFilter = document.querySelectorAll(".modal_filter_container .filter");
    //  modalFilter[3].setAttribute("class","border");
    // remove prev attr and add new attr
    // we can not add setAttribute(); cuz it will take only that class element's property 
    // which will have in this setAttribute function all property will remove automatically
    modalFilter[3].classList.add("border");
    for (let i = 0; i < modalFilter.length; i++) {
        modalFilter[i].addEventListener("click", function () {
            modalFilter.forEach((filter) => {
                filter.classList.remove("border");//remove setattr(border) on prev color
            })
            modalFilter[i].classList.add("border");//add attr(border) on all color
            //To get color 
            cColor = modalFilter[i].classList[1];
            console.log("Current color of task", cColor);

        })
    }
    let textArea = document.querySelector(".modal_input");
    textArea.addEventListener("keydown", function (e) {
        if (e.key == "Enter") {
            console.log("task ", textArea.value, "Current Color ", cColor);
            modal_container.remove();
            // create Taskbox
            createTask(cColor, textArea.value, true);

        }
    })

}

function createTask(color, task, flag, id) {
    let taskContainer = document.createElement("div");
    let uifn = new ShortUniqueId();
    let uid = id || uifn();

    taskContainer.setAttribute("class", "task_container");
    taskContainer.innerHTML = `<div class="task_filter ${color}">
        </div>
    <div class="task_desc_container">
    
        <h3 class="uid">#${uid}</h3>
        <div class="task_desc">${task}</div>
        <div class="lock">
                <i class="fas fa-lock"></i>
            </div>
    </div>`;

    mainContainer.appendChild(taskContainer);
    let taskFilter = taskContainer.querySelector(".task_filter");
    let allTicket = document.querySelectorAll(".task_container");

    FilterContainer.addEventListener("click", function () {
        // let allTaskContainer = document.querySelectorAll(".task_container");
        allTicket.forEach(allcards => {
            allcards.style.display = "block";
        });
    })

    for (let i = 0; i < colorBtn.length; i++) {
        colorBtn[i].addEventListener("click", function () {
            let color = colorBtn[i].classList[1];
            allTicket.forEach(cards => {
                if (cards.children[0].classList[1] == color) {
                    console.log(cards.children[0].classList[1])
                    cards.style.display = "block";
                } else {
                    cards.style.display = "none";
                }
            });
        })
    }

    if (flag == true) {
        let obj = { "task": task, "id": `${uid}`, "color": color }
        taskArr.push(obj);
        let finalArr = JSON.stringify(taskArr);
        localStorage.setItem("allTask", finalArr)
    }
    taskFilter.addEventListener("click", changeColor);

    taskContainer.addEventListener("click", deleteTask);

    deleteBtn.addEventListener("click", deleteAllCards);
    let editTask = document.querySelector(".task_desc");
    editTask.addEventListener("keyup", editText);

    let lockBtn = taskContainer.querySelector(".fa-lock");
    lockBtn.addEventListener("click", function (e) {
        let lockFeature = taskContainer.querySelector(".task_desc");
        let lockBtn = e.currentTarget;
        let parent = lockBtn.parentNode;
        if (!parent.classList.contains("active")) {
            // console.log(parent.classList);
            parent.classList.add("active"); 
            lockFeature.contentEditable = "true";
        } else {
            // console.log(parent.classList);
            parent.classList.remove("active");
            lockFeature.contentEditable = "false";
        }
    });
}

themeBox.addEventListener("click", function (e) {
    // let themeBtn = e.currentTarget;
    // let parent = themeBtn.parentNode;
    if (lightTheme == false) {
        themeBox.children[0].classList.add("fa-moon");
        themeBox.children[0].classList.remove("fa-sun");

        navbar.style.backgroundColor = "#778ca3";
        mainContainer.style.backgroundColor = "#353b48";
        // iconContainer.style.backgroundColor = "#dfe6e9";
        // console.log(parent.classList);
        lightTheme = true;
    } else {
        themeBox.children[0].classList.add("fa-sun");
        themeBox.children[0].classList.remove("fa-moon");

        navbar.style.backgroundColor = "#2d3436";
        mainContainer.style.backgroundColor = "#ecf0f1";
        lightTheme = false;
        // console.log(parent.classList);
    }
})

function changeColor(e) {
    let taskFilter = e.currentTarget;
    let colors = ["pink", "blue", "green", "black"];
    let cColor = taskFilter.classList[1];
    let idx = colors.indexOf(cColor);
    let newColorIdx = (idx + 1) % 4;
    taskFilter.classList.remove(cColor);
    taskFilter.classList.add(colors[newColorIdx]);
}

function setDeleteState(e) {

    let crossBtn = e.currentTarget;
    let parent = crossBtn.parentNode;
    // console.log(crossBtn.parent);
    if (deleteState == false) {
        parent.classList.add("active");
    } else {
        parent.classList.remove("active");
    }
    deleteState = !deleteState;
}

function deleteTask(e) {
    let taskContainer = e.currentTarget;
    if (deleteState) {
        taskContainer.remove();
        // localStorage.remove();
    }
}

function deleteAllCards() {
    let allTasks = document.querySelectorAll(".task_container");
    allTasks.forEach(tasks => {
        tasks.remove();
        localStorage.clear();
    });
}


function editText(e) {
    let taskDesc = e.currentTarget;
    let uidElem = taskDesc.parentNode.children[0];
    let uId = uidElem.innerText.split("#")[1];
    for (let i = 0; i < taskArr.length; i++) {
        let {id} = taskArr[i];
        if (uId == id) {
            taskArr[i].task = taskDesc.innerText;
            let finalTaskArr = JSON.stringify(taskArr);
            // console.log(finalTaskArr);
            localStorage.setItem("allTask",finalTaskArr)
        }
    }
}
