// DOM
let tbody = document.querySelector("tbody");

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
export let getData = (table) => {
  table.each((taskObj) => {
    let tr = document.createElement("tr");

    let tdTask = document.createElement("td");
    let tdPrio = document.createElement("td");
    let tdDate = document.createElement("td");
    let tdTime = document.createElement("td");
    let tdUpDe = document.createElement("td");

    tdTask.innerHTML = taskObj.task;
    tdTask.setAttribute('id', 'td-task')
    tdPrio.innerHTML = taskObj.priority;
    tdDate.innerHTML = taskObj.date;
    tdTime.innerHTML = taskObj.time;
    tdUpDe.innerHTML = `<i class="far fa-edit"></i>`;
    tdUpDe.innerHTML += `<i class="fas fa-trash-alt"></i>`;

    tbody.appendChild(tr);
    tr.appendChild(tdTask);
    tr.appendChild(tdPrio);
    tr.appendChild(tdDate);
    tr.appendChild(tdTime);
    tr.appendChild(tdUpDe);
  });
};
