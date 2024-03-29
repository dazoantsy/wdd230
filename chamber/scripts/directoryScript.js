  const url = 'https://dazoantsy.github.io/wdd230/chamber/data.json';
  getBusinessData();

  async function getBusinessData() {
    const response = await fetch(url);
    const data = await response.json();
    displayBusiness(data.business);
    spotlight('.goldmember', getLevelData(data.business, 1, 'Gold'))
    spotlight('.silvermember', getLevelData(data.business, 1, 'Silver'))
    spotlight('.bronzemember', getLevelData(data.business, 1, 'Bronze'))
    
  }

  function getLevelData(business,nbre=1,membershiplevel='all',random=true) {
    let businessdata = []; let datafinal = [];
    if (random) {
      shuffle(business)
    }
    if (membershiplevel == 'all') {
      businessdata = business;
    }else{
      business.forEach((busin) => {
        if (busin.membershiplevel == membershiplevel) {
          businessdata.push(busin)
        }
      });
    }
    if (nbre < businessdata.length) {
      for (var i = 0; i < nbre; i++) {
        datafinal.push(businessdata[i])
      }
    }else{
      datafinal = businessdata
    }
    return datafinal;
  }

  function spotlight(selectorElement,data) {
    const cards = document.querySelector(selectorElement); // select the output container element
    if (cards != null) {
      data.forEach((busin) => {
        // Create elements to add to the div.cards element
        let card = document.createElement('section');
        let h2 = document.createElement('h3');
        let address = document.createElement('p');
        let phonenumber = document.createElement('p');
        let website = document.createElement('p');
        let membershiplevel = document.createElement('p');
        let image = document.createElement('img');
    
        
        h2.textContent = `${busin.name}`;
        image.imageurl = busin.imageurl;

        card.setAttribute('class', 'card');
        h2.setAttribute('class', 'names')

        // Build the image portrait by setting all the relevant attribute
        image.setAttribute('class', 'im');
        image.setAttribute('src', busin.imageurl);
        image.setAttribute('alt', `Logo of ${busin.name}`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '340');
        image.setAttribute('height', '440');
    
        // Append the section(card) with the created elements
        card.appendChild(image);
        card.appendChild(h2);
       
        cards.appendChild(card);
      }); // end of forEach loop
    }
  }

  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
  
  const displayBusiness = (business) => {
    const cards = document.querySelector('section.cards'); // select the output container element
    if (cards != null) {
      business.forEach((busin) => {
        // Create elements to add to the div.cards element
        let card = document.createElement('section');
        let h2 = document.createElement('h2');
        let address = document.createElement('p');
        let phonenumber = document.createElement('p');
        let website = document.createElement('p');
        let membershiplevel = document.createElement('p');
        let image = document.createElement('img');

        
        h2.textContent = `${busin.name}`;
        address.textContent = `${busin.address}`;
        image.imageurl = busin.imageurl;
        phonenumber.textContent = `Tel: ${busin.phonenumber}`;
        website.textContent = `${busin.website}`;
        membershiplevel.textContent = `Membership Level: ${busin.membershiplevel}`;

        card.setAttribute('class', 'card');
        h2.setAttribute('class', 'names')

        // Build the image portrait by setting all the relevant attribute
        image.setAttribute('class', 'im');
        image.setAttribute('src', busin.imageurl);
        image.setAttribute('alt', `Logo of ${busin.name}`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '340');
        image.setAttribute('height', '440');

        // Add class for all elements
        address.setAttribute('class', 'address');
        phonenumber.setAttribute('class', 'phonenumber');
        website.setAttribute('class', 'website');
        membershiplevel.setAttribute('class', 'membershiplevel');

        // Append the section(card) with the created elements
        card.appendChild(image);
        card.appendChild(h2);
        card.appendChild(address);
        card.appendChild(phonenumber);
        card.appendChild(website);
        card.appendChild(membershiplevel);
       
        cards.appendChild(card);
      }); // end of forEach loop
    }
  } // end of function expression

  //---GRID / LIST-------------------

  const gridbutton = document.querySelector("#grid");
  const listbutton = document.querySelector("#list");
  const display = document.querySelector(".cards");

  if (display != null && gridbutton != null & listbutton != null) {

    display.classList.add("grid");
    gridbutton.classList.add("active")

    gridbutton.addEventListener("click", () => {
      
      display.classList.add("grid");
      display.classList.remove("list");
      listbutton.classList.remove("active")
      gridbutton.classList.add("active")
    });

    listbutton.addEventListener("click", showList); 
  }

  function showList() {
    display.classList.add("list");
    display.classList.remove("grid");
    gridbutton.classList.remove("active")
    listbutton.classList.add("active")
  }
  