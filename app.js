let user = {
    name:'Your Name',
    gender:'Choose Gender',
    age:'Your Age',
    college:'RICIS',
    dept:'BCA',
    sem:'III'
};
let userString = localStorage.getItem('userString');
if (!userString) {
    localStorage.setItem('userString', JSON.stringify(user));
} else {
    user = JSON.parse(userString)
}

for (let key in user) {
    let el = document.getElementById(key);
    if (el) el.textContent = user[key]; // populate HTML from user object
}

let editButtons = document.querySelectorAll('.edit-profile-detail-value-btn');
editButtons.forEach((button)=>{
    button.addEventListener('click',()=>{
        let id = button.getAttribute("data-field");
        changetext(id);
        updateLocalStorage();
        /*Home page wlcm msg*/
        document.querySelector('#wlcm-msg').textContent = `hello ${user.name}`;
        
    });
});

/*Home page wlcm msg*/
let wlcmMsg = document.querySelector('#wlcm-msg');
if ((user.gender).toLowerCase() === 'male') {
    wlcmMsg.textContent = `Hi 😎 Mr.${user.name}`;
} else if ((user.gender).toLowerCase() === 'female') {
    wlcmMsg.textContent = `Hi 😎 Mrs.${user.name}`;
} else {
    wlcmMsg.textContent = `Hi 😎 ${user.name}`;
}
//added
/*
let ProfileInfoResetBtn = document.getElementById('reset-profile-info-btn');
ProfileInfoResetBtn.addEventListener('click', ()=>{
    localStorage.removeItem('userString');

    user = {
        name:'Your Name',
        gender:'Choose Gender',
        age:'Your Age',
        college:'RICIS',
        dept:'BCA',
        sem:'III'
    };
    updateLocalStorage();
    for (let key in user) {
    let el = document.getElementById(key);
    if (el) el.textContent = user[key]; // populate HTML from user object

    // update welcome message
    let wlcmMsg = document.querySelector('#wlcm-msg');
    wlcmMsg.textContent = `Hi 😎 ${user.name}`;
}

});
*/
//till here
function updateLocalStorage () {
    localStorage.setItem('userString',JSON.stringify(user));
}

function changetext(id) {
    let currVal = prompt(`Enter ${id}`);
    if (currVal === null || currVal.trim() === "") {
        return;
    }
    document.querySelector(`#${id}`).textContent = currVal;
    updateUser(id, currVal);
}

function updateUser (id, currVal) {
    let property = id.toLowerCase();
    if (user.hasOwnProperty(property)) {
        user[property] = currVal
    }
}
/*--------------------------home page------------------------------*/
