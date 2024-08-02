<template>
    <body>
        <header>
            <h1>Melvunx's To-do list</h1>
        </header>  
        <div id="card-form-container">
            <div class="card-form">
                <div id="grid-form">

                    <form @submit.prevent="addTodo" id="add-todo-form">
                        <div class="grid-form-content">
                            <div id="form-disposition-container">
                                <div>
                                    <label for="list" class="add-label-form" id="newtodo-label">New To-do List </label>
                                </div>
                            <div>
                                <textarea placeholder="New note.." id="list" v-model="newTodo.list" required ></textarea>
                            </div>
                        </div>
                    </div>
                </form>

                <form @submit.prevent="addTodo" id="add-todo-form">
                    <div class="grid-form-content">
                        <div class="form-add-container">
                            <div class="form-add-content">
                                <label class="label-container" for="important">
                                    <span class="label">Important note </span>
                                    <input type="checkbox" id="important" v-model="newTodo.important" style="display: none;">
                                    <div class="checkmark" :class="{ 'checked': newTodo.important }"></div>
                                </label>
                            </div>
                            <div class="form-add-content">
                                <button id="add-btn" type="submit">Add To-do</button>
                            </div>
                        </div>
                    </div>
                </form>
                <!-- search form -->
                <form @submit.prevent="searchTodo">
                    <div class="grid-form-content">
                        <div id="form-disposition-container">
                            <div>
                                <label for="search" class="add-label-form">To search note :</label>
                            </div>
                            <div id="search-zone">
                                <input type="text" id="search-input" placeholder="Search todo.." v-model="searchText" name="entree" required>
                            </div>
                            <div>
                                <div class="form-search-container">
                                    <div class="form-search-content">
                                        <button class="search-btn" id="search-sp-btn"  type="submit">Search Note</button>
                                    </div>
                                    <div class="form-search-content">
                                        <button class="search-btn" v-if="showBackButton" @click="goBackToTasks">Back to Tasks</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- Todo list content -->
    <div id="card-container">
            <draggable v-model="todolist" @end="updateListOrder" item-key="id" group="todolist" class="drag">
                <template #item=" {element : todo} ">
                    <div :class="{'todoImportant': todo.important, 'NotTodoImportant': !todo.important}">
                        <div class="card">
                            <div id="grid-todolist-content">
                                <div class="grid-todolist-content">
                                    <label>
                                        <input type="checkbox" class="input" @change="updateStatus(todo, $event)">
                                        <span class="custom-checkbox"></span>
                                    </label>
                                </div>
                                <div class="grid-todolist-content">
                                    <p class="p-todo" :class="{ 'strikethrough': todo.status === 1 }">{{ todo.list }}</p>
                                </div>
                                <div class="grid-todolist-content">
                                    <div id="grid-btn">
                                        <div class="grid-btn-content">
                                            <button @click="toggleImportance(todo)" :class="{'btn-unmark': todo.important, 'btn-mark': !todo.important}"> 
                                                {{ todo.important ? 'Unmark' : 'Mark' }}
                                            </button>
                                        </div>
                                        <div class="grid-btn-content">
                                            <button class="bin-button" @click="deleteTodo(todo.id)">
                                                <svg
                                                class="bin-top"
                                                viewBox="0 0 39 7"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                >
                                                <line y1="5" x2="39" y2="5" stroke="white" stroke-width="4"></line>
                                                <line
                                                    x1="12"
                                                    y1="1.5"
                                                    x2="26.0357"
                                                    y2="1.5"
                                                    stroke="white"
                                                    stroke-width="3"
                                                ></line>
                                                </svg>
                                                <svg
                                                class="bin-bottom"
                                                viewBox="0 0 33 39"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <mask id="path-1-inside-1_8_19" fill="white">
                                                    <path
                                                        d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                                                    ></path>
                                                    </mask>
                                                    <path
                                                    d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                                                    fill="white"
                                                    mask="url(#path-1-inside-1_8_19)"
                                                ></path>
                                                <path d="M12 6L12 29" stroke="white" stroke-width="4"></path>
                                                <path d="M21 6V29" stroke="white" stroke-width="4"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </draggable>
        </div>
    </body>
</template>

<script>
import axios from 'axios';
import draggable from 'vuedraggable';

export default {
    components:{
        draggable,
    },

    data() {
        return {
            todolist: [],
            newTodo: {
                list: '',
                status: 0,
                important: '',
                position: '',
            },
        searchText: '',
        showBackButton: false, // Ajout de la variable showBackButton
        };
    },

    methods: {
            async addTodo() {
                await axios.post('http://localhost:3000/api/add', this.newTodo);
                this.newTodo = { list: '', important: '' };
                await this.fetchTodoList();
            },

            goBackToTasks() {
            window.location.reload();
            },

            async updateStatus(todo, event) {
                if (event.target.checked) {
                    todo.status = 1;
                } else {
                    todo.status = 0;
                }
                await axios.put(`http://localhost:3000/api/update/statut/${todo.id}`, todo);
            },

            async searchTodo() {
                try {
                    const response = await axios.get(`http://localhost:3000/api/search?entree=${this.searchText}`);
                    this.todolist = response.data;
                    this.showBackButton = true; // Afficher le bouton de retour
                } catch (error) {
                    console.error('Error searching todos:', error);
                }
            },

            async deleteTodo(todoId) {
                await axios.delete(`http://localhost:3000/api/delete/${todoId}`);
                await this.fetchTodoList();
            },

            async fetchTodoList() {
                const response = await axios.get('http://localhost:3000/api/data');
                this.todolist = response.data.sort((a, b) => {
                    if (a.important && !b.important) return -1; 
                    if (!a.important && b.important) return 1; 
                    return 0; 
                });
            },

            async toggleImportance(todo){
                todo.important = !todo.important;
                const updatedTodo = { ...todo }; 
                await axios.put(`http://localhost:3000/api/update/important/${todo.id}`, { important: updatedTodo.important });
                await this.reorderImportantTask(updatedTodo);
            },

            async reorderImportantTask(todo){
                if (todo.important) {
                    const index = this.todolist.findIndex(item => item.id === todo.id);
                    if (index > 0) {
                        const importantTask = this.todolist.splice(index, 1)[0];
                        this.todolist.unshift(importantTask);
                    }
                }
            },

            async updateListOrder() {
                const todoIds = this.todolist.map(todo => todo.id);
                    try {
                        // Envoyer la liste triée au backend pour mise à jour
                        await axios.put('http://localhost:3000/api/updateOrder', { todoIds });
                        console.log('Order updated successfully');
                        // Mettre à jour filteredTodoList avec le nouvel ordre des tâches
                    } catch (error) {
                        console.error('Error updating order:', error);
                    }
            },

    },

        async mounted() {
            await this.fetchTodoList();
        },
};


</script>



