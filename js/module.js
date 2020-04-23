// DOM
let tbody = document.querySelector("tbody");
let form = document.querySelector('form')

//create db
export const createDB = (dbName, tableName) => {
  const db = new Dexie(dbName);
  db.version(1).stores(tableName);
  db.open();
  return db;
};

//add to db
export const sendData = (table, data) => {
  if (
    data.task == "" ||
    data.priority == "" ||
    data.date == "" ||
    data.time == ""
  ) {
    alert("Please add all info...");
  } else {
    table.bulkAdd([data]);
  }
};

// get data from db
export const renderTask = (db) => {
  db.each((taskObj) => {
    let tr = document.createElement("tr");
    tr.setAttribute("id", taskObj.id);

    let tdTask = document.createElement("td");
    let tdPrio = document.createElement("td");
    let tdDate = document.createElement("td");
    let tdTime = document.createElement("td");
    let tdUpDe = document.createElement("td");

    tdTask.innerHTML = taskObj.task;
    tdTask.setAttribute("id", "td-task");
    tdPrio.innerHTML = taskObj.priority;
    tdDate.innerHTML = taskObj.date;
    tdTime.innerHTML = taskObj.time;
    tdUpDe.innerHTML = `<i id="edit-task" class="far fa-edit"></i>`;
    tdUpDe.innerHTML += `<i id="delete-task" class="fas fa-trash-alt"></i>`;

    tbody.appendChild(tr);
    tr.appendChild(tdTask);
    tr.appendChild(tdPrio);
    tr.appendChild(tdDate);
    tr.appendChild(tdTime);
    tr.appendChild(tdUpDe);
  });
};

// update task
export const renderDataForUpdate = (db, id) => {
  let taskId = parseInt(id);
  localStorage.setItem('id', taskId)
  db.get(taskId, (data) => {
    form.task.value = data.task
    form.priority.value = data.priority
    form.date.value = data.date
    form.time.value = data.time
  });
};

export const updateTask = (db, id) => {
  db.update(parseInt(id), {
    task: form.task.value,
    priority: form.priority.value,
    date: form.date.value,
    time:form.time.value,
  })
};

// delete task
export const deleteTask = (db, id) => {
  let taskId = parseInt(id);
  db.delete(taskId)
};
