const select_from = document.getElementById("select-from");
const select_to = document.getElementById("select-to");

const img_from = document.getElementById("img-from");
const img_to = document.getElementById("img-to");

const amount = document.querySelector(".amount input");

const msg_from = document.querySelector(".msg-from");
const msg_to = document.querySelector(".msg-to");

// ----------------------------------------------------------------------

// adding all currencies to select button from currency_code.js
function addAllCurrencies(select) {

    for (let currency in countryList) {

        // let country = countryList[currency];
        // console.log("| Currency :", currency, "| Country: ",country);

        let option = document.createElement("option");
        option.value = currency;
        option.innerText = currency;

        select.append(option);

        if (select.name === "from" && option.value === "USD") {
            option.selected = true;
        }
        if (select.name === "to" && option.value === "INR") {
            option.selected = true;
        }
    }
}

addAllCurrencies(select_from);
addAllCurrencies(select_to);

// ----------------------------------------------------------------------

// chnage flag on currency
function changeFlag(select, img) {

    select.addEventListener("change", (event) => {

        let selected_option = event.target;
        let selected_currency = selected_option.value;
        console.log("Currency :", selected_currency);
        console.log("Value", select.value);

        let countryName = countryList[selected_currency];
        // console.log(countryName);

        img.src = `https://flagsapi.com/${countryName}/flat/64.png`;
    })
}

changeFlag(select_from, img_from);
changeFlag(select_to, img_to);

// ----------------------------------------------------------------------

// Convert Currency on Btn click event
async function getExchange(fromCurr, toCurr) {

    let response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurr}/${toCurr}.json`)

    let data = await response.json();
    // console.log(data);

    let exchangeRate = (data[toCurr]).toFixed(3);   // returns string representing number having 4 digits after decimal point.
    exchangeRate = parseFloat(exchangeRate);        // convert string to float
    console.log("Exchange Rate :", exchangeRate);

    console.log("Amuount :", amount.value);

    let result = (amount.value) * exchangeRate;
    console.log("Result :", result.toFixed(2));

    msg_from.innerText = `${amount.value} ${fromCurr}`;        // 1 USD
    msg_to.innerText = `${result.toFixed(2)} ${toCurr}`;                  // 80 INR

}

const exchange_btn = document.querySelector("form button");

exchange_btn.addEventListener("click", (event) => {

    event.preventDefault();                                 // avoid all default action from being performed.

    if (amount.value === "" || amount.value === " " || amount.value < 1) {
        amount.value = 1;
    }

    let fromCurr = select_from.value.toLowerCase();
    let toCurr = select_to.value.toLowerCase();
    console.log("fromCurr :", fromCurr);
    console.log("toCurr :", toCurr);

    getExchange(fromCurr, toCurr);
})

