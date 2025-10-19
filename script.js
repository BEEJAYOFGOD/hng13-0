// // Display current time in milliseconds
// const timeElement = document.querySelector('[data-testid="test-user-time"]');
// if (timeElement) {
//     timeElement.textContent = Date.now();
// }

// Display current time in milliseconds and update every second
const timeElement = document.querySelector('[data-testid="test-user-time"]');

if (timeElement) {
    // Function to update the time
    function updateTime() {
        timeElement.textContent = Date.now();
    }

    // Set initial time
    updateTime();

    // Update every second (1000 milliseconds)
    setInterval(updateTime, 1000);
}
