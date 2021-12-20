

document.querySelector("#list_Add_Btn_1").addEventListener("click", function () {
    document.querySelector("#backGround").style.filter = "blur(15px)";
    document.querySelector(".container").style.pointerEvents = "none";
    document.querySelector("#dispay_List_Modal").classList.add("active");
});


document.querySelector("#list_Add_Btn_2").addEventListener("click", function () {
    document.querySelector("#backGround").style.filter = "blur(15px)";
    document.querySelector(".container").style.pointerEvents = "none";
    document.querySelector("#dispay_List_Modal").classList.add("active");
});


document.querySelector("#list_Back_Btn").addEventListener("click", function () {
    document.querySelector("#backGround").style.filter = "none";
    document.querySelector(".container").style.pointerEvents = "all";
    document.querySelector("#dispay_List_Modal").classList.remove("active");
});



const createListTitle = document.querySelector("#create_ListTitle");
const createList = document.querySelector("#create_List");
const listContainer = document.querySelector("#list_Container");
let listBox = [];

create_ListTitle.onkeypress = () => {
    if (createListTitle.value.trim() != 0) {
        createList.classList.add("active"); 
    }
}


createList.onclick = () => {
    let userData = createListTitle.value; 

    const list = {
        id: Date.now(),    
        name: userData,    
        subTask: []
    }

    listBox.push(list);
    
    addList(); 
    createNewTask();

    createList.classList.remove("active"); 
    createListTitle.value = ""; 

    document.querySelector("#backGround").style.filter = "none";
    document.querySelector(".container").style.pointerEvents = "all";
    document.querySelector("#dispay_List_Modal").classList.remove("active");

}



function addList() {
    let newListTag = '';
    listBox.forEach(element => {
        newListTag += `
        <div class="list-box" id="${element.id}">
            <p class="list-heading">
                <span>${element.name}</span>
            </p>
            <hr>
            <ul class="items-container" id="${'id' + element.id}"></ul>
            <span class="list-tools">
                <span onclick="addTask(${element.id})">
                <i class="fas fa-plus-circle"></i>
                </span>
                <span onclick="deleteList(${element.id})">
                    <i class="fas fa-trash-alt"></i>
                </span>
            </span>
        </div>`;
    });
    listContainer.innerHTML = newListTag; 
}

addList(); 

function deleteList(id) {
    listBox.forEach((element, index) => {
        if (element.id === id) {
            listBox.splice(index, 1);
        }
    });
    addList();
    createNewTask();
}


function addTask(id) {

    listBox.forEach(element => {
        if(element.id === id) {
            document.querySelector("#backGround").style.filter = "blur(15px)";
            document.querySelector(".container").style.pointerEvents = "none";
            document.querySelector("#display_Task_Modal").classList.add("active");

            const taskTitle = document.querySelector("#create_TaskTitle");
            const createTask = document.querySelector("#create_Task");

            taskTitle.onkeypress = () => {
                if(taskTitle.value.trim() != 0) {
                    createTask.classList.add("active");
                }
            }

            createTask.onclick = () => {
                let userTask = taskTitle.value;
                
                listBox.forEach((element, index) => {
                    if(element.id === id) {
                        const task ={
                            taskID : Date.now(),
                            taskName : userTask
                        }
                        listBox[index].subTask.push(task);
                    }
                });
                createNewTask();
                
                createTask.classList.remove("active");
                taskTitle.value = ""; 
                
                document.querySelector("#backGround").style.filter = "none";
                document.querySelector(".container").style.pointerEvents = "all";
                document.querySelector("#display_Task_Modal").classList.remove("active");
            }
        }
    });
    
    document.querySelector("#task_Back_Btn").onclick = () => {
        document.querySelector("#backGround").style.filter = "none";
        document.querySelector(".container").style.pointerEvents = "all";
        document.querySelector("#display_Task_Modal").classList.remove("active");
    
    }
}

function createNewTask() {
    listBox.forEach(element => {
        let taskContainer = document.getElementById('id' + element.id);
        let newTaskTag = '';
        element.subTask.forEach(task => {
            newTaskTag += `
            <li>
                <span class="task-name" id="${'tid' + task.taskID}">${task.taskName}</span>
                <i class="fas fa-check" id="${'iid' + task.taskID}" onclick=strikeOff(${task.taskID})></i>
            </li>`;
        })
        taskContainer.innerHTML = newTaskTag;
    })
}


function strikeOff(id) {
    listBox.forEach(element => {
        element.subTask.forEach(task => {
            if(task.taskID === id) {
                document.getElementById('tid' + task.taskID).style.textDecoration = "line-through";
                document.getElementById('iid' + task.taskID).style.visibility = "hidden";
            }
        })
    });
}


