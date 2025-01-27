// Store command history and current position
const commandHistory = [];
let historyPosition = -1;

// Get DOM elements
const input = document.getElementById('input');
const terminal = document.getElementById('textarea');
const span = document.getElementById('span');
const sections = document.querySelectorAll('.section');

// Initialize terminal with welcome message
window.addEventListener('load', () => {
    const welcomeMessage = `
    Welcome to Thomas's Portfolio Terminal
    Type 'help' to see available commands
    ===============================
    `;
    terminal.value = welcomeMessage;
});

// Command object containing all available commands
const commandObj = {
    'help': () => {
        return `
Available commands:
    - help: Displays available commands
    - clear: Clears terminal window
    - cd [directory]: Change directory (home, about, works, contact, resume)
    - ls: List all available sections
    - ls works: Lists specific works/projects
    - ls about: Lists skills/technologies
    - date: Show current date/time
    - echo [text]: Display text in terminal
    - exit: Exits the terminal
    `;
    },
    'clear': () => {
        terminal.value = '';
        return '';
    },
    'ls': (args) => {
        if (!args) {
            return `
Available sections:
    home/
    about/
    works/
    contact/
    resume/
            `;
        }
        
        switch (args.toLowerCase()) {
            case 'works':
                return `
Projects:
    - Portfolio Terminal (JavaScript, HTML, CSS, Python)
    - [Add other projects here]
                `;
            case 'about':
                return `
Skills & Technologies:
    - Frontend: HTML, CSS, JavaScript
    - data sorting: Python
                `;
            default:
                return `Invalid argument. Try 'ls' without arguments or 'ls works/about'`;
        }
    },
    'cd': (directory) => {
        if (!directory) {
            return "Error: Please specify a directory (home, about, works, contact, or resume)";
        }

        // Hide all sections first
        sections.forEach(section => {
            section.style.display = 'none';
        });

        const dir = directory.toLowerCase();
        const validDirectories = ['home', 'about', 'works', 'contact', 'resume'];
        
        if (validDirectories.includes(dir)) {
            span.innerHTML = `PS C:\\Users\\Thomas\\${directory.charAt(0).toUpperCase() + directory.slice(1)}>`;
            const targetSection = document.getElementById(dir);
            if (targetSection) {
                targetSection.style.display = 'block';
                return `Changed directory to ${directory}`;
            }
        }
        
        return `Error: Invalid directory. Use "cd" followed by "home", "about", "works", "contact", or "resume"`;
    },
    'date': () => {
        return new Date().toLocaleString();
    },
    'echo': (text) => {
        return text || '';
    },
    'exit': () => {
        setTimeout(() => {window.location.href =  'https://www.youtube.com/watch?v=Rmp6zIr5y4U&list=RDhVkBlsgthLg&index=2';
         }, 3000);
        return `Exiting terminal...`;}
        
        

    }


// Process command and return appropriate response
function processCommand(commandLine) {
    const args = commandLine.trim().split(' ');
    const command = args[0].toLowerCase();
    const commandArgs = args.slice(1).join(' ');

    if (command === '') {
        return '';
    }

    const commandFunction = commandObj[command];
    if (commandFunction) {
        return commandFunction(commandArgs);
    } 

    return `Command not found: ${command}. Type 'help' for available commands.`;
}

// Handle command history navigation
function handleArrowKeys(event) {
    if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (historyPosition < commandHistory.length - 1) {
            historyPosition++;
            input.value = commandHistory[commandHistory.length - 1 - historyPosition];
        }
    } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (historyPosition > 0) {
            historyPosition--;
            input.value = commandHistory[commandHistory.length - 1 - historyPosition];
        } else if (historyPosition === 0) {
            historyPosition = -1;
            input.value = '';
        }
    }
}

// Main input event handler
input.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const commandLine = input.value;
        const response = processCommand(commandLine);
        
        // Add command to terminal display
        terminal.value += `${span.innerHTML} ${commandLine}\n`;
        if (response) {
            terminal.value += `${response}\n`;
        }
        
        // Add command to history and reset position
        if (commandLine.trim()) {
            commandHistory.unshift(commandLine);
        }
        historyPosition = -1;
        
        // Clear input and scroll to bottom
        input.value = '';
        terminal.scrollTop = terminal.scrollHeight;
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        handleArrowKeys(event);
    }
});

// Ensure input maintains focus
document.addEventListener('click', () => {
    input.focus();
});
