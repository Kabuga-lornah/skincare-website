// Get all video elements and mute buttons
const videos = document.querySelectorAll('video');
const muteButtons = document.querySelectorAll('.mute-button');

// Function to toggle mute/unmute
function toggleMute(video, button) {
    if (video.muted) {
        video.muted = false;
        button.textContent = "🔊"; // Unmute icon
    } else {
        video.muted = true;
        button.textContent = "🔇"; // Mute icon
    }
}

// Add event listeners to mute buttons
muteButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        toggleMute(videos[index], button);
    });
});

// Play video on hover and pause others
videos.forEach(video => {
    video.addEventListener('mouseenter', () => {
        videos.forEach(v => {
            if (v !== video) {
                v.pause(); // Pause all other videos
            }
        });
        video.play().catch(error => {
            console.error("Video play failed:", error);
        }); // Play the hovered video
    });

    video.addEventListener('mouseleave', () => {
        video.pause(); // Pause the video when not hovered
    });
});