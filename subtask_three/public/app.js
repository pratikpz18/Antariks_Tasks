// Function to add data
function addData() {
  const dataInput = document.getElementById("dataInput");
  const data = dataInput.value;

  if (data.length == 0) {
    displayErrorMessage("Please Enter Value");
    return;
  }
  
  fetch("/api/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Data added successfully:", data);
      dataInput.value = "";
      fetchData();
    })
    .catch((error) => {
      console.error("Error adding data:", error);
      displayErrorMessage(error.message);
    });
}

// Function to fetch data
function fetchData() {
  fetch("/api/data")
    .then((response) => response.json())
    .then((data) => {
      console.log("Fetched data:", data);
      updateDataList(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      displayErrorMessage(error.message);
    });
}

// Function to update the data list in the UI
function updateDataList(data) {
  const dataListElement = document.getElementById("dataList");
  dataListElement.innerHTML = "";
  data.forEach((item) => {
    const listItem = document.createElement("div");
    listItem.textContent = item.data;
    dataListElement.appendChild(listItem);
  });
}

// Function to display error message to the user
function displayErrorMessage(message) {
  const div = document.getElementById("alertBox");
  div.innerHTML = `<div class="alert alert-danger" role="alert" aria-hidden="true">${message}</div>`;
  setTimeout(() => {
    div.innerHTML = "";
  }, 1000);
}
