let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
let isPlaying = true;
let slideInterval = setInterval(nextSlide, 5000);
const pausePlayButton = document.querySelector('.pause-play-button');

function changeSlide(direction) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

function nextSlide() {
    changeSlide(1);
}

function togglePausePlay() {
    if (isPlaying) {
        clearInterval(slideInterval);
        pausePlayButton.textContent = 'Reproducir';
    } else {
        slideInterval = setInterval(nextSlide, 5000);
        pausePlayButton.textContent = 'Pausar';
    }
    isPlaying = !isPlaying;
}