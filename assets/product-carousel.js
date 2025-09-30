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
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });

      leftArrow.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
    }
  });
});