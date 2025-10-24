document.addEventListener('DOMContentLoaded', function () {
    const reviewsCarouselSections = document.querySelectorAll('.homepage-reviews-slider__carousel');

    reviewsCarouselSections.forEach(section => {
        const track = section.querySelector('.carousel-track');
        const parentSection = section.closest('.homepage-reviews-slider-section');
        const leftArrow = parentSection ? parentSection.querySelector('.homepage-reviews-slider__nav-button--prev') : null;
        const rightArrow = parentSection ? parentSection.querySelector('.homepage-reviews-slider__nav-button--next') : null;

        if (track && leftArrow && rightArrow && track.querySelector('.review-slide')) {
            const scrollAmount = track.querySelector('.review-slide').offsetWidth;

            rightArrow.addEventListener('click', () => {
                if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 1) {
                    track.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            });

            leftArrow.addEventListener('click', () => {
                if (track.scrollLeft <= 0) {
                    track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
                } else {
                    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                }
            });
        }
    });
});