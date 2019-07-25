/* Initialisation of the variables required for checking state of the system */

var typed = "";
var result = "";
var presence = false;

/* Prepares DOM with the search field on page load */

window.onload = function(){
    typed = "";
    searchDOM();
    process();
};

/* Function that throttles per 400 milliseconds to show suggestions if there is no user activity */

function process(){
    window.setInterval(function(){
        var changed = document.getElementById('search_field').value;
        if (changed.length == 0) {
            typed = changed;
            clearList();
        }
        if (changed != typed) {
            if (changed.length >= 3) 
            {
              typed = changed;
              apiCall(changed);
            }
            else {
                typed = changed;
                if (presence == true) {
                clearList();
                }
            }
        }
    }, 400);
}

/* function that performs the actual API Call to get countries data */

function apiCall(changed) {
    console.log("Called")
    let url = 'https://restcountries.eu/rest/v2/name/' + changed
    fetch(url)
    .then(function(response){
        if (response.status == 404) {
            showNone();
        }
        else {
            return response.json();
        }
    })
    .then(function(myJSON){
        result = myJSON;
        listCreator(myJSON);
    })
    .catch(function(){
        showFailure();
    });
    
}

/* Creates the DOM element for the search field */

function searchDOM() {
    let searchWindow = document.querySelector(".search-body");
    var search = document.createElement("input");
    search.className = "search_field";
    search.id = "search_field";
    search.placeholder = "Enter country name here...."
    searchWindow.appendChild(search);
}

/* Creates the list of suggestions based on the typed text */

function listCreator(result) {
    console.log("reached");
    if (presence == true) {
        clearList();
    }
    presence = true;
    let main = document.querySelector(".search-body");
    let holder = document.createElement("div");
    holder.className = "card_holder";
    main.appendChild(holder);
    for (var index = 0; index < result.length ; index ++) {
        let card = document.createElement("div");
        card.className = "card";
        card.id = index;
        card.setAttribute("onclick","information(id)");
        let name = document.createElement("p");
        name.className = "country"
        name.textContent = result[index].name;
        let flag = document.createElement("img");
        flag.src = result[index].flag;
    
        card.appendChild(flag);
        card.appendChild(name);
 
        holder.appendChild(card);
    }
}

/* Function called to clear the list before new suggestions are populated */

function clearList(){
    var items = document.querySelectorAll(".card");
    items.forEach(function(item){
        item.parentNode.removeChild(item);
    })
    var holder = document.querySelector(".card_holder");
    holder.parentNode.removeChild(holder);
    presence = false;
}

/* INFORMATION DOM STARTS HERE */

/* Function that declares DOM elements for Information Page */

function information(index) {
    var searchDOM = document.querySelector(".search-body");
    searchDOM.style.display = "none";
    var resultDOM = document.querySelector(".result-body");
    resultDOM.style.display = "block";
    let info = document.createElement("div");
    info.className = "information";
    let name = document.createElement("p");
    name.textContent = "Name: " + result[index].name;
    let flag = document.createElement("img");
    flag.src = result[index].flag;
    let capital = document.createElement("p");
    capital.textContent = "Capital: " +result[index].capital;
    capital.className = "textwonder";
    let currency = document.createElement("p");
    currency.textContent = result[index].currencies[0].name + " (" + result[index].currencies[0].symbol + ")";
    currency.className = "currency";
    let language = document.createElement("p");
    language.textContent = result[index].languages[0].name
    language.className = "language";
    let region = document.createElement("p");
    region.textContent = "Region: " + result[index].region;
    let subregion = document.createElement("p");
    subregion.textContent = "Subregion: " + result[index].subregion;
    subregion.className = "textwonder";
    let population = document.createElement("p");
    population.textContent = result[index].population;
    let timezones = document.createElement("p");
    timezones.textContent = result[index].timezones[0];
    let area = document.createElement("p");
    if (result[index].area != "") {
        area.textContent = result[index].area;
    }
    else {
        area.textContent = "Not available"
    }
    var back = document.createElement("img");
    back.src = "https://img.icons8.com/ios-filled/50/000000/back.png";
    back.alt = "Click to go back"
    back.className = "back"
    back.setAttribute("onclick","revert()");
    info.appendChild(back);
    let basics = document.createElement("div");
    basics.className = "basics";
    resultDOM.appendChild(info);
    info.appendChild(basics);
    let titles = document.createElement("div");
    titles.className = "titles";
    titles.appendChild(flag);
    let showstop = document.createElement("div");
    let breaker = document.createElement("br");
    showstop.className = "titles";
    let showstop1 = document.createElement("div");
    let verti = document.createElement("div");
    verti.appendChild(showstop);
    verti.appendChild(showstop1);
    verti.className = "showstop";
    showstop1.className = "titles";
    showstop.appendChild(name);
    showstop.appendChild(capital);
    showstop1.appendChild(region);
    showstop1.appendChild(subregion);
    basics.appendChild(titles);
    titles.appendChild(verti);
    let others = document.createElement("div");
    others.className = "others";
    let linfo = document.createElement("p");
    linfo.className = "linfo"
    linfo.textContent = "Most people here speak";
    let cinfo = document.createElement("p")
    cinfo.className = "cinfo";
    cinfo.textContent = "You can spend in ";
    others.appendChild(linfo);
    others.appendChild(language);
    let money = document.createElement("div");
    money.className = "money";
    money.appendChild(cinfo);
    money.appendChild(currency);
    basics.appendChild(others);
    basics.appendChild(money);
    let subtitle = document.createElement("p");
    subtitle.textContent = "Some Geek Stuff"
    subtitle.className = "subtitle";
    info.appendChild(subtitle);
    let more = document.createElement("div");
    more.className = "more";
    let pops = document.createElement("div");
    pops.className = "money";
    let ptext = document.createElement("p");
    ptext.textContent = "Population: ";
    pops.appendChild(ptext);
    pops.appendChild(population);
    more.appendChild(pops);
    let areas = document.createElement("div");
    let ams = document.createElement("p");
    ams.textContent = "Area: ";
    ams.className = "ams";
    areas.className = "money";
    areas.appendChild(ams);
    areas.appendChild(area);
    let oreas = document.createElement("div");
    let oms = document.createElement("p");
    oms.textContent = "Timezone: ";
    oms.className = "ams";
    oreas.className = "money";
    oreas.appendChild(oms);
    oreas.appendChild(timezones);
    info.appendChild(more);
    more.appendChild(areas);
    more.appendChild(oreas);
}

/* Function triggered when the back button is pressed --- switches to the original DOM */

function revert() {
    var resultbody = document.querySelector(".information");
    resultbody.parentNode.removeChild(resultbody);
    var searchDOM = document.querySelector(".search-body");
    searchDOM.style.display = "block";
}

/* A function used to show failed status when the list does not return any results */

function showFailure() {
    if(presence == true) {
        clearList();
    }
    let main = document.querySelector(".search-body");
    let holder = document.createElement("div");
    holder.className = "card_holder";
    main.appendChild(holder);
    let p = document.createElement("p");
    p.textContent = "No results found!";
    p.className = "sorryText"
    holder.appendChild(p);
    presence = true;
}

/* A function used to show failed status in the case of error code 404 */

function showNone(){
    if(presence == true) {
        clearList();
    }
    let main = document.querySelector(".search-body");
    let holder = document.createElement("div");
    holder.className = "card_holder";
    main.appendChild(holder);
    let p = document.createElement("p");
    p.textContent = "No results found!";
    p.className = "sorryText"
    holder.appendChild(p);
    presence = true;
}