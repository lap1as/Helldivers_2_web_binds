/*function pressKey(key) {
    fetch('/press_key/' + key);
}*/

function toggleStroke(element) {
    // Get all currently selected elements
    const selectedElements = document.querySelectorAll('.button-container.clicked');
    console.log(selectedElements)

    // If there are already 30 selected elements and the current one is not selected, return
    if (selectedElements.length >= 29 && !element.classList.contains('clicked')) {
        alert('You can only select up to 30 images')
        return;
    }

    // Otherwise, toggle the 'clicked' class as usual
    element.classList.toggle('clicked');
}


function toggleFullscreen() {
    var button = document.getElementById("fullscreenButton");
    var icon = document.getElementById("fullscreenIcon");

    if (!document.fullscreenElement && !document.mozFullScreenElement &&
        !document.webkitFullscreenElement && !document.msFullscreenElement) {
        // If currently not in fullscreen mode
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
        icon.src = "/static/fullscreenOff.png";
    } else {
        // If currently in fullscreen mode
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        icon.src = "/static/fullscreenOn.png";
    }
}

// Event listener for fullscreen change
document.addEventListener("fullscreenchange", function () {
    var icon = document.getElementById("fullscreenIcon");
    if (document.fullscreenElement || document.mozFullScreenElement ||
        document.webkitFullscreenElement || document.msFullscreenElement) {
        // Switch icon to fullscreen off when entering fullscreen
        icon.src = "/static/fullscreenOff.png";
    } else {
        // Switch icon to fullscreen on when exiting fullscreen
        icon.src = "/static/fullscreenOn.png";
    }
});

// Select the save button
// Function to save clicked divs image paths
function collectImagePaths() {
    // Select all clicked divs
    const clickedDivs = document.querySelectorAll('.button-container.clicked');

    // Extract image paths from clicked divs
    const imagePaths = Array.from(clickedDivs).map(div => {
        const image = div.querySelector('img');
        return image ? image.getAttribute('src') : null;
    }).filter(path => path !== null);

    // Log the image paths
    console.log('Image paths:', imagePaths);

    return imagePaths;
}

function sendImagePaths(imagePaths) {
    // Send a POST request to the server to save image paths
    fetch('/save_image_paths', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imagePaths }),
    })
    .then(response => response.text())
    .then(data => {
        // Log the server response
        console.log('Server response:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function saveImagePaths() {
    const imagePaths = collectImagePaths();
    sendImagePaths(imagePaths);
    return imagePaths;
}

// Event listener for the save button
const saveButton = document.querySelector('#save-button');
if (saveButton) {
    saveButton.addEventListener('click', saveImagePaths);
} else {
    console.error('Save button not found');
}

// Event listener for the reset button
const resetButton = document.querySelector('#reset-button');
if (resetButton) {
    resetButton.addEventListener('click', () => {
        // Remove the 'clicked' class from all clicked divs
        const clickedDivs = document.querySelectorAll('.button-container.clicked');
        clickedDivs.forEach(div => {
            div.classList.remove('clicked');
        });
    });
} else {
    console.error('Reset button not found');
}

//Generate a button from saved image paths
function generateButton() {
    const div = document.querySelector('.selected-buttons-grid');
}
window.onload = function() {
    fetch('/static/divConfig/imagePaths.json')
        .then(response => response.json())
        .then(data => {
            // Select the .selected-buttons-grid div
            const container = document.querySelector('.default-buttons-grid');

            // Iterate over the data
            data.forEach(imagePath => {
                // Create a new div element
                const div = document.createElement('div');
                const name = imagePath.split('/').slice(-1)[0].split('.')[0];
                div.className = 'button-container';
                div.classList.add(name);
                // Add an event listener to the div
                div.addEventListener('click', function() {
                    // Get the stratagem name from the alt attribute of the img
                    const stratagemName = img.alt;

                    // Send a request to the /press_stratagem/<stratagem_name> endpoint
                    fetch('/press_stratagem/' + stratagemName)
                        .then(response => response.text())
                        .then(message => console.log(message));
                });

                // Create a new div for the background square
                const backgroundSquare = document.createElement('div');
                backgroundSquare.className = 'background-square';

                // Create a new img element
                const img = document.createElement('img');
                img.className = 'button-svg';
                img.src = imagePath; // Set the src attribute to the image path
                img.alt = name // Set the alt attribute to the image name without the .png extension
                img.width = '64';
                img.height = '64';

                // Create a new svg element
                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg.setAttribute('viewBox', '0 0 64 64');

                // Create a new rect element
                const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                rect.setAttribute('width', '100%');
                rect.setAttribute('height', '100%');
                rect.setAttribute('fill', 'none');
                rect.setAttribute('rx', '10');
                rect.setAttribute('ry', '10');

                // Append the rect to the svg
                svg.appendChild(rect);

                // Append the img and svg to the background square
                backgroundSquare.appendChild(img);
                backgroundSquare.appendChild(svg);

                // Append the background square to the div
                div.appendChild(backgroundSquare);

                // Append the div to the .selected-buttons-grid container
                container.appendChild(div);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });

}