const input = document.getElementById('input');
const terminal = document.getElementById ('textarea');
const span = document.getElementById('span');


const commandObj = {
    'help': () => { return `
        Available commands:
            - help: Displays avaible commands
            - clear: Clears all commands from terminal window
            - cd: Change current directory(home, about, works, contact, resume)
            - ls: List all available files/ desctions in terminal
            - ls works: Lists specific works/projects.
            - ls about: LIsts skills/ tech used
            - date: Show the current date/time
            - echo ['your name']: for a personalized message
            - exit: Exits the terminal
            `
    },
    'clear': () => {
        terminal.innerHTML = '';
        input.value = '';
    },
    'cd': (directory) =>{
        switch(directory.toLowerCase()) {
            case 'home':
                span.innerHTML = "PS C:\Users\Thomas>"
                    
                break;
            case 'about':
                terminal.innerHTML += `${span.innerText} Current directory: about\n`;
                break;
            case 'works':
                terminal.innerHTML += `${span.innerText} Current directory: works\n`;
                break;
            case 'contact':
                terminal.innerHTML += `${span.innerText} Current directory: contact\n`;
                break;
            case'resume':
                terminal.innerHTML += `${span.innerText} Current directory: resume\n`;
                break;
            default:
                terminal.innerHTML += `${span.innerText} Error: Invalid directory. Use "cd" followed by "home", "about", "works", "contact", or "resume".\n`;
        }
    }}


input.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        if (!input.value) {
            terminal.innerHTML += `${span.innerText} Error: please enter an input into the command line. If you need help, use "help" within the command line.\n`;
        }else if (input.value.toLowerCase() === 'clear') {
        terminal.innerHTML = '';
        input.value = ''
    }
    } 
});
