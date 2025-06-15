const base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json";
const dropdown = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector("form select");
const toCurr = document.querySelector(".to select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");
for(let select of dropdown){
    for(const country in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = country;
        newOption.value = country;
        if(select.name === "from" && country === "USD"){
            newOption.selected = true;
        } else if(select.name === "to" && country === "INR"){
            newOption.selected = true;
        }
        select.append(newOption);
    }
    select.addEventListener("change",(event)=>{
        updateFlag(event.target);
    });
}   
const updateFlag = (target) => {
    let curCode = target.value;
    let countryCode = countryList[curCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = target.parentElement.querySelector("img");
    img.src = newSrc; 
}
btn.addEventListener("click",(event)=>{
    event.preventDefault();
    updateCurrencyExchange();
});
const updateCurrencyExchange = async ()=>{
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    if(amountValue === "" || amountValue < 1){
        amountValue = 1;
        amount.value = 1;
    }
    let eur_base = await fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json");
    let eur_base_json = await eur_base.json();
    let from_base_eur = eur_base_json.eur[fromCurr.value.toLowerCase()];
    let to_base_eur = eur_base_json.eur[toCurr.value.toLowerCase()];
    let from_base_to = to_base_eur/from_base_eur;
    let finalAmount = (from_base_to*amountValue);
    let accuracy = -Math.log(finalAmount)/Math.log(10);
    if(accuracy < 0) accuracy = 0;
    if(accuracy > 8) accuracy = 8;
    msg.innerText = `${amountValue} ${fromCurr.value} = ${finalAmount.toFixed(accuracy+2)} ${toCurr.value}`;
}
window.addEventListener("load",()=>{
    updateCurrencyExchange();
    updateFlag(fromCurr);
    updateFlag(toCurr);
})