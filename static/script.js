function pressKey(key) {
    fetch('/press_key/' + key);
}

function toggleStroke(element) {
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
const saveButton = document.querySelector('#save-button');

if (!saveButton) {
  console.error('Save button not found');
} else {
  // Add the event listener
  saveButton.addEventListener('click', function() {
    // Select all clicked divs and extract their image paths
    const clickedDivs = document.querySelectorAll('.button-container.clicked');
    const imagePaths = Array.from(clickedDivs)
      .map(div => {
        const image = div.querySelector('img');
        return image ? image.getAttribute('src') : null;
      })
      .filter(path => path !== null);

    // Log the image paths
    console.log('Image paths:', imagePaths);

    // Send a POST request to the Flask route
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
  });
}
// Select all clicked divs
const clickedDivs = document.querySelectorAll('.button-container.clicked');
console.log('Clicked divs:', clickedDivs);

const imagePaths = Array.from(clickedDivs)
  .map(div => {
    // Select the image inside the div
    const image = div.querySelector('img');
    console.log('Image:', image);

    return image ? image.getAttribute('src') : null;
  })
  .filter(path => path !== null);

  // Select the remove button
const removeButton = document.querySelector('#remove-button');

if (!removeButton) {
  console.error('Remove button not found');
} else {
  // Add the event listener
  removeButton.addEventListener('click', function() {
    // Select all clicked divs and extract their image paths
    const clickedDivs = document.querySelectorAll('.button-container.clicked');
    const imagePaths = Array.from(clickedDivs)
      .map(div => {
        const image = div.querySelector('img');
        return image ? image.getAttribute('src') : null;
      })
      .filter(path => path !== null);

    // Log the image paths
    console.log('Image paths:', imagePaths);

    // Send a POST request to the Flask route
    fetch('/remove_image_paths', {
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
  });
}