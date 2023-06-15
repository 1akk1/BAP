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
    
    
    // showing Newuser on website
    const newUser = document.createElement('li');
    newUser.className = 'list-group-items';
    newUser.appendChild(document.createTextNode(`${name}-${email}-${phone}`));
    users.appendChild(newUser)
    
    // adding delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-sm float-middle delete';
    deleteBtn.appendChild(document.createTextNode('Delete'));
    newUser.appendChild(deleteBtn);


    // adding edit button
    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-sm float-middle edit';
    editBtn.appendChild(document.createTextNode('Edit'));
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
        .post('https://crudcrud.com/api/cfff921b0d63430eb690925ded47a702/saveData',{
            name : name,
            email : email,
            phone : phone,
        })
        form.reset();
}
// Get request
window.addEventListener("DOMContentLoaded", () => {
    axios
        .get('https://crudcrud.com/api/cfff921b0d63430eb690925ded47a702/saveData')
        .then(response => {
            console.log(response)
            for(var i=0;i<response.data.length;i++){
                console.log(response.data[i]);
            }
        })
        .catch(error => {
            console.error(error)
        })
})

