const url = 'https://dazoantsy.github.io/wdd230/chamber/data.json';
getBusinessData();

async function getBusinessData() {
    const response = await fetch(url);
    const data = await response.json();
    displayBusiness(data.business);
  }
  


  const displayBusiness = (business) => {
    const cards = document.querySelector('section.cards'); // select the output container element
  
    business.forEach((busin) => {
      // Create elements to add to the div.cards element
      let card = document.createElement('section');
      let h2 = document.createElement('h2');
      let name = document.createElement('p');
      let address = document.createElement('p');
      let phonenumber = document.createElement('p');
      let website = document.createElement('p');
      let membershiplevel = document.createElement('p');
      let image = document.createElement('img');
  
      
      h2.textContent = `${busin.name}`;
      address.textContent = `${busin.address}`;
      image.imageurl = busin.imageurl;
      phonenumber.textContent = `${busin.phonenumber}`;
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
  
      // Append the section(card) with the created elements
      card.appendChild(image);
      card.appendChild(h2);
      card.appendChild(name);
      card.appendChild(address);
      card.appendChild(phonenumber);
      card.appendChild(website);
      card.appendChild(membershiplevel);
     
      cards.appendChild(card);
    }); // end of forEach loop
  } // end of function expression

  //---GRID / LIST-------------------

  const gridbutton = document.querySelector("#grid");
  const listbutton = document.querySelector("#list");
  const display = document.querySelector(".cards");
  display.classList.add("grid");
  
  
  gridbutton.addEventListener("click", () => {
    
    display.classList.add("grid");
    display.classList.remove("list");
  });
  
  listbutton.addEventListener("click", showList); 
  
  function showList() {
    display.classList.add("list");
    display.classList.remove("grid");
  }
  