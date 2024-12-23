const input = document.getElementById("adding");
const unorderlist = document.getElementById("listing");

//message box
const box = document.getElementById("messageBox");
function showMessage(message) {
    box.textContent = message;
    box.style.display = 'block';
    setTimeout(() => {
        messageBox.style.display = 'none';
    }, 2000); 
};

//add new item
function addTask(task) {
    let item = document.createElement("li");
    item.innerHTML = task;

    let cross = document.createElement("span");
    let edit = document.createElement("span");
    edit.innerHTML = "&#9998;";
    edit.classList.add("edit");
    cross.innerHTML = "&#10060;";
    cross.classList.add("remove");

    item.appendChild(cross);
    item.appendChild(edit);
    unorderlist.appendChild(item);

    showMessage("The Task Added successfully!");
}
document.getElementById('addItem').addEventListener('click', function () {
    if (input.value === '') {
        alert("Please Add Your Task !");
    } else {
        addTask(input.value);
        input.value = "";
        saveData();
    }
});
document.getElementById('adding').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('addItem').click();
    }
});

unorderlist.addEventListener("click", function (e) {
    //done
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
    //delete
    else if (e.target.classList.contains("remove")) {
        e.target.parentElement.remove();
        saveData();
        showMessage("The Task Removed Successfully!");
    }
    else if (e.target.classList.contains("edit")) {
        const listItem = e.target.parentElement;
        const pastText = listItem.firstChild.textContent.trim();
        editTask(listItem, pastText);
        
    }

}, false);

//edit
function editTask(listItem, pastText) {
   
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = pastText;
    inputField.classList.add("editInput");

    listItem.innerHTML = "";
    listItem.appendChild(inputField);

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.classList.add("saveButton");
    listItem.appendChild(saveButton);

    saveButton.addEventListener("click", function () {
        const newTask = inputField.value.trim();
        if (newTask) {
            listItem.innerHTML = newTask;
            let cross = document.createElement("span");
            let edit = document.createElement("span");
            edit.innerHTML = "&#9998;";
            edit.classList.add("edit");
            cross.innerHTML = "&#10060;";
            cross.classList.add("remove");
            listItem.appendChild(cross);
            listItem.appendChild(edit);
            saveData();
            showMessage("The Task Edited Successfully!");
        } else {
            alert("Please enter a valid task!");
        }
    });
}



//local storage

function saveData() {
    localStorage.setItem("data", unorderlist.innerHTML);
}

function display() {
    unorderlist.innerHTML = localStorage.getItem("data") || "" ;
}

display();

