const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let photosArray = []

// Unsplash API Url
const count = 10
const apiKey = 'SbqBOOHz71u7up6r228OeLPTShC1C3D8h_rJlHqaUWs'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
let imagesLoaded = 0
let totalImages = 0
let ready = false

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++
    if (imagesLoaded === totalImages) {
        loader.hidden = true
        ready = true
    }
}

// Helper Function to Set Attributes to DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create Elements for Links and Photos and add them to DOM
function displayPhotos() {
    imagesLoaded = 0
    totalImages = photosArray.length
        // Run function for each object in the photosArray
    photosArray.forEach((photo) => {
        // Create <a> link to unsplash
        const item = document.createElement('a')
            // item.setAttribute('href', photo.links.html)
            // item.setAttribute('target', '_blank')
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })

        // Create <img> for photo
        const img = document.createElement('img')
            // img.setAttribute('src', photo.urls.regular)
            // img.setAttribute('alt', photo.alt_description)
            // img.setAttribute('title', photo.alt_description)
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        // Event Listener, check if each image finished loading
        img.addEventListener('load', imageLoaded)

        // Put <img> inside <a>, and put both of them in image container
        item.appendChild(img)
        imageContainer.appendChild(item)
    })
}

// Get photos Unsplash API
async function getPhotos() {
    try {
        loader.hidden = false
        const response = await fetch(apiUrl)
        photosArray = await response.json()
        displayPhotos()
        loader.hidden = true
    } catch (error) {
        console.log('API got some error, please try again. ', error)
    }
}

// Load more photos on scroll
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && ready) {
        getPhotos()
    }
})

getPhotos()