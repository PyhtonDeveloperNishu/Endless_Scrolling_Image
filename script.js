const apikey ="CJFnFdF4tiklL4Ae5SxB8cNM4tdBLP9MZwN0K9jOUHE";
const count = 15;// number of photos to fetch
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;

let images = [];
let loaded = false;
let loader = document.querySelector("#loader");
let imgCon = document.querySelector("#img-con");

async  function getPhotos(){
    loaded=false;
    loader.style.display ="block";
    try{
        const res = await fetch(apiUrl);
        images = await res.json();
        console.log(images);
        displayPhotos(images);
    }catch(error){
        console.log(error);
    }
}

function displayPhotos(arr){
    const fragment = document.createDocumentFragment();
    arr.forEach(obj => {
        const anchor = document.createElement("a");
        const image = document.createElement("img");
        anchor.href=obj.links.html;
        image.src=obj.urls.regular;
        image.alt=obj.urls.regular;
        image.title=obj.alt_description;
        // image.classList.add("image")

        anchor.append(image);
        fragment.append(anchor);  
    });

    imgCon.append(fragment);
    loader.style.display="none";
    loaded=true;
}


// console.log("window.innerHeight", window.innerHeight); //the viewable height + horizontal scrollbar's height
// console.log("document.body.offsetHeight", document.body.offsetHeight);
// console.log("window.scrollY", window.scrollY);


window.addEventListener("scroll",()=>{
    window.scrollY+window.innerHeight>=document.body.offsetHeight && loaded
    ? getPhotos():"";
});

getPhotos();

