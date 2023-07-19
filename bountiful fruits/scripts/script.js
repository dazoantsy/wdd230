const x = document.getElementById("hamburgerBtn");
const close = document.getElementById("close-menu");
const fruitschossen = (localStorage.getItem('choosenfruits')) ? JSON.parse(localStorage.getItem('choosenfruits')).length : 0;

console.log(localStorage)


x.onclick = toggleMenu;
close.onclick = toggleMenu;

let footer = document.getElementById("footer2");
footer.innerHTML = `WDD 230 Project | Last updated: ${document.lastModified}`;

//Toggle Menu
function toggleMenu() {
    document.getElementById("header").classList.toggle("open");
}

// api
const api = '33d10d1af93744ee827e3ad588f81c74'
const lat = '33.158092';
const lon = '-117.350594';
const units = 'imperial';
const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${api}`
const weather_url_daily = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${api}`
const fruits_url = 'https://brotherblazzard.github.io/canvas-content/fruit.json'
const data3days = [];
const allfruits = [];

async function apiFetch() {
  try {
    const response = await fetch(weather_url);
    const daily_response = await fetch(weather_url_daily);
    const fruitsdata = await fetch(fruits_url);

    if (response.ok) {
      const data = await response.json();
      currentweather(data, '#currentweather', 'Today');
    } else {
        throw Error(await response.text());
    }

    if (daily_response.ok) {
      const data_daily = await daily_response.json();
      let unix3days = [getdatebyday(data_daily.list[0].dt,1), getdatebyday(data_daily.list[0].dt,2), getdatebyday(data_daily.list[0].dt,3)]
      data_daily.list.forEach((day) => {
      	if (unix3days.includes(day.dt)) {
      		data3days.push(day);
      	}  	
      });
      currentweather(data3days[0], '#tomorrowdayweather', 'Tomorrow');
      currentweather(data3days[1], '#twodayweather');
      currentweather(data3days[2], '#threedayweather');
    } else {
        throw Error(await daily_response.text());
    }

    if (fruitsdata.ok) {
      const data = await fruitsdata.json();
      fruitsSelect(data, '.fruits-select');
    } else {
        throw Error(await fruitsdata.text());
    }

  } catch (error) {
      console.log(error);
  }
}
fruitschossenhtmlfun();
function fruitschossenhtmlfun() {
	fruitschossenhtml = document.querySelector('#fruitschossen');
	if (fruitschossenhtml != null) {
		fruitschossenhtml.textContent = fruitschossen;
	}	
}
function getdatebyday(unix, day=1) {
	let date = unix + ((86400)*day)
	return date;
}
function getdatebyunix(unix) {
	let date = new Date(unix * 1000);
	return date.toLocaleDateString('en-US', { weekday: 'long',  month: 'long', day: 'numeric' });
}
function getdate(titme) {
	let date = new Date(titme);
	return date.toLocaleDateString('en-US', { weekday: 'long',  month: 'long', day: 'numeric' });
}
function currentweather(data, selector, date='auto') {
	const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
	const temp = data.main.temp.toFixed(0);
	const desc = data.weather[0].description;
	const humidity = data.main.humidity;	
	const pressure = data.main.pressure;	
	const wind = data.wind.speed;	
	const card = document.querySelector(selector);
	if (card != null) {
		if (date == 'auto') {
			date = getdatebyunix(data.dt);
		}

		let cardContainer = document.createElement('div');
			cardContainer.setAttribute('class', 'card-container');

		let cardHeader = document.createElement('div');
			cardHeader.setAttribute('class', 'card-header');

		let cardDate = document.createElement('div');
			cardDate.setAttribute('class', 'card-date');
			cardDate.textContent = date;

		let cardResume = document.createElement('div');
			cardResume.setAttribute('class', 'card-resume');

		let cardIcon = document.createElement('div');
			cardIcon.setAttribute('class', 'card-icon');

		let img = document.createElement('img');
			img.setAttribute('class', 'img-responsive');
			img.setAttribute('alt', 'card-resume');
			img.setAttribute('src', iconsrc);

		let cardText = document.createElement('div');
			cardText.setAttribute('class', 'card-text');

		let cardTemp = document.createElement('div');
			cardTemp.setAttribute('class', 'card-temp');
			cardTemp.textContent = `${temp}°F`;

		let cardDesc = document.createElement('div');
			cardDesc.setAttribute('class', 'card-desc');
			cardDesc.textContent = desc;

		let cardFooter = document.createElement('div');
			cardFooter.setAttribute('class', 'card-footer');

		let cardWind = document.createElement('div');
			cardWind.setAttribute('class', 'card-wind');
			cardWind.textContent = `Wind speed: ${wind}miles/hour`;

		let cardHumidity = document.createElement('div');
			cardHumidity.setAttribute('class', 'card-humidity');
			cardHumidity.textContent = `Humidity: ${humidity}%`;

		let cardPressure = document.createElement('div');
			cardPressure.setAttribute('class', 'card-pressure');
			cardPressure.textContent = `Pressure: ${pressure}hPa`;

		cardHeader.appendChild(cardDate)
		cardContainer.appendChild(cardHeader)
		cardIcon.appendChild(img)
		cardResume.appendChild(cardIcon)
		cardText.appendChild(cardTemp)
		cardText.appendChild(cardDesc)
		cardResume.appendChild(cardText)
		cardContainer.appendChild(cardResume)
		cardFooter.appendChild(cardWind)
		cardFooter.appendChild(cardHumidity)
		cardFooter.appendChild(cardPressure)	
		cardContainer.appendChild(cardFooter)
		card.appendChild(cardContainer)
	}

}

