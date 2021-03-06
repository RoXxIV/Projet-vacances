//stock cle api
var token = config.MY_API_TOKEN;
/**VARIABLE____________
 **************************/
/**Roman Number*/
let romanInput = document.querySelector("#roman input");
let convertButton = document.querySelector("#roman button")
let romanSaisis;
let romanResult = document.querySelector("#romanResult span");
const romanNumber = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
const number = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
let convert = "";
/**post-it*/
let newItemForm = document.querySelector("input[type='submit']");
let list = document.querySelector("#post-it ul");
let newPostItText;
let deletePostIt = document.querySelector("#post-it ul");
/**array*/
let newArray;
let indexList = document.querySelectorAll("#inputList li input")
let FilledArray = document.querySelector("#FilledArray")
let htmlArray = document.querySelector("#array p")
let sortButton = document.querySelector("#sort")
let deleteEven = document.querySelector("#deleteEven");
let sumAll = document.querySelector("#sum");

/**ROMAN NUMBER____________
 **************************/
/*function */
function convertToRoman(num) {
    convert = ""
    if (romanInput.value > 1000 || romanInput.value <= 0) {
        convert = "💀"
    } else {
        romanSaisis = romanInput.value;
        for (let i = 0; i < number.length; i++) {
            while (number[i] <= romanSaisis) {
                convert += romanNumber[i];
                romanSaisis -= number[i];
            }
        }
    }

    romanResult.innerHTML = convert
}

/**POST-IT____________
 **************************/
//ajout dun nouveau post
function addPostIt(e) {
    newPostItText = document.querySelector("input[type = 'text']").value;
    list.innerHTML += `<li>${newPostItText}</li>`;
    document.querySelector("input[type = 'text']").value = "";
    e.preventDefault();

}
function onClickdeletePostIt(event) {

    event.target.remove()
}
/**RANDOM QUOTE____________
 **************************/
function displayQuote(quote) {
    document.querySelector("#quote p").innerHTML = `"${quote.content}"`
    document.querySelector("#quote span").innerHTML = quote.originator.name
    console.log(quote)
}
function newQuoteOnClick() {

    ajaxJsonApi(displayQuote)
}
function ajaxJsonApi(callback) {
    fetch("https://quotes15.p.rapidapi.com/quotes/random/", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": token,
            "x-rapidapi-host": "quotes15.p.rapidapi.com"
        }
    })
        .then((response) => response.json())
        .then((datas) => callback(datas));
}

/**Array_________
 **************************/
function fillOnClick() {
    newArray = []
    for (let i = 0; i < indexList.length; i++) {
        newArray.push(indexList[i].value)
    }
    showArray(newArray)
}
function showArray(arr) {
    myarr = `[`
    for (item of arr) {
        myarr += `<span>${item}  </span>`
    }
    myarr += `]`
    htmlArray.innerHTML = myarr

}
function sortOnClick() {
    newArray.sort(function (a, b) {
        return a - b;
    })
    showArray(newArray)
}
function removeEvenOnCLick() {
    const evenArray = newArray.filter((nb) => nb % 2 !== 0);
    newArray = evenArray
    showArray(newArray);
}
function sumAllOnCLick() {
    // a faire...
}
/**CODE PRINCIPALE_________
 **************************/
document.addEventListener("DOMContentLoaded", function () {
    /**Roman Number*/
    convertButton.addEventListener("click", convertToRoman);
    /**post-it */
    newItemForm.addEventListener("click", addPostIt)
    //deletePostIt.addEventListener("click", onClickdeletePostIt)
    deletePostIt.addEventListener("click", onClickdeletePostIt);
    document.querySelector("#newQuote").addEventListener("click", newQuoteOnClick)
    /**Array*/
    FilledArray.addEventListener("click", fillOnClick)
    sortButton.addEventListener("click", sortOnClick)
    deleteEven.addEventListener("click", removeEvenOnCLick);
    sumAll.addEventListener("click", sumAllOnCLick);
});

