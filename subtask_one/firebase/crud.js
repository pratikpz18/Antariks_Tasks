const dbName = "antariks-default-rtdb";
// Firebase Realtime Database Initialization
const database = firebase.database();

// Function to add data to the database
function addData() {
  try {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    if (validateAndDisplayErrors(name, age)) {
      return;
    }
    database.ref(dbName).push({
      name: name,
      age: age,
    });
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
  } catch (error) {
    displayErrorMessage(error.message);
  }
}

// Function to update data in the database
function updateData(key, newData) {
  try {
    database.ref(dbName).child(key).update(newData);
  } catch (error) {
    displayErrorMessage(error.message);
  }
}

// Function to delete data from the database
function deleteData(key) {
  try {
    database.ref(dbName).child(key).remove();
  } catch (error) {
    displayErrorMessage(error.message);
  }
}

// Function to display data in the table
function displayData() {
  try {
    const dataBody = document.getElementById("dataBody");
    database.ref(dbName).on("value", (snapshot) => {
      dataBody.innerHTML = "";
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        const data = childSnapshot.val();
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${data.name}</td>
            <td>${data.age}</td>
            <td>
                <button class="btn btn-outline-info" onclick="editData('${key}', '${data.name}', '${data.age}')">Edit</button>
                <button class="btn btn-outline-danger" onclick="deleteData('${key}')">Delete</button>
            </td>
        `;
        dataBody.appendChild(row);
      });
    });
  } catch (error) {
    displayErrorMessage(error.message);
  }
}

// Function to edit data
function editData(key, name, age) {
  try {
    document.getElementById("name").value = name;
    document.getElementById("age").value = age;
    const addButton = document.getElementById("addDataButton");
    addButton.innerHTML = "Update Data";
    addButton.onclick = function () {
      const newName = document.getElementById("name").value;
      const newAge = document.getElementById("age").value;
      if (validateAndDisplayErrors(newName, newAge)) {
        return;
      }
      const newData = { name: newName, age: newAge };
      updateData(key, newData);
      document.getElementById("name").value = "";
      document.getElementById("age").value = "";
      addButton.innerHTML = "Add Data";
      addButton.onclick = addData;
    };
  } catch (error) {
    displayErrorMessage(error.message);
  }
}

// Function to validate and display specific error messages
function validateAndDisplayErrors(name, age) {
  if (!name && !age) {
    displayErrorMessage("Name and Age are required.");
    return true;
  } else if (!name && age) {
    displayErrorMessage("Name is required.");
    return true;
  } else if (!age) {
    displayErrorMessage("Age is required.");
    return true;
  }
  return false;
}

// Function to display error message to the user
function displayErrorMessage(message) {
  const div = document.getElementById("alertBox");
  div.innerHTML = `<div class="alert alert-danger" role="alert" aria-hidden="true">${message}</div>`;
  setTimeout(() => {
    div.innerHTML = "";
  }, 1000);
}

// Loads data on page load
window.addEventListener("load", displayData);
