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


//Message that appears on Mondays and Tuesdays
let message
if (weekday === 1 || weekday === 2) {
    message = "🤝🏼 Come join us for the chamber meet and greet Wednesday at 7:00 p.m.";
}
document.querySelector('#message').textContent = message;

//Lazy Images
const imagesToLoad = document.querySelectorAll('img[data-src]');

const imgOptions = {
    threshold: 0,
    rootMargin: "0px 0px 50px 0px"
};

const loadImages = (image) => {
  image.setAttribute('src', image.getAttribute('data-src'));
  image.onload = () => {
    image.removeAttribute('data-src');
  };
};

if('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((items, observer) => {
      items.forEach((item) => {
        if(item.isIntersecting) {
          loadImages(item.target);
          observer.unobserve(item.target);
        }
      });
    }, imgOptions);
    imagesToLoad.forEach((img) => {
      observer.observe(img);
    });
  } else {
    imagesToLoad.forEach((img) => {
      loadImages(img);
    });
  }

  //Days between visits
  let time = today.getTime();
  let timeStored;
  if(!localStorage.getItem('nbrOfDays')) {
    AddToStorage();
  } else {
      TimeBetween();
      AddToStorage();
  }

  function AddToStorage() {
    localStorage.setItem('nbrOfDays', time);
  }

  function TimeBetween() {
    let timeBtwn = time - localStorage.getItem('nbrOfDays');
    let DaysNbr = Math.round(timeBtwn/(24*3600*1000));
    let last_visit = document.getElementById("last_visit");
    last_visit.innerHTML = `Last visit: ${DaysNbr} day(s)`;
  }
  
 