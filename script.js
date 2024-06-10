const apiKey = '44294642-77aa31a2fb7338b290b0c9220';
let page = 1;
let query = 'nature';
let numImagesPerRow = 3;

const galleryContainer = document.getElementById('gallery-container');
const numImagesPerRowInput = document.getElementById('numImagesPerRow');

numImagesPerRowInput.addEventListener('input', (e) => {
  numImagesPerRow = e.target.value;
  updateGalleryLayout();
});

function updateGalleryLayout() {
  galleryContainer.style.gridTemplateColumns = `repeat(${numImagesPerRow}, 1fr)`;
}

async function fetchImages() {
  const response = await fetch(`https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&page=${page}&per_page=20`);
  const data = await response.json();
  displayImages(data.hits);
}

function displayImages(images) {
  images.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.dataset.src = image.webformatURL;
    imgElement.classList.add('lazy');
    galleryContainer.appendChild(imgElement);
  });
  lazyLoad();
}

function lazyLoad() {
  const lazyImages = document.querySelectorAll('.lazy');

  const config = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  let observer = new IntersectionObserver((entries, self) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        self.unobserve(img);
      }
    });
  }, config);

  lazyImages.forEach(image => {
    observer.observe(image);
  });
}

function loadMoreImages() {
  page += 1;
  fetchImages();
}

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadMoreImages();
  }
});

document.addEventListener('keydown', (e) => {
  const images = document.querySelectorAll('#gallery-container img');
  let currentIndex = Array.from(images).findIndex(img => img === document.activeElement);
 
function handleKeyboardNavigation(event) {
    const images = document.querySelectorAll('.gallery-image');
    const focusedIndex = Array.from(images).indexOf(document.activeElement);

    
    const maxIndex = images.length - 1;

    
    switch (event.key) {
        case 'ArrowUp':
            if (focusedIndex >= 3) { // Ensure there's an image above
                images[focusedIndex - 3].focus(); 
            }
            break;
        case 'ArrowDown':
            if (focusedIndex < maxIndex - 2) { 
                images[focusedIndex + 3].focus(); 
            }
            break;
        case 'ArrowLeft':
            if (focusedIndex > 0) { 
                images[focusedIndex - 1].focus(); 
            }
            break;
        case 'ArrowRight':
            if (focusedIndex < maxIndex) { 
                images[focusedIndex + 1].focus(); 
            }
            break;
    }
}


window.addEventListener('keydown', handleKeyboardNavigation);


  switch (e.key) {
    case 'ArrowRight':
      if (currentIndex < images.length - 1) {
        images[currentIndex + 1].focus();
      }
      break;
    case 'ArrowLeft':
      if (currentIndex > 0) {
        images[currentIndex - 1].focus();
      }
      break;
    case 'ArrowDown':
      if (currentIndex + numImagesPerRow < images.length) {
        images[currentIndex + numImagesPerRow].focus();
      }
      break;
    case 'ArrowUp':
      if (currentIndex - numImagesPerRow >= 0) {
        images[currentIndex - numImagesPerRow].focus();
      }
      break;
  }
});

updateGalleryLayout();
fetchImages();

