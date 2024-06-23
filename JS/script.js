let index = 0;
let slides = document.querySelectorAll('.slide');

function showSlides() {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        slide.style.display = 'none';
    });
    slides[index].classList.add('active');
    slides[index].style.display = 'block';
}

function nextSlide() {
    index = (index + 1) % slides.length;
    showSlides();
}

function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    showSlides();
}

document.addEventListener('DOMContentLoaded', () => {
    showSlides();

    document.querySelector('.next').addEventListener('click', nextSlide);
    document.querySelector('.prev').addEventListener('click', prevSlide);

    // Automatically change slides every 5 seconds
    setInterval(nextSlide, 5000);
});

function loadProductDetails(productId) {
    fetch(`${productId}.json`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('product-title').textContent = data.title;
            document.getElementById('product-image').src = data.image;
            document.getElementById('product-process').textContent = data.process;
            document.getElementById('product-quality').textContent = data.quality;

            // Hide the main sections and display the product details section
            document.querySelectorAll('section').forEach(section => {
                if (section.id !== 'product-details') {
                    section.style.display = 'none';
                }
            });
            document.getElementById('product-details').style.display = 'block';
            window.scrollTo(0, 0); // Scroll to top of the page when product details are displayed
        })
        .catch(error => console.error('Error loading product details:', error));
}

function hideProductDetails() {
    document.getElementById('product-details').style.display = 'none';
    document.querySelectorAll('section').forEach(section => {
        if (section.id !== 'product-details') {
            section.style.display = 'block';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    showSlides();

    document.querySelector('.next').addEventListener('click', nextSlide);
    document.querySelector('.prev').addEventListener('click', prevSlide);

    // Smooth scroll behavior for internal anchor links and navigation bar buttons
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                hideProductDetails(); // Hide product details and show main sections
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Production counter functionality
    const counters = document.querySelectorAll('.counter');
    const speed = 500; // The lower the number, the faster the counter will increment

    window.addEventListener('scroll', () => {
        const targetPosition = document.getElementById('production-counter').getBoundingClientRect().top;
        const startPosition = window.innerHeight;

        if (targetPosition < startPosition) {
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;

                    const increment = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = target.toLocaleString(); // Format the number with commas
                    }
                };

                updateCount();
            });
        }
    });
});