<template>
  <div id="app">
  <TodoList @add-todo="addTodo"/>
  </div>
</template>



<script>
import TodoList from './components/TodoList.vue'
export default {
  name: 'App',
  components: {
  TodoList
  },
}
</script>

<style>
</style>