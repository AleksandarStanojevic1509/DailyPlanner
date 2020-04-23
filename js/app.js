import {
  createDB,
  sendData,
  renderTask,
  renderDataForUpdate,
  updateTask,
  deleteTask,
} from "./module.js";

//DOM
const form = document.querySelector("form");
const submitBtn = document.getElementById("btn-submit");
const cancelBtnHandler = document.getElementById("btn-cancel");
const deleteAllHandler = document.getElementById("btn-delete-all");
const updateBtnHendler = document.getElementById("btn-update");
const showFormHandler = document.querySelectorAll(".ml-auto");
const submitModal = document.getElementById("submit-modal");
const listBtnHandler = document.querySelector("table");
const yes = document.getElementById("yes");
const cancel = document.getElementById("cancel");
const deleteModal = document.getElementById("delete-modal");

//input
const task = document.getElementById("task");
const priority = document.getElementById("priority");
const date = document.getElementById("date");
const time = document.getElementById("time");

// create/open new db
let myDB = createDB("dailyPlanner", {
  dTask: `++id, task, priority, date, time`,
});

// add data to db - (c)rud
form.addEventListener("submit", (event) => {
  event.preventDefault();

  sendData(myDB.dTask, {
    task: task.value,
    priority: priority.value,
    date: date.value,
    time: time.value,
  });

  submitModal.style.display = "none";
  form.reset();
  location.reload();
});

// get data from db - c(r)ud
renderTask(myDB.dTask);

// show form
showFormHandler.forEach((event) => {
  event.addEventListener("click", () => {
    submitModal.style.display = "block";
  });
});

// cancel input form
cancelBtnHandler.addEventListener("click", (event) => {
  event.preventDefault();
  form.reset();
  submitModal.style.display = "none";
  submitBtn.removeAttribute("disabled");
});

// update and delete single task
listBtnHandler.addEventListener("click", (event) => {
  // update
  if (event.target.id == "edit-task") {
    let id = event.target.closest("tr").id;
    renderDataForUpdate(myDB.dTask, id);
    submitBtn.setAttribute("disabled", "true");
    submitModal.style.display = "block";
  }
  // delete task - cru(d)
  else if (event.target.id == "delete-task") {
    let id = event.target.closest("tr").id;

    if ((deleteModal.style.display = "none")) {
      deleteModal.style.display = "block";
      yes.addEventListener("click", () => {
        deleteTask(myDB.dTask, id);
        // event.target.closest("tr").remove();
        location.reload();
        deleteModal.style.display = "none";
      });
      cancel.addEventListener("click", () => {
        deleteModal.style.display = "none";
      });
    }
  }
});

// delete all tasks form db - cru(d)
deleteAllHandler.addEventListener("click", (event) => {
  if ((deleteModal.style.display = "none")) {
    deleteModal.style.display = "block";
    yes.addEventListener("click", () => {
      myDB.delete();
      myDB = createDB("dailyPlanner", {
        dTask: `++id, task, priority, date, time`,
      });
      location.reload();
      deleteModal.style.display = "none";
    });
    cancel.addEventListener("click", () => {
      deleteModal.style.display = "none";
    });
  }
});

// update data from db - cr(u)d
updateBtnHendler.addEventListener("click", (event) => {
  let id = localStorage.getItem("id");
  updateTask(myDB.dTask, id);
  submitBtn.removeAttribute("disabled");
});
