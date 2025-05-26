<template>
  <div class="form-container">
    <h3>{{ shellI18n?.t('editUser')|| 'Edit User' }}</h3>
    <form>
      <div class="form-group">
        <label for="name">{{ shellI18n?.t('name')|| 'Name' }}</label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          :placeholder="shellI18n?.t('enterName')|| 'Enter Name'"
          required
        />
        <span class="error-message" v-if="!validation.name.isValid">
          {{ validation.name.message }}
        </span>
      </div>
      <div class="form-group">
        <label for="email">{{ shellI18n?.t('email')|| 'Email' }}</label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          :placeholder="shellI18n?.t('enterEmail')|| 'Enter Email'"
          required
        />
        <span class="error-message" v-if="!validation.email.isValid">
          {{ validation.email.message }}
        </span>
      </div>
      <div class="form-group">
        <label for="age">{{ shellI18n?.t('age')|| 'Age' }}</label>
        <input
          id="age"
          v-model.number="formData.age"
          type="number"
          :placeholder="shellI18n?.t('enterAge')|| 'Enter Age'"
          min="0"
          required
        />
        <span class="error-message" v-if="!validation.age.isValid">
          {{ validation.age.message }}
        </span>
      </div>
      <div class="form-group">
        <label for="gender">{{ shellI18n?.t('gender' )|| 'Gender' }}</label>
        <select id="gender" v-model="formData.gender" required>
          <option value="" disabled>{{ shellI18n?.t('selectGender')|| 'Select Gender' }}</option>
          <option value="male">{{ shellI18n?.t('male') || 'Male' }}</option>
          <option value="female">{{ shellI18n?.t('female')|| 'Female' }}</option>
          <option value="Other">{{ shellI18n?.t('other')|| 'Other' }}</option>
        </select>
        <span class="error-message" v-if="!validation.gender.isValid">
          {{ validation.gender.message }}
        </span>
      </div>
      <div class="form-actions">
        <button 
          type="submit" 
          class="submit-btn" 
          :disabled="!validation.isFormValid"
          @click="saveUserData"
          >
          {{ shellI18n?.t('save')|| 'Save' }}
        </button>
        <button type="button" class="cancel-btn" @click="resetForm">
          {{ shellI18n?.t('reset')|| 'Reset' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { Emitter } from 'mitt'
import { useFormValidator } from './validators/userFormValidator'
import type { User } from './types/User'

//All the form elements are can be converted to a separate component if needed

//Can be kept in a separate file for better organization
type EmitterEvents = {
  'user-selected': User
  'user-loaded': User
  'user-updated': User
}

//Global shared emitter and i18n instance
const emitter = (window as any)?.shellEmitter as Emitter<EmitterEvents> | null
const shellI18n = (window as any)?.shellI18n

//To store updates
const formData = ref<User>({
  id: 0,
  name: '',
  email: '',
  age: 0,
  gender: '',
})

//To store original user data so that we can reset the form
const loadedUser = ref<User>({
  id: 0,
  name: '',
  email: '',
  age: 0,
  gender: '',
})

// Add form validation
const validation = useFormValidator(formData)

//METHODS

const saveUserData = () => {
  if (validation.value.isFormValid && emitter) {
    emitter.emit('user-updated', { ...formData.value })
  }
}

const resetForm = () => {
  formData.value = loadedUser.value
}

onMounted(() => {
  if (emitter) {
    emitter.on('user-loaded', (selectedUser) => {
      loadedUser.value = { ...selectedUser }
      formData.value = { ...selectedUser }
    })
  }
})

onBeforeUnmount(() => {
  if (emitter) {
    emitter.off('user-selected')
  }
})

</script>

<style scoped>
.form-container {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

h3 {
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: 600;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-weight: 600;
}

input,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 0.95rem;
  color: #333;
}

input:focus,
select:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 5px rgba(74, 144, 226, 0.3);
}

.form-actions {
  display: flex;
  justify-content: end;
  margin-top: 20px;
}

.submit-btn,
.cancel-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.submit-btn {
  background-color: #4a90e2;
  color: white;
  margin-right: 10px;
}

.submit-btn:hover {
  background-color: #357abd;
}

.cancel-btn {
  background-color: #e0e0e0;
  color: #333;
}

.cancel-btn:hover {
  background-color: #d0d0d0;
}

.error-message {
  color: #e74c3c;
  font-size: 0.8rem;
  margin-top: 4px;
  display: block;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

button:disabled:hover {
  background-color: #cccccc;
}

@media (max-width: 600px) {
  .form-container {
    padding: 15px;
  }

  input,
  select {
    font-size: 0.85rem;
  }

  .submit-btn,
  .cancel-btn {
    padding: 8px 15px;
  }
}
</style>