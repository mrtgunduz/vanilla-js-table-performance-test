// app.js

import { dropdown } from './dropdown.js';
import { handlePageClick } from './pagination.js';

// Sayfa yüklendiğinde default olarak 10 veri getir
document.addEventListener("DOMContentLoaded", async function () {
  await getData(10);
  displayUsers(currentPage);
  updatePagination();
});


dropdown();

const pagination = document.getElementById("pagination");
pagination.addEventListener("click", handlePageClick);

export let userArray = [];
export let itemsPerPage = 3;
export let currentPage = 1;
console.log(currentPage)

export async function getData(number) {
  const response = await fetch(`https://randomuser.me/api/?results=${number}`);
  const data = await response.json();
  userArray = data.results;
  await tableData();
}



export async function tableData() {
  const table = document.querySelector(".table");
  table.style.marginLeft = "30px";
  table.style.marginRight = "30px";
  const tableBody = document.querySelector("#user-table");
  tableBody.innerHTML = '';

  for (const row of userArray) { // userArray.results yerine userArray
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






export function updatePagination() {
  pagination.innerHTML = "";
  const pageCount = Math.ceil(userArray.length / itemsPerPage);
  for (let i = 1; i <= pageCount; i++) {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#";
    link.dataset.page = i;
    link.textContent = i;
    li.appendChild(link);
    if (i === currentPage) {
      link.classList.add("active");
    }
    pagination.appendChild(li);
  }

  const paginationLinks = pagination.querySelectorAll("a");
  paginationLinks.forEach(link => {
    link.addEventListener("click", handlePageClick);
  });
}






export async function displayUsers(page) {
  debugger
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedUsers = userArray.slice(startIndex, endIndex);
  const tableBody = document.querySelector("#user-table");
  tableBody.innerHTML = '';

  for (const row of displayedUsers) {
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
