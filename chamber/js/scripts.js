//Display the date
let today = new Date();
let weekday = today.getDay();
let day = today.getDate();
let month = today.getMonth(); 
let year = today.getFullYear();

let dayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Firday", "Saturday"];
let monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let dayName = dayList[weekday];
let montName = monthList[month];

let date = document.getElementById("date");
date.innerHTML = `${dayName}, ${day} ${montName} ${year}`

//Display the Footer
let footer = document.getElementById("footer2");
footer.innerHTML = `WDD 230 Project | Last updated: ${document.lastModified}`;

//Toggle Menu
function toggleMenu() {
    document.getElementById("primaryNav").classList.toggle("open");
    document.getElementById("hamburgerBtn").classList.toggle("open");
}

const x = document.getElementById("hamburgerBtn");
x.onclick = toggleMenu;