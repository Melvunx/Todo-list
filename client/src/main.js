import { createApp } from 'vue'
import App from './App.vue'


createApp(App).mount('#app')


// Change text Button

document.getElementById("add-btn").addEventListener("click", function() {
    this.textContent = "To-do added !";

    setTimeout(() => {
        this.textContent = "Add To-do";
    }, 2500);
});
