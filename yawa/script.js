const button = document.querySelector(".menu-button");
const noteMenu = document.querySelector(".note-menu");
const content = document.querySelector(".content");

// Create a circle indicator element
const circleIndicator = document.createElement("div");
circleIndicator.classList.add("circle-indicator");
content.appendChild(circleIndicator); // Append it to the content div

// Function to set up event listeners for delete buttons
function setupDeleteButtons() {
  document.querySelectorAll('.delete-note').forEach(function(deleteLink) {
    deleteLink.addEventListener('click', function(event) {
      event.preventDefault();
      
      // Find the closest .header element and remove it
      const noteHeader = this.closest('.header');
      if (noteHeader) {
        noteHeader.remove();
      }
    });
  });
}

// Function to add a new note
function addNewNote() {
  // Create the new header div
  const newHeader = document.createElement("div");
  newHeader.classList.add("header");

  // Add the HTML content for the new header
  newHeader.innerHTML = `
    <nav class="note-bar">
      <a href="#" class="note-branding">Notes ${document.querySelectorAll('.header').length + 1}</a>
      <button class="menu-button">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </button>
    </nav>
  
    <ul class="note-menu">
      <li class="note-item">
        <a href="#" class="note-link">Add to Favorites</a>
      </li>
      <li class="note-item">
        <a href="#" class="note-link">Remove from Favorites</a>
      </li>
      <li class="note-item">
        <a href="#" class="note-link delete-note">Delete Note</a>
      </li>
    </ul>
  
    <div class="content">
      <textarea class="note-textarea" placeholder="Write your note here..."></textarea>
    </div>
  `;

  // Insert the new header at the beginning of the body
  const body = document.querySelector(".body");
  body.insertBefore(newHeader, body.firstChild);

  // Add event listeners for the new menu button and note links
  const newMenuButton = newHeader.querySelector(".menu-button");
  const newNoteMenu = newHeader.querySelector(".note-menu");
  const newNoteLinks = newHeader.querySelectorAll(".note-link");

  newMenuButton.addEventListener("click", () => {
    newMenuButton.classList.toggle("active");
    newNoteMenu.classList.toggle("active");
  });

  newNoteLinks.forEach((n) => {
    n.addEventListener("click", (e) => {
      const linkText = e.target.textContent;
      newMenuButton.classList.remove("active");
      newNoteMenu.classList.remove("active");

      if (linkText === "Add to Favorites") {
        // Create or show the circle indicator
        let circleIndicator = newHeader.querySelector(".circle-indicator");
        if (!circleIndicator) {
          circleIndicator = document.createElement("div");
          circleIndicator.classList.add("circle-indicator");
          newHeader.querySelector(".content").appendChild(circleIndicator);
        }
        circleIndicator.style.display = "block"; // Show the orange circle
      } else if (linkText === "Remove from Favorites") {
        // Hide the circle indicator if present
        const circleIndicator = newHeader.querySelector(".circle-indicator");
        if (circleIndicator) {
          circleIndicator.style.display = "none"; // Hide the orange circle
        }
      }
    });
  });

  // Add the editable functionality to new note branding
  const newNoteBranding = newHeader.querySelector('.note-branding');
  newNoteBranding.addEventListener('dblclick', function() {
    const currentText = this.textContent;

    // Create a new input element
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.classList.add('editable-input');

    // Replace the existing text with the input element
    this.innerHTML = '';
    this.appendChild(input);

    // Focus and select the input text
    input.focus();
    input.select();

    // Handle blur event to save the changes
    input.addEventListener('blur', function() {
      const newText = this.value;

      // Replace the input with the new text
      this.parentElement.textContent = newText;

      // Optionally, you can perform additional actions here, like saving changes
    });

    // Handle enter key to save changes
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        this.blur();
      }
    });
  });

  // Set up delete buttons for the new notes
  setupDeleteButtons();
}

// Attach event listener to plus-button to add new note
document.querySelector(".plus-button").addEventListener("click", addNewNote);

// Initial setup for existing delete buttons
setupDeleteButtons();

button.addEventListener("click", () => {
  button.classList.toggle("active");
  noteMenu.classList.toggle("active");
});

document.querySelectorAll(".note-link").forEach((n) => {
  n.addEventListener("click", (e) => {
    const linkText = e.target.textContent;
    button.classList.remove("active");
    noteMenu.classList.remove("active");

    if (linkText === "Add to Favorites") {
      circleIndicator.style.display = "block"; // Show the orange circle
    } else if (linkText === "Remove from Favorites") {
      circleIndicator.style.display = "none"; // Hide the orange circle
    }
  });
});

// Adjust content size
function adjustContentSize() {
  const content = document.querySelector('.content');
  const borderWidth = parseInt(window.getComputedStyle(content).borderWidth);
  content.style.width = `calc(100% - ${borderWidth * 2}px)`;
  content.style.height = `calc(100% - ${borderWidth * 2}px)`;
}

// Adjust size on initial load and if necessary, on window resize
window.addEventListener('load', adjustContentSize);
window.addEventListener('resize', adjustContentSize);
