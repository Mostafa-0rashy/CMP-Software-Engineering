function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.setAttribute('data-id', item.id);
        deleteButton.addEventListener('click', function() {
          deleteEmployee(item.id);
        });
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button
document.getElementById("employeeForm").addEventListener("submit", function(event) {
  event.preventDefault();
  createEmployee();
});




// TODO
// add event listener to delete button


// TODO
function createEmployee (){
  // get data from input field
  const idInput = document.getElementById("id").value;
const nameInput = document.getElementById("name").value;
  // send data to BE
  fetch("http://localhost:3000/api/v1/employee", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: idInput, name: nameInput }),
  })
    .then(response => response.json())
    // call fetchEmployees
    .then(() => fetchEmployees()) // Refresh table
    .catch(error => console.error(error));
  
}

// TODO
function deleteEmployee(id) {
  console.log("Attempting to delete employee with ID:", id); // Debugging
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(() => fetchEmployees()) 
    .catch(error => console.error("Error deleting employee:", error));
}


fetchEmployees()
