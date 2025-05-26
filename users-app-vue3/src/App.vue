<template>
  <div class="table-container">
    <h3>{{ shellI18n?.t('allUsers') }}</h3>
    <table>
      <thead>
        <tr>
          <th>{{shellI18n?.t('name')|| 'Name'}}</th>
          <th>{{shellI18n?.t('email')|| 'Email'}}</th>
          <th>{{shellI18n?.t('age')|| 'Age'}}</th>
          <th>{{shellI18n?.t('gender')|| 'Gender'}}</th>
          <th>{{shellI18n?.t('actions')|| 'Actions'}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.age }}</td>
          <td>{{user.gender}}</td>
          <td><button class="edit-button" @click="dispatchEditUserAction(user.id)">Edit</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { Emitter } from 'mitt'
import type { User } from './types/User'

type EmitterEvents = { 
  'users-updated': User[]
  'edit-user': { id: number }
}

onMounted(() => {
  if (emitter) {
    //Shell sends users via this event so update the users state
    emitter.on('users-updated', updateUsers)
  }
})

//Global shared emitter and i18n instance
const emitter = (window as any)?.shellEmitter as Emitter<EmitterEvents> | null
const shellI18n = (window as any)?.shellI18n

//Reactive state for users
const users = ref<User[]>([])

// Methods
const dispatchEditUserAction = (id:number) => {
  if (emitter) {
    emitter.emit('edit-user', { id })
  }
}

// Update the state with new users
const updateUsers = (newUsers: User[]) => {
  users.value = newUsers
}

// Cleanup event listener on component unmount
onBeforeUnmount(() => {
  if (emitter) {
    emitter.off('users-updated')
  }
})
</script>

<style scoped>
.table-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 0 20px;
  font-family: 'Arial', sans-serif;
}

h3 {
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: 600;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

th,
td {
  padding: 12px 15px;
  text-align: left;
  font-size: 0.95rem;
}

th {
  background-color: #4a90e2;
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

td {
  color: #333;
  border-bottom: 1px solid #e0e0e0;
}

tr:nth-child(even) {
  background-color: #f8f9fa;
}

tr:hover {
  background-color: #e6f0fa;
  transition: background-color 0.2s ease;
}

.edit-button {
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

@media (max-width: 600px) {
  table {
    font-size: 0.85rem;
  }

  th,
  td {
    padding: 8px 10px;
  }
}
</style>