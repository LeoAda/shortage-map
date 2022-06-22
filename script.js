import countries from "./slim-2.js";
main();


function get_country_name_from_alpha2(alpha2) {
    //get country name from alpha2
    const countries_list = get_country_list();
    return countries_list.find(country => country["alpha-2"] === alpha2).name;
}

function get_countries_alpha2() {
    //get all countries alpha 2
    const countries_list = get_country_list();
    return countries_list.map(country=>country["alpha-2"]);;
}

function get_country_list() {
    //get all countries list
    return countries;
}

function main(){
    //main function
    fill_select_countries("reference-country");
    fill_select_countries("target-country")
    add_event_listener_to_button("submit-button",countries_compare);
}

function fill_select_countries(select_id) {
    //fill select countries
    const select = document.getElementById(select_id);
    const countries_code = get_countries_alpha2();
    countries_code.forEach(country_code => {
        const option = document.createElement("option");
        option.value = country_code;
        option.text = get_country_name_from_alpha2(country_code);
        select.add(option);
    });
}
function get_country_alpha2_from_select(select_id) {
    //get country code from select
    const select = document.getElementById(select_id);
    return select.value;
}
function get_country_code_from_alpha2(alpha2) {
    //get country code from alpha2
    const countries_list = get_country_list();
    return countries_list.find(country => country["alpha-2"] === alpha2)["country-code"];
}

function add_event_listener_to_button(button_id,function_name){
    //add event listener to button
    document.getElementById(button_id).addEventListener("click", function_name);
}


function countries_compare(){
    //compare countries
    const reference_country_alpha2 = get_country_alpha2_from_select("reference-country");
    const target_country_alpha2 = get_country_alpha2_from_select("target-country");
    const reference_country_code = get_country_code_from_alpha2(reference_country_alpha2);
    const target_country_code = get_country_code_from_alpha2(target_country_alpha2);
    call_comtrade_api(reference_country_code,target_country_code);
}
function call_comtrade_api(reference_country_code,target_country_code){
    //call comtrade get json api
    var requestOptions = {method: 'GET',redirect: 'follow'};
      
      fetch("https://comtrade.un.org/api/get?max=502&type=C&freq=A&px=HS&ps=2021&rg=all&cc=AG2&p="+target_country_code+"&r="+reference_country_code, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}