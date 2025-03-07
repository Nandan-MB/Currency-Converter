const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json";

var form = document.querySelector("form");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

const btn = document.querySelector("button");
const dropdowns = document.querySelectorAll(".dropdown select");

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText=currCode;
        newOption.value = currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }
        if(select.name==="to" && currCode==="INR" ){
            newOption.selected="selectd";
        }
        select.append(newOption);

    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    
    let newSrc = `https://flagsapi.com/${countryCode}/flat/32.png`;
    console.log(newSrc);
    let img = element.parentElement.querySelector("img");
    img.src=newSrc;

}
let fromVal,toVal;



btn.addEventListener("click",async ()=>{
    
    fromVal=dropdowns[0].value;
    toVal=dropdowns[1].value;
    fromVal=fromVal.toLowerCase();
    toVal= toVal.toLowerCase();
    console.log(fromVal + " "+ toVal);
    let obj = await fetch(BASE_URL);
    let rates = await obj.json();
    
    let from_eur=rates.eur[fromVal];
    let to_eur=rates.eur[toVal];
    let rate = to_eur/from_eur;
    console.log(from_eur+" "+to_eur);

    let input_div = document.querySelector(".amount");
    let input = document.querySelector("input");
    let userVal = input.value;

    let msg_display = `${userVal} ${fromVal.toUpperCase()} = ${rate*userVal} ${toVal.toUpperCase()}`;
    let msg = document.querySelector(".msg");
    msg.innerText=msg_display;
    
   
    
})



















