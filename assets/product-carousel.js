document.addEventListener('DOMContentLoaded', function() {
  // Find all carousel sections on the page
  const carouselSections = document.querySelectorAll('.carousel-section');
  
  carouselSections.forEach(section => {
    const track = section.querySelector('.carousel-track');
    const leftArrow = section.querySelector('.arrow-left');
    const rightArrow = section.querySelector('.arrow-right');

    if (track && leftArrow && rightArrow && track.querySelector('.product-card')) {
      const scrollAmount = track.querySelector('.product-card').offsetWidth;

      rightArrow.addEventListener('click', () => {
        // Check if the scroll position is at or near the end.
        // We use a small tolerance (-1) in case of sub-pixel rendering issues.
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 1) {
          // If at the end, loop back to the beginning.
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Otherwise, scroll by the normal amount.
          track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      });

      leftArrow.addEventListener('click', () => {
        // Check if the scroll position is at the beginning.
        if (track.scrollLeft <= 0) {
          // If at the beginning, loop to the very end.
          track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
        } else {
          // Otherwise, scroll by the normal amount.
          track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      });
    }
  });
});