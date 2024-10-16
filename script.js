document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let currentSlide = 0;
    let autoPlay = true;
    let interval;

    
    const indicatorContainer = document.createElement('div');
    indicatorContainer.classList.add('indicator-container');
    document.body.appendChild(indicatorContainer);

    slides.forEach((slide, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === 0) {
            indicator.classList.add('active-indicator');
        }
        indicatorContainer.appendChild(indicator);
    });

    const indicators = document.querySelectorAll('.indicator');

 
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            indicators[i].classList.remove('active-indicator');
            if (i === index) {
                slide.classList.add('active');
                indicators[i].classList.add('active-indicator');
                startTypingEffect(slide); 
            }
        });
    }

    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

   
    function startAutoPlay() {
        interval = setInterval(() => {
            stopAutoPlay(); 
        }, 5000); 
    }

    
    function stopAutoPlay() {
        clearInterval(interval);
    }

   
    function toggleAutoPlay() {
        if (autoPlay) {
            stopAutoPlay();
            autoPlay = false;
        } else {
            startAutoPlay();
            autoPlay = true;
        }
    }

    
    startAutoPlay();

    
    const playPauseButton = document.createElement('button');
    playPauseButton.textContent = 'Pause';
    playPauseButton.classList.add('control-button');
    document.body.appendChild(playPauseButton);

    playPauseButton.addEventListener('click', function () {
        if (autoPlay) {
            playPauseButton.textContent = 'Play';
            toggleAutoPlay();
        } else {
            playPauseButton.textContent = 'Pause';
            toggleAutoPlay();
        }
    });

    
    const nextButton = document.createElement('button');
    const prevButton = document.createElement('button');
    nextButton.textContent = 'Next';
    prevButton.textContent = 'Previous';
    nextButton.classList.add('control-button');
    prevButton.classList.add('control-button');
    document.body.appendChild(prevButton);
    document.body.appendChild(nextButton);

    nextButton.addEventListener('click', function () {
        stopAutoPlay();
        nextSlide();
        if (autoPlay) startAutoPlay(); 
    });

    prevButton.addEventListener('click', function () {
        stopAutoPlay();
        prevSlide();
        if (autoPlay) startAutoPlay(); 
    });

   
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') {
            nextButton.click();
        } else if (e.key === 'ArrowLeft') {
            prevButton.click();
        } else if (e.key === ' ') {
            playPauseButton.click();
        }
    });

    
    function startTypingEffect(slide) {
        const headers = slide.querySelectorAll('h1');
        const paragraphs = slide.querySelectorAll('p');

       
        paragraphs.forEach(paragraph => {
            paragraph.style.visibility = 'hidden';
        });

        
        headers.forEach((header) => {
            typeText(header, 100, () => { 
                setTimeout(() => {
                    paragraphs.forEach((para) => {
                        para.style.visibility = 'visible'; 
                        typeText(para, 75, () => {
                            
                            setTimeout(nextSlide, 6000);
                        });
                    });
                }, 2000); 
            });
        });
    }

    function typeText(element, speed, callback) {
        const text = element.textContent; 
        element.textContent = ''; 
        let i = 0;

        const typing = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i); 
                i++;
            } else {
                clearInterval(typing); 
                if (callback) callback(); 
            }
        }, speed);
    }

    
    showSlide(currentSlide);
});
