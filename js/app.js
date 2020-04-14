import { createDB, sendData, getData } from "./module.js";

//DOM
let form = document.querySelector("form");

let showAddForm = document.querySelectorAll(".ml-auto");
let myModal = document.querySelector("#my-modal");
let cancel = document.querySelector("#my-btn-cancel");

//input
let task = document.querySelector("#task");
let priority = document.querySelector("#priority");
let date = document.querySelector("#date");
let time = document.querySelector("#time");

// create/open new db
let myDB = createDB("dailyPlanner", {
  dTask: `++id, task, priority, date, time`,
});


// add data to db
form.addEventListener("submit", (event) => {
  event.preventDefault();

  sendData(myDB.dTask, {
    task: task.value,
    priority: priority.value,
    date: date.value,
    time: time.value,
  });

  myModal.style.display = "none";
  form.reset();
  location.reload();
});

// get data from db
getData(myDB.dTask);

showAddForm.forEach((event) => {
  event.addEventListener("click", () => {
    console.log("sas");
    myModal.style.display = "block";
  });
});

cancel.addEventListener("click", (event) => {
  event.preventDefault();
  form.reset();
  myModal.style.display = "none";
});