<style>
/*--------------------------------- all body ----------------------<--------------*/


    body{
        margin: 0;
        padding: 0;
        background-image: url('/public/image/todolistImage.webp');
        background-attachment: fixed;
        background-size: cover;
        width: 100%;
        height: 100vh;
    }

    header{
        text-align: center;
        color: #fff;
        background: linear-gradient(0deg, #add8e682, #fff);
        padding: 15px;
        text-shadow: -1px 1px 0 #000,1px 1px 0 #000,1px -1px 0 #000,-1px -1px 0 #000;
        font-family: 'Times New Roman';
    }

    #search-btn{
        background-color: black;
        color: #fff;
    }

    #delete-btn{
        float: inline-end;

    }

    #grid-form{
        max-width: 1300px;
        margin: 15px auto;   
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        gap: 25px;
    }

    
    .grid-form-content{
        width: 315px;
        height: 115px;
        padding: 15px;
        border-radius: 10px;
        box-shadow: 0px 2px 4px rgba(0,0,0,0.3);
        display: flex;
        overflow: hidden;
        justify-content: center;
        align-items: center;
        background-color: lightgray;
    }


    #form-disposition-container{
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        gap: 5px
    }

    #form-disposition-container textarea{
        padding: 8px;
        width: 100%;
        height: 80px;
        box-sizing: border-box;
        border: 2px solid salmon;
        border-radius: 8px;
        background-color:#f8f8f8;
        font-size: 14px;
        letter-spacing: 1px;
        resize: none;
        font-weight: bold;
        font-family: cursive;
        box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.4);
    }

    .form-add-container{
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        gap: 12px
    }

    .form-add-content label{
        color: orange;
    }

    .form-search-container{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px
    }


    
    #add-btn {
        align-items: center;
        appearance: none;
        background-color: #FCFCFD;
        border-radius: 4px;
        border-width: 0;
        box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
        box-sizing: border-box;
        color: #36395A;
        cursor: pointer;
        display: inline-flex;
        font-family: "JetBrains Mono",monospace;
        height: 41px;
        justify-content: center;
        line-height: 1;
        list-style: none;
        overflow: hidden;
        padding-left: 14px;
        padding-right: 14px;
        position: relative;
        text-align: left;
        text-decoration: none;
        transition: box-shadow .15s,transform .15s;
        user-select: none;
        touch-action: manipulation;
        white-space: nowrap;
        will-change: box-shadow,transform;
        font-size: 17px;
    }
    
    #add-btn:focus {
        box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
    }
    
    #add-btn:hover {
        box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
        transform: translateY(-2px);
    }
    
    #add-btn:active {
        box-shadow: #D6D6E7 0 3px 7px inset;
        transform: translateY(2px);
    }

    .search-btn{
        background-color: #e1ecf4;
        border-radius: 3px;
        border: 1px solid #7aa7c7;
        box-shadow: rgba(255, 255, 255, .7) 0 1px 0 0 inset;
        box-sizing: border-box;
        color: #39739d;
        cursor: pointer;
        display: inline-block;
        font-family: -apple-system,system-ui,"Segoe UI","Liberation Sans",sans-serif;
        font-size: 13px;
        font-weight: 600;
        line-height: 1.15385;
        letter-spacing: 0.3px;
        margin: 0;
        outline: none;
        padding: 8px .8em;
        position: relative;
        text-align: center;
        text-decoration: none;
        touch-action: manipulation;
        vertical-align: baseline;
        white-space: nowrap;
    }

    .search-btn:hover,.search-btn:focus {
        background-color: #b3d3ea;
        color: #2c5777;
    }

    .search-btn:focus {
        box-shadow: 0 0 0 4px rgba(0, 149, 255, .15);
    }

    .search-btn:active {
        background-color: #a0c7e4;
        box-shadow: none;
        color: #2c5777;
    }

    .bin-button {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 40px;
        border-radius: 15px;
        background-color: rgb(71, 67, 67);
        cursor: pointer;
        border: 2px solid black;
        margin-top: 6.5px;
        transition-duration: 0.3s;
    }
    .bin-bottom {
        width: 11px;
    }
    .bin-top {
        width: 13px;
        transform-origin: right;
        transition-duration: 0.3s;
    }
    .bin-button:hover .bin-top {
        transform: rotate(45deg);
    }
    .bin-button:hover {
        background-color: black;
    }
    .bin-button:active {
        transform: scale(0.9);
    }

    #search-zone{
        width: 210px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(to bottom,rgb(227, 213, 255),rgb(255, 231, 231));
        border-radius: 30px;
        overflow: hidden;
        cursor: pointer;
        box-shadow: 0px 0px 4px 3px rgba(0,0,0,0.4);
        margin: 8px;
    }

    #search-input{
        width: 185px;
        height: 36px;
        border: none;
        outline: none;
        caret-color: rgb(255, 81, 0);
        background-color: rgb(255, 255, 255);
        border-radius: 18px;
        padding-left: 15px;
        letter-spacing: 0.8px;
        color: rgb(19, 19, 19);
        font-size: 13.4px;
    }

    #card-container{
        container-type: inline-size;
        display: flex;
        flex-direction:column;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap:20px;
    }

    #card-form-container{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        margin: 20px;
    }
    
    #newtodo-label{
        color: mediumturquoise;
        font-weight: bold;
        display: block;
    }

    .card-form{
        width: 80%;
        padding: 25px;
        border-radius: 10px;
        box-shadow: 0px 2px 4px rgba(0,0,0,0.3);
        overflow: hidden;
        background: #f5f5f5d1;
        text-align: center;
        color: greenyellow;
        text-shadow: -1px 1px 0 #000,1px 1px 0 #000,1px -1px 0 #000,-1px -1px 0 #000;
        font-family: Arial;
    }

    .card{
        position: relative;
        width: 96%;
        padding: 15px;
        border-radius: 10px;
        box-shadow: 0px 2px 4px rgba(0,0,0,0.3);
        overflow: hidden;
        background:rgba(245, 245, 245, 0.478);
        text-align: center;
        cursor: move;
    }

    .todoImportant{
        position: relative;
        width: 700px;
        padding: 10px;
        border-radius: 10px;
        box-shadow: 0px 2px 4px rgba(0,0,0,0.3);
        overflow: hidden;
        text-align: center;
        font-size: 22px;
        text-shadow: -1px 1px 0 #000,1px 1px 0 #000,1px -1px 0 #000,-1px -1px 0 #000;
        font-family: system-ui;
        background-color: #ed4242;
        color: orangered;
        font-style: italic;
        cursor: move;
    }

    .NotTodoImportant{
        position: relative;
        width: 700px;
        padding: 10px;
        border-radius: 10px;
        box-shadow: 0px 2px 4px rgba(0,0,0,0.3);
        overflow: hidden;
        text-align: center;
        font-size: 22px;
        font-family: system-ui;
        text-shadow: -1px 1px 0 #000,1px 1px 0 #000,1px -1px 0 #000,-1px -1px 0 #000;
        background-color: darkolivegreen;
        color: rgb(160, 228, 58);
        cursor: move;
    }

    .p-todo{
        cursor: crosshair;
    }
    
    .btn-unmark{
        background-color: #eee;
        border: none;
        padding: 1rem;
        font-size: 15px;
        width: 6em;
        height: 3em;
        border-radius: 1rem;
        color: rgb(54, 149, 54);
        box-shadow: 0 0.4rem #dfd9d9;
        cursor: crosshair;
        letter-spacing: 1px;
    }

    .btn-unmark:active {
        font-weight: 500;
        color: white;
        box-shadow: 0 0.2rem #dfd9d9;
        transform: translateY(0.2rem);
        letter-spacing: 1px;
    }
    
    .btn-unmark:hover:not(:disabled) {
        background: rgb(54, 149, 54);
        color: white;
        text-shadow: 0 0.1rem #bcb4b4;
        letter-spacing: 1px;
    }
    
    .btn-unmark:disabled {
        cursor: auto;
        color: grey;
    }
    .btn-mark{
        background-color: #eee;
        border: none;
        padding: 1rem;
        font-size: 15px;
        width: 6em;
        height: 3em;
        border-radius: 1rem;
        color: lightcoral;
        box-shadow: 0 0.4rem #dfd9d9;
        cursor: crosshair;
        letter-spacing: 1px;
    }

    .btn-mark:active {
        color: white;
        font-weight: 500;
        box-shadow: 0 0.2rem #dfd9d9;
        transform: translateY(0.2rem);
    }
    
    .btn-mark:hover:not(:disabled) {
        background: lightcoral;
        color: white;
        text-shadow: 0 0.1rem #bcb4b4;
    }
    
    .btn-mark:disabled {
        cursor: auto;
        color: grey;
    }

    .strikethrough{    
        text-decoration: line-through;
        color: gray;
        font-size: 20px;
    }
    
    #grid-todolist-content{
        max-width: 1300px;
        width: 100%;
        display: grid;
        grid-template-columns: 35px auto 125px;
        justify-items: center;
        grid-gap: 15px;
    }

    .grid-todolist-content{
        width: 85%;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #grid-btn{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }

    .grid-btn-content{
        position: relative;
        width: 100%;
        text-align: center;
    }

    .label-container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    .label-container {
        display: flex;
        gap: 13px;
    }


    .checkmark {
        position: relative;
        box-shadow: rgb(255, 84, 0) 0px 0px 0px 2px;
        background-color: rgba(16, 16, 16, 0.5);
        height: 20px;
        width: 20px;
        flex-shrink: 0;
        transition: all 0.2s ease 0s;
        cursor: pointer;
        transform-origin: 0px 10px;
        border-radius: 4px;
        margin: -1px 10px 0px 0px;
        padding: 0;
        box-sizing: border-box;
    }

    .label-container input:checked ~ .checkmark {
        box-shadow: rgb(255, 84, 0) 0px 0px 0px 2px;
        background-color: rgba(245, 24, 24, 0.5);
        height: 20px;
        width: 20px;
        flex-shrink: 0;
        transition: all 0.2s ease 0s;
        cursor: pointer;
        transform-origin: 0px 10px;
        border-radius: 4px;
        margin: -1px 10px 0px 0px;
        padding: 0;
        box-sizing: border-box;
    }

    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    .label-container input:checked ~ .checkmark:after {
        display: block;
    }

    .label-container .checkmark:after {
        left: 0.45em;
        top: 0.25em;
        width: 0.25em;
        height: 0.5em;
        border: solid white;
        border-width: 0 0.15em 0.15em 0;
        transform: rotate(45deg);
        transition: all 500ms ease-in-out;
    }

    .label{
        letter-spacing: 1px;
    }

    .input[type="checkbox"] {
        display: none;
    }
    
        .custom-checkbox {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 2px solid #333;
        border-radius: 4px;
        position: relative;
        cursor: pointer;
    }
    
    .custom-checkbox::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 10px;
        height: 10px;
        background-color: #333;
        border-radius: 2px;
        opacity: 0;
    }
    
    .input[type="checkbox"]:checked + .custom-checkbox::after {
        opacity: 1;
    }

    .drag{
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        gap: 30px;
        background-image: linear-gradient(0deg,#decba4c7, #3e5151bd);
        padding: 20px;
        border-radius: 13px;
    }
</style>

