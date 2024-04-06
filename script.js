const BASE_URL = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_pEXeslJfvluxvjkkWPR1JY0spAGw1WGtsIkPSoin";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#btn");
const msg = document.querySelector("#msg");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if ((select.name === "FROM" && currCode === "USD") || (select.name === "TO" && currCode === "INR")) {
      newOption.selected = true;
    }
    select.append(newOption);
  }
}

btn.addEventListener("click", async (event) => {
  event.preventDefault();
  let amount = document.querySelector(".amount input").value;

  console.log(amount);
  if (amount === "" || parseFloat(amount) < 0) {
    alert("Amount cannot be negative or empty");
    amount = 1;
    document.querySelector(".amount input").value = amount; 
  }

  if (amount != 0) {
    const URL = `${BASE_URL}&from=${document.querySelector(".from select").value}&to=${document.querySelector(".to select").value}`;
    try {
      let response = await fetch(URL);
      if (response.ok) {
        let data = await response.json();
        let fromExchangeRate = data.data[document.querySelector(".from select").value];
        let toExchangeRate = data.data[document.querySelector(".to select").value];

        if (fromExchangeRate === undefined || toExchangeRate === undefined) {
          msg.innerHTML = "Currency not found in Server";
          msg.style.color = "red";
        } else {
          const converted = (amount / fromExchangeRate) * toExchangeRate;
          msg.innerHTML = `${amount} ${document.querySelector(".from select").value} = ${converted} ${document.querySelector(".to select").value}`;
          msg.style.color = "green"; 
        }
      } else {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        msg.innerHTML = `Error: ${response.status} - ${response.statusText}`;
        msg.style.color = "red"; 
      }
    } catch (error) {
      console.error("Fetch error:", error);
      msg.innerHTML = "Fetch error";
      msg.style.color = "red"; 
    }
  }
});

const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
});


  




