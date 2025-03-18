const apikey = "CJFnFdF4tiklL4Ae5SxB8cNM4tdBLP9MZwN0K9jOUHE";
const count = 15; // Number of photos to fetch
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;

let images = [];
let loaded = false;
let loader = document.querySelector("#loader");
let imgCon = document.querySelector("#img-con");

async function getPhotos() {
    loaded = false;
    loader.style.display = "block";
    try {
        const res = await fetch(apiUrl);
        images = await res.json();
        displayPhotos(images);
    } catch (error) {
        console.log("Failed to load images:", error);
        loader.innerText = "Failed to load images. Try again later.";
    }
}

function displayPhotos(arr) {
    const fragment = document.createDocumentFragment();
    arr.forEach((obj) => {
        const anchor = document.createElement("a");
        const image = document.createElement("img");

        anchor.href = obj.links.html;
        image.src = obj.urls.regular;
        image.alt = obj.alt_description || "Unsplash Image";
        image.title = obj.alt_description || "Unsplash Image";
        image.loading = "lazy"; // Improves performance with lazy loading

        anchor.append(image);
        fragment.append(anchor);
    });

    imgCon.append(fragment);
    loader.style.display = "none";
    loaded = true;
}

window.addEventListener("scroll", () => {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight && loaded) {
        getPhotos();
    }
});

// Initial load
getPhotos();