function fruitsSelect(data,selector) {
	let selects = document.querySelectorAll(selector);
	data.forEach((item, index) => {
		if (selects != null) {
			selects.forEach((select) => {
				let option = document.createElement('option');
					option.setAttribute('value', index);
					option.textContent = item.name;
					select.appendChild(option)
			});
		}
		allfruits[index] = item;
	});
}

apiFetch();

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
function datacolector(form) {
	const formResult = document.querySelector('#form-result')
	let formResultContainer = document.createElement('div');
		formResultContainer.setAttribute('class', 'formResult-container');
	let datafinal = {};
	let choosenfruits = [];
	let carbohydrates = 0;
	let fat = 0;
	let protein = 0;
	let sugar = 0;
	let calories = 0;

	let title = document.createElement('h3');
		title.setAttribute('class', 'formResult-title');
		title.textContent = 'Result: '+getdate(Date.now());

	formResultContainer.appendChild(title);

	let grid = document.createElement('div');
		grid.setAttribute('class', 'grid grid-2 grid-4');

	formResultContainer.appendChild(grid);

	if (localStorage.getItem('choosenfruits')) {
		choosenfruits = JSON.parse(localStorage.getItem('choosenfruits'));
	}
	let datas = new FormData(form)
	datas.forEach((data, index) => {
	  if (data != '') {
	  	datafinal[index] = data;
	  	if (index == 'fruitone' || index == 'fruittwo' || index == 'fruitthree') {
	  		datafinal[index] = allfruits[data];
	  		let p = document.createElement('p');
	  			p.innerHTML = `<b>${index.replace("one", " #1").replace("two", " #2").replace("three", " #3")}</b>: ${allfruits[data].name}`;
	  			grid.appendChild(p);
	  		carbohydrates += parseFloat(allfruits[data].nutritions.carbohydrates);
	  		fat += parseFloat(allfruits[data].nutritions.fat);
	  		protein += parseFloat(allfruits[data].nutritions.protein);
	  		sugar += parseFloat(allfruits[data].nutritions.sugar);
	  		calories += parseFloat(allfruits[data].nutritions.calories);
	  	}else{
	  		let p = document.createElement('p');
	  			p.innerHTML = `<b>${index.replace("_", " ")}</b>: ${data}`;
	  			grid.appendChild(p);
	  	}
	  }
	});
	datafinal['orderDate'] = Date.now();
	datafinal['carbohydrates'] = carbohydrates;
	let carbohydratestotal = document.createElement('p');
		carbohydratestotal.innerHTML = `<b>Total carbohydrates</b>: ${carbohydrates.toFixed(2)}`;
		grid.appendChild(carbohydratestotal);
	datafinal['fat'] = fat;
	let fattotal = document.createElement('p');
		fattotal.innerHTML = `<b>Total fat</b>: ${fat.toFixed(2)}`;
		grid.appendChild(fattotal);
	datafinal['protein'] = protein;
	let proteintotal = document.createElement('p');
		proteintotal.innerHTML = `<b>Total protein</b>: ${protein.toFixed(2)}`;
		grid.appendChild(proteintotal);
	datafinal['sugar'] = sugar;
	let sugartotal = document.createElement('p');
		sugartotal.innerHTML = `<b>Total sugar</b>: ${sugar.toFixed(2)}`;
		grid.appendChild(sugartotal);
	datafinal['calories'] = calories;
	let caloriestotal = document.createElement('p');
		caloriestotal.innerHTML = `<b>Total calories</b>: ${calories.toFixed(2)}`;
		grid.appendChild(caloriestotal);
	choosenfruits.push(datafinal);
	formResult.innerHTML = '<div class="formResult-container">'+formResultContainer.innerHTML+'</div>';
	localStorage.setItem('choosenfruits', JSON.stringify(choosenfruits));
    return false;
}