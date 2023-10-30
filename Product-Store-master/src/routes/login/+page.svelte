<script>
  import { goto } from '$app/navigation';
import { isLoggedIn } from '../../lib/auth'; // Import the isLoggedIn store

let username = '';
let password = '';
let error = '';

// Function to check local storage for saved credentials
function getSavedCredentials() {
  const savedUsername = localStorage.getItem('username');
  if (savedUsername) {
    username = savedUsername;
  }
}

getSavedCredentials(); // Check and retrieve saved credentials on page load

async function handleLogin() {
  try {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        // Save the username to local storage upon successful login
        localStorage.setItem('username', username);
        isLoggedIn.set(true);
        goto('/products');
      } else {
        error = data.message || 'Login failed';
      }
    } else {
      const errorData = await response.json();
      error = errorData.message || 'Login failed';
    }
  } catch (err) {
    console.error('Error during login:', err);
    error = 'An error occurred during login';
  }
}

</script>

<h1>Login</h1>

<form on:submit|preventDefault={handleLogin}>
  <label for="username">Username:</label>
  <input type="text" id="username" bind:value={username} />

  <label for="password">Password:</label>
  <input type="password" id="password" bind:value={password} />

  <button type="submit">Login</button>
</form>

{#if error}
  <p class="error">{error}</p>
{/if}

<style>
  h1 {
    text-align: center;
    font-size: 2em;
    margin-bottom: 20px;
  }

  form {
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
    margin-bottom: 20px;
  }

  label {
    display: block;
    margin-bottom: 10px;
  }

  input {
    width: 100%;
    padding: 8px;
    margin-top: 4px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    width: 100%;
    margin-top: 20px;
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #3498db;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
  }

  button:hover {
    background-color: #217dbb;
  }

  p.error {
    color: red;
    margin-top: 10px;
    text-align: center;
  }
</style>
