let random_quote = document.getElementById("random-quote");
let author_section = document.getElementById("author-section");
let author = document.getElementById("author");
let genre = document.getElementById("genre");
let next_btn = document.getElementById("next-btn");
let loading_screen = document.getElementById("loading-screen");
let quote_section = document.getElementById("quote-section");
let author_quotes_section = document.getElementById("author-quotes-section")

const BASE_URL = "https://quote-garden.onrender.com";


window.addEventListener("load", async ()=>{
    console.log("windows loaded");
    displayQuote();
    next_btn.addEventListener("click", displayQuote);
})


const fetchData = async (url)=>{
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    return data;
}

const displayQuote = async ()=>{
    
   let data =  await fetchData(BASE_URL+"/api/v3/quotes/random");
   console.log("DATA", data.statusCode);

   if(data.statusCode === 200){
    loading_screen.classList.add("d-none");
    quote_section.classList.remove("d-none");
   }
   

   data.data.forEach(ele => {
        console.log(ele);
        random_quote.innerText = ele.quoteText;
        author.innerText = ele.quoteAuthor;
        genre.innerText = ele.quoteGenre;
   });
}



