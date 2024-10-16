const screen = document.getElementById('screen');
const optionsList = document.getElementById('options-list');
const selectedOptionText = document.getElementById('selected-option');

const options = [
    "About Us",
    "UI Designs",
    "Mini Games",
    "ARGs",
    "Simulations",
    "Contact Us",
    "CV"
];

const uiDesignOptions = [
    "Design 1",
    "Design 2"
];

const miniGameOptions = [
    "Punchin' Time!",
    "Drifting Off"
];

const contactOptions = [
    { name: "Instagram", url: "https://www.instagram.com/c_xxy_xu?igsh=NTc4MTIwNjQ2YQ==" },
    { name: "Behanced", url: "Totally Exists Yup Yup" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/charlene-xu/" }
];

let currentIndex = 0;
let inOptionsMenu = true;
let inUiDesignMenu = false;
let inMiniGameMenu = false;
let inContactMenu = false;

function updateScreen() {
    const currentOptions = inMiniGameMenu ? miniGameOptions :
                          inUiDesignMenu ? uiDesignOptions :
                          inContactMenu ? contactOptions.map(option => option.name) :
                          options;

    optionsList.innerHTML = currentOptions.map((option, index) => {
        return `<div class="option ${index === currentIndex ? 'highlight' : ''}">${option}</div>`;
    }).join('');
    selectedOptionText.innerHTML = `Use A to select: ${currentOptions[currentIndex]}`;
}

// Initialize the screen
updateScreen();

document.getElementById('a').addEventListener('click', () => {
    if (inOptionsMenu) {
        if (currentIndex === 0) { // "About Us"
            screen.innerHTML = `
                <div class="scrollable">
                    <p style="margin:10px;">An avid lover of both interaction design and storytelling, Charlene Xu enjoys crafting engaging narrative experiences through thoughtful design and gamification. Having studied at RMIT University in the Bachelor's Degree of Design (Digital Media), she has a great amount of interest and passion in games and gamified experiences that not only captivate users but also immerse them in compelling narratives. Willing to explore new innovative ways to blend aesthetics with gameplay elements to enhance user engagement, Charlene wishes to make it in the games industry as a narrative and interface designer.</p>
                </div>`;
            optionsList.innerHTML = ""; // Clear options
            selectedOptionText.style.display = "none"; // Hide prompt
            inOptionsMenu = false; // Exit options menu
        } else if (currentIndex === 1) { // "UI Designs"
            inUiDesignMenu = true; // Enter UI Designs submenu
            currentIndex = 0; // Reset current index for submenu
            updateScreen();
        } else if (currentIndex === 2) { // "Mini Games"
            inMiniGameMenu = true; // Enter Mini Games submenu
            currentIndex = 0; // Reset current index for submenu
            updateScreen();
        } else if (currentIndex === 5) { // "Contact Us"
            inContactMenu = true; // Enter Contact submenu
            currentIndex = 0; // Reset current index for submenu
            updateScreen();
        }
    } else if (inUiDesignMenu) {
        // Handle UI Designs submenu selection
        if (currentIndex === 0) {
            screen.innerHTML = "Design 1 Images Displayed!";
            optionsList.innerHTML = ""; // Clear options
            selectedOptionText.style.display = "none"; // Hide prompt
            inUiDesignMenu = false; // Exit UI Designs submenu
        } else if (currentIndex === 1) {
            screen.innerHTML = "You selected Design 2!";
            optionsList.innerHTML = ""; // Clear options
            selectedOptionText.style.display = "none"; // Hide prompt
            inUiDesignMenu = false; // Exit UI Designs submenu
        }
    } else if (inMiniGameMenu) {
        if (currentIndex === 0) { // "Punchin' Time!"
            window.open("https://scratch.mit.edu/projects/1075088739/embed", "_blank"); // Open game in a new window
            optionsList.innerHTML = ""; // Clear options
            selectedOptionText.style.display = "none"; // Hide prompt
            inMiniGameMenu = false; // Exit Mini Games submenu
        } else if (currentIndex === 1) { // "Drifting Off"
            screen.innerHTML = "You selected Drifting Off!";
            optionsList.innerHTML = ""; // Clear options
            selectedOptionText.style.display = "none"; // Hide prompt
            inMiniGameMenu = false; // Exit Mini Games submenu
        }
    } else if (inContactMenu) {
        // Open the selected contact link
        const selectedContact = contactOptions[currentIndex];
        window.open(selectedContact.url, "_blank");
        inContactMenu = false; // Exit Contact submenu
        currentIndex = 5; // Reset to Contact Us
        updateScreen();
    }
});

document.getElementById('b').addEventListener('click', () => {
    // Return to the previous menu
    if (inMiniGameMenu) {
        inMiniGameMenu = false; // Exit the Mini Games submenu
        currentIndex = 2; // Set index to Mini Games
    } else if (inUiDesignMenu) {
        inUiDesignMenu = false; // Exit the UI Designs submenu
        currentIndex = 1; // Set index to UI Designs
    } else if (inContactMenu) {
        inContactMenu = false; // Exit the Contact submenu
        currentIndex = 5; // Set index to Contact Us
    } else {
        currentIndex = 0; // Reset the current index
    }
    inOptionsMenu = true; // Go back to options menu
    updateScreen(); // Update options on the screen
    selectedOptionText.style.display = "block"; // Show prompt again
    screen.innerHTML = ""; // Clear selection message
});









document.getElementById('start').addEventListener('click', () => {
    screen.innerHTML = "Game Started!";
    selectedOptionText.innerHTML = "";
    optionsList.innerHTML = ""; // Clear options
    inOptionsMenu = false; // Exit options menu
});

document.getElementById('select').addEventListener('click', () => {
    screen.innerHTML = "Select Pressed!";
    selectedOptionText.innerHTML = "";
    optionsList.innerHTML = ""; // Clear options
    inOptionsMenu = false; // Exit options menu
});

document.getElementById('up').addEventListener('click', () => {
    if (inOptionsMenu || inUiDesignMenu) {
        currentIndex = (currentIndex - 1 + (inUiDesignMenu ? uiDesignOptions.length : options.length)) % (inUiDesignMenu ? uiDesignOptions.length : options.length);
        updateScreen();
    }
});

document.getElementById('down').addEventListener('click', () => {
    if (inOptionsMenu || inUiDesignMenu) {
        currentIndex = (currentIndex + 1) % (inUiDesignMenu ? uiDesignOptions.length : options.length);
        updateScreen();
    }
});
