console.log("working");
const BASE_URL = "https://quote-garden.onrender.com";


const fetchData = async (url)=>{
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    return data;
}


fetchData(BASE_URL+"/api/v3/quotes/random");