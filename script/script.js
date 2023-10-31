let random_quote = document.getElementById("random-quote");
let author_section = document.getElementById("author-section");
let author = document.getElementById("author");
let genre = document.getElementById("genre");

const BASE_URL = "https://quote-garden.onrender.com";
let is_loading = true;

window.addEventListener("load", async ()=>{
    console.log("windows loaded");
    displayQuote();
})


const fetchData = async (url)=>{
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    return data;
}

const displayQuote = async ()=>{
   let data =  await fetchData(BASE_URL+"/api/v3/quotes/random");
   console.log("DATA", data);

   data.data.forEach(ele => {
        console.log(ele);
        random_quote.innerText = ele.quoteText;
        author.innerText = ele.quoteAuthor;
        genre.innerText = ele.quoteGenre;
   });
}



