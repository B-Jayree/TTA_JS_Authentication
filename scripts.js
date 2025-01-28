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

document.addEventListener('DOMContentLoaded', () => {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
        displayContent(savedRole);
    }
});

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
            localStorage.setItem('userRole', user.role);
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

    const roleContent = {
        admin: {
            heading: 'Welcome Admin',
            description: 'You have access to manage all data and settings'
        },
        editor: {
            heading: 'Welcome Editor',
            description: 'You have access to edit content'
        },
        viewer: {
            heading: 'Welcome Viewer',
            description: 'You have access to view content'
        }
    };

    if (roleContent[role]) {
        contentDiv.innerHTML = `
        <h2>${roleContent[role].heading}</h2>
        <p>${roleContent[role].description}</p>`;
    }

    const logoutButton = document.createElement('button');
    logoutButton.textContent = 'Logout';
    logoutButton.classList.add('logout-button');
    logoutButton.addEventListener('click', logout);

    contentDiv.appendChild(logoutButton);
    document.body.appendChild(contentDiv);
}

const logout = () => {
    localStorage.removeItem('userRole');
    const contentDiv = document.querySelector('.content');
    if (contentDiv) contentDiv.remove();
    const loginContainer = document.querySelector('.login-container');
    loginContainer.style.display = 'block';
};
