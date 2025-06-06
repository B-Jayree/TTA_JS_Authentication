const users = [
    {
        username: 'admin',
        password: 'admin123',
        role: 'admin'
    },
    {
        username: 'editor',
        password: 'editor123',
        role: 'editor'
    },
    {
        username: 'viewer',
        password: 'viewer123',
        role: 'viewer'
    }
];
const saveCurrentUser = (userName, role) => {
    localStorage.setItem('currentUser', JSON.stringify((userName, role)));
}
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('currentUser'));
}
const clearCurrentUser = () => {
localStorage.removeItem('currentUser')
}
 document.addEventListener('DOMContentLoaded', () =>{
   const currentUser = getCurrentUser();
   if(currentUser){
    displayContent(currentUser.role);
   }
 })

const loginform = document.querySelector('#loginform');
loginform.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.querySelector('#userName').value.trim();
    const password = document.querySelector('#password').value.trim();
    const errorContainer = document.querySelector('#errorMessage');
    const successContainer = document.querySelector('#successMessage');
    if (!username || !password) {
        errorContainer.textContent = 'Please fill in all fields';
        successContainer.textContent = '';  // Clear success message
    } else {
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            errorContainer.textContent = '';  // Clear error message
            successContainer.textContent = `Welcome ${user.role}`;
            saveCurrentUser(user.username,user.role);
            displayContent(user.role);
        } else {
            errorContainer.textContent = 'Invalid username or password';
            successContainer.textContent = '';  // Clear success message
        }
    }
});
function displayContent(role) {
    const loginContainer = document.querySelector('.login-container');
    loginContainer.style.display = 'none';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'content';

      if (role === 'admin'){
        contentDiv.innerHTML =
         `<h1>Welcome ${role}</h1>
         <button onclick='displayUserManagement()'>Manage Users</button>
`
      } else if (role === 'editor'){
        contentDiv.innerHTML =
         `<h1>Welcome ${role}</h1>
         <p>You have access to edit content</p>
          <button>View</button>
         <button>Edit</button>
         <button>Delete</button>`
      } else if (role === 'viewer'){
        contentDiv.innerHTML = 
        `<h1>Welcome ${role}</h1>
        <p>You have access to view content</p>
         <button>View</button>
         <button>Edit</button>`
      } 
      const logoutButton = document.createElement('button');
      logoutButton.textContent = 'Logout';
      logoutButton.classList.add('logout-button');
      logoutButton.addEventListener('click', logout);
      contentDiv.appendChild(logoutButton);
      document.body.appendChild(contentDiv);
    };
    const displayUserManagement = () => {
        const userManagementDiv = document.createElement('div');
        userManagementDiv.className = 'user-management';

        userManagementDiv.innerHTML = '<h2>User Management</h2>';
        users.forEach((user, index) => {
            const userDiv = document.createElement('div');
            userDiv.classList.add('user-row');
                userDiv.innerHTML = `
                <span>${user.username}</span>
<select onchange="changeRole(${index}, this.value)" >
    <option value="admin" ${user.role === 'admin' ? 'seleted' : ''}>Admin</option>
    <option value="editor" ${user.role === 'editor' ? 'seleted' : ''}>Editor</option>
    <option value="viewer" ${user.role === 'viewer' ? 'seleted' : ''}>Viewer</option>
</select>
                `
                 userManagementDiv.appendChild(userDiv);
        })
        document.body.appendChild(userManagementDiv);
    }
    changeRole = (index, newRole) => {
        users[index].role = newRole;
        alert(`User ${users[index].username} role has changed to ${newRole}`);
    }
    const logout = () => {
        clearCurrentUser();
        location.reload()
    }