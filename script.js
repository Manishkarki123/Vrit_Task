const carousel = document.querySelector('.carousel');
const cards = document.querySelectorAll('.card');
let cardHeight = cards[0].offsetHeight + 10; // Each card's height including margin
let currentIndex = 0; // Tracks the current visible card

let startY = 0; // Y-coordinate when dragging starts
let isDragging = false; // Tracks whether dragging is active

// Function to move the carousel upward and highlight the centered card
function moveUp() {
    if (currentIndex < cards.length - 3) {
        currentIndex++;
    } else {
        currentIndex = 0; // Loop back to the first card
    }
    carousel.style.top = `-${cardHeight * currentIndex}px`;

    // Highlight the new centered card
    highlightCenteredCard();
}

// Function to dynamically highlight the centered card
function highlightCenteredCard() {
    cards.forEach((card, index) => {
        card.classList.remove('centered'); // Remove centered class from all cards
        if (index === currentIndex + 1) { 
            card.classList.add('centered'); // Add centered class to the middle card
        }
    });
}

// Event listeners for drag behavior
cards.forEach((card) => {
    card.addEventListener('mousedown', (e) => {
        startY = e.clientY; // Capture initial Y position
        isDragging = true;
    });

    card.addEventListener('mousemove', (e) => {
        if (!isDragging) return; // Only track movement if dragging is active
    });

    card.addEventListener('mouseup', (e) => {
        if (!isDragging) return; // Exit if not dragging
        isDragging = false; // End dragging state
        const endY = e.clientY; // Capture final Y position

        // Check if drag was upward and significant
        if (startY - endY > 50) {
            moveUp();
        }
    });

    // Support touch events for mobile devices
    card.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY; // Initial touch Y position
        isDragging = true;
    });

    card.addEventListener('touchmove', (e) => {
        if (!isDragging) return; // Only proceed if dragging
    });

    card.addEventListener('touchend', (e) => {
        if (!isDragging) return; // Exit if not dragging
        isDragging = false; // End dragging state
        const endY = e.changedTouches[0].clientY; // Final touch Y position

        // Check if drag was upward and significant
        if (startY - endY > 50) {
            moveUp();
        }
    });
});

// Initialize the centered card on page load
highlightCenteredCard();
