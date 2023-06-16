// getting form and userlist 
const users = document.getElementById("users");
const form = document.getElementById("form");

// adding event listener to submit button
form.addEventListener('submit' , addUser);

function addUser(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    
    
    // showing NewUser on website
    const newUser = document.createElement('li');
    newUser.className = 'list-group-items';
    newUser.appendChild(document.createTextNode(`${name}-${email}-${phone}`));
    users.appendChild(newUser)
    
    // adding delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-sm float-middle delete';
    deleteBtn.appendChild(document.createTextNode('DeleteUser'));
    newUser.appendChild(deleteBtn);


    // adding edit button
    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-sm float-middle edit';
    editBtn.appendChild(document.createTextNode('EditUser'));
    newUser.appendChild(editBtn)

    // add event listeners to button
    deleteBtn.addEventListener('click',()=>{
        newUser.remove();
    })
    
    editBtn.addEventListener('click', () => {
        document.getElementById('name').value = name;
        document.getElementById('email').value = email;
        document.getElementById('phone').value = phone;
        newUser.remove();

    })

    // Saving data to backend
    axios
        .post('https://crudcrud.com/api/6783ee1690e44a34931e4d9223861cb4/saveData',{
            name : name,
            email : email,
            phone : phone,
        })
        form.reset();
}
// Get request
window.addEventListener("DOMContentLoaded", () => {
    axios
        .get('https://crudcrud.com/api/6783ee1690e44a34931e4d9223861cb4/saveData')
        .then(response => {
            response.data.forEach(user => {
                showUsersOnScreen(user);

            })            
        })
        .catch(error => {
            console.error(error)
        })
})
// function to show backend data on UI
function showUsersOnScreen(user){
    const names =  user.name;
    const emails = user.email;
    const phones = user.phone;

    const newUsers = document.createElement('li');
    newUsers.className = 'list-group-items';
    newUsers.appendChild(document.createTextNode(`${names}-${emails}-${phones}`));
    users.appendChild(newUsers);

    // delete button for backend data
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-sm float-middle delete';
    deleteBtn.appendChild(document.createTextNode('DeleteUser'));
    newUsers.appendChild(deleteBtn);


    // adding edit button for backend data
    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-sm float-middle edit';
    editBtn.appendChild(document.createTextNode('EditUser'));
    newUsers.appendChild(editBtn)

    // add event listeners to button
    deleteBtn.addEventListener('click',()=>{
        newUsers.remove();
    }) 
    editBtn.addEventListener('click', () => {
        document.getElementById('name').value = names;
        document.getElementById('email').value = emails;
        document.getElementById('phone').value = phones;
        newUsers.remove();

    })
}