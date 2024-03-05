// // Import CustomSelect

// import { CustomSelect } from './vanilla-js-dropdown';
// // Import stylesheets
// import './style.css';

// // Boom!
// debugger
// var simpleSelect = new CustomSelect({
//     elem: 'select'
// });

// var optgroupSelect = new CustomSelect({
//     elem: 'select-optgroup'
// });



document.querySelectorAll('.dropdown-container').forEach(container => {
    const btn = container.querySelector('.dropdown-btn');
    const menu = container.querySelector('.dropdown-content');
  
    btn.addEventListener('click', e => {
      menu.classList.toggle('dropdown-show');
    });
  
    window.onclick = e => {
      if (e.target !== btn) {
        menu.classList.remove('dropdown-show');
      }
    }
  });
  document.querySelectorAll('.dropdown-content').forEach(menu => {
    menu.addEventListener('click', async e => {
        const selectedItem = e.target;
        console.log('Seçilen öğe:', selectedItem.innerText);
        
        
        const menuContainer = menu.parentElement;
        menuContainer.classList.remove('dropdown-show');
        
        
        const number = parseInt(selectedItem.innerText); 
        await getData(number);
    });
});

let userArray = [];
getData(10);

async function getData(number) {
    userArray = [];
    const response = await fetch(`https://randomuser.me/api/?results=${number}`);
    userArray = await response.json();
    await tableData();
}

async function tableData() {

    const table = document.querySelector(".table");
    table.style.marginLeft = "30px";;
    table.style.marginRight = "30px";
    const tableBody = document.querySelector("#user-table");
    tableBody.innerHTML = '';

    for (const row of userArray.results) {
        const rowElement = document.createElement("tr");


        const nameElement = document.createElement("td");
        nameElement.textContent = row.name.first;
        rowElement.appendChild(nameElement);

        const countryElement = document.createElement("td");
        countryElement.textContent = row.location.country;
        rowElement.appendChild(countryElement);

        const cityElement = document.createElement("td");
        cityElement.textContent = row.location.city;
        rowElement.appendChild(cityElement);
        tableBody.appendChild(rowElement);
    }
}
