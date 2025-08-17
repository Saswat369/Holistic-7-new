document.addEventListener('DOMContentLoaded', () => {

    // --- Intersection Observer for Scroll Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));


    // --- Video Modal Logic ---
    const videoCards = document.querySelectorAll('.video-card');
    const modal = document.getElementById('video-modal');
    const closeButton = document.querySelector('.close-button');
    const videoPlayer = document.getElementById('video-player');

    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            const videoType = card.dataset.videoType;
            let iframeHtml = '';

            if (videoType === 'facebook') {
                const videoUrl = card.dataset.videoUrl;
                iframeHtml = `<iframe src="https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(videoUrl)}&show_text=0&width=560" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>`;
            } else if (videoType === 'instagram') {
                const videoId = card.dataset.videoId;
                iframeHtml = `<iframe src="https://www.instagram.com/reel/${videoId}/embed" frameborder="0" allowfullscreen></iframe>`;
            }

            if (iframeHtml) {
                videoPlayer.innerHTML = iframeHtml;
                modal.style.display = 'block';
            }
        });
    });

    const closeModal = () => {
        modal.style.display = 'none';
        videoPlayer.innerHTML = ''; // Stop the video by removing the iframe
    };

    closeButton.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });

    // Optional: Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
});
