
function loadUsers() {
  const url = 'users.json'; 
  let userData = []; 
  let sortOrder = {}; 

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      userData = data.users; 
      displayUsers(userData); 
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });

  function displayUsers(users) {
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = '';

    users.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td><button class="deleteButton">Удалить</button></td> 
      `;
      tableBody.appendChild(row);

      const deleteButton = row.querySelector('.deleteButton');
      deleteButton.addEventListener('click', () => {
        deleteUser(user.id); 
      });
    });
  }

  function deleteUser(userId) {
    const userIndex = userData.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
      userData.splice(userIndex, 1);
      displayUsers(userData);
    }
  }

  function sortUsers(column) {
    if (!sortOrder[column] || sortOrder[column] === 'desc') {
      userData.sort((a, b) => String(a[column]).localeCompare(String(b[column])));
      sortOrder[column] = 'asc';
    } else {
      userData.sort((a, b) => String(b[column]).localeCompare(String(a[column])));
      sortOrder[column] = 'desc';
    }
    console.log('Sorting by ID');
    displayUsers(userData);
  }

  function addSortHandler(columnId, columnName) {
    const header = document.getElementById(columnId);
    header.addEventListener('click', () => sortUsers(columnName));
  }

  addSortHandler('sortById', 'id');
  addSortHandler('sortByFirstName', 'firstName');
  addSortHandler('sortByLastName', 'lastName');
  addSortHandler('sortByEmail', 'email');
  addSortHandler('sortByPhone', 'phone');

}

loadUsers();


