const { ipcRenderer } = require("electron");

window.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.shutdown');
    button.addEventListener('click', ()=> {
        ipcRenderer.send('execute-command', 'shutdown /s /t 60')
    });
})
