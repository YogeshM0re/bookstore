<script>
  import { page } from "$app/stores";
  import { isLoggedIn } from '../lib/auth'; // Import the isLoggedIn store


  

  $: routerId = $page.route.id;
  let logo =
    "data:image/png;base64,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";
    $: loggedIn = $isLoggedIn;

function handleLogout() {
  isLoggedIn.set(false); // Set the user as logged out
  // Additional logic for logging out, if needed
}
    </script>

<div class="navbar">
  <nav>
    <div class="logo-container">
      <a href="/" class="logo-link">
        <div class="logo-text">
          <img src={logo} alt="Bookstore Logo" class="logo" />
          <h1>Bookstore</h1>
        </div>
      </a>
    </div>
    <ul>
      <li>
        <a href="/" class:active={routerId === "/"}>Home</a>
      </li>
      <li class="dropdown">
        <a href="/products" class:active={routerId === "/products"}>Products</a>
      </li>
      {#if loggedIn}
      <li>
        <button on:click={handleLogout} class="logout-button">Logout</button>
      </li>
    {:else}
      <li>
        <a href="/login" class:active={routerId === '/login'}>Login</a>
      </li>
    {/if}
    
    </ul>
  </nav>
</div>

<style>
  .navbar {
    background-color: #0f4b6e;
    color: #fff;
    padding: 10px 0;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }

  .logo-container {
    display: flex;
    align-items: center;
  }

  .logo-text {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 50%;
    cursor: pointer;
  }

  h1 {
    margin: 0;
    font-size: 24px;
    letter-spacing: 2px;
    cursor: pointer;
  }

  ul {
    display: flex;
    margin: 0;
    list-style: none;
  }

  li {
    padding: 10px 20px;
  }

  a {
    text-decoration: none;
    color: #fff;
    font-size: 18px;
    transition: color 0.3s;
  }

  .active {
    color: red;
  }
  .logout-button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: #dc3545;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .logout-button:hover {
    background-color: #c82333;
  }
</style>
