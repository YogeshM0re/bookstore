<script>
  let username = "";
  let password = "";
  let email = "";
  let name = "";
  let address = "";
  let mobileNumber = "";
  let error = "";

  async function handleRegister() {
    if (!validateForm()) {
      return;
    }

    const response = await fetch("http://localhost:5000/add-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        email,
        name,
        address,
        mobileNumber,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (data.success) {
      window.alert(
        "Registration successful! You will now be redirected to the login page."
      );
      window.location.href = "/login";
    } else {
      error = data.error;
    }
  }

  function validateForm() {
    error = "";

    if (
      !username.trim() ||
      !password.trim() ||
      !email.trim() ||
      !name.trim() ||
      !address.trim() ||
      !mobileNumber.trim()
    ) {
      error = "Please fill in all fields.";
      return false;
    }

    if (!validateEmail(email)) {
      error = "Please enter a valid email address.";
      return false;
    }

    if (!validateMobileNumber(mobileNumber)) {
      error = "Please enter a valid mobile number.";
      return false;
    }

    return true;
  }

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function validateMobileNumber(mobileNumber) {
    const re = /^\d{10}$/;
    return re.test(mobileNumber);
  }
</script>

<div class="title-container">
  <h1 class="title">Register</h1>
</div>

<form on:submit|preventDefault={handleRegister} class="registration-form">
  <label for="name">Name:</label>
  <input type="text" id="name" bind:value={name} />

  <label for="username">Username:</label>
  <input type="text" id="username" bind:value={username} />

  <label for="email">Email:</label>
  <input type="email" id="email" bind:value={email} />

  <label for="password">Password:</label>
  <input type="password" id="password" bind:value={password} />

  <label for="address">Address:</label>
  <input type="text" id="address" bind:value={address} />

  <label for="mobileNumber">Mobile Number:</label>
  <input type="text" id="mobileNumber" bind:value={mobileNumber} />

  <button type="button" on:click|preventDefault={handleRegister}
    >Register</button
  >
</form>

{#if error}
  <p class="error">{error}</p>
{/if}

<style>
  .registration-form {
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
    animation: fadeIn 0.5s ease-in-out;
  }

  label {
    margin-top: 10px;
    display: block;
    font-weight: bold;
  }

  .title-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .title {
    font-size: 3em;
    color: #2e8b57;
    text-shadow: 2px 2px 4px #a9a9a9;
    animation: rainbowText 5s infinite;

    display: inline-block;
    background: linear-gradient(
      to right,
      #ff0000,
      #ffa500,
      #ffff00,
      #008000,
      #0000ff,
      #4b0082,
      #ee82ee
    );
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }

  @keyframes rainbowText {
    0% {
      background-position: 0 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }

  input {
    width: calc(100% - 0px);
    padding: 10px;
    margin: 5px 0 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: border-color 0.3s, box-shadow 0.3s;
    box-sizing: border-box;
  }

  input:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
  }

  button {
    width: 100%;
    padding: 10px 0;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    animation: scaleIn 0.3s ease-in-out;
  }

  button:hover {
    background-color: #2980b9;
  }

  .error {
    display: flex;
    justify-content: center;
    color: #ff0000;
    margin-top: 10px;
    font-size: 14px;
    background-color: #ffecec;
    border: 1px solid #ff7f7f;
    padding: 8px;
    border-radius: 4px;
  }

  @keyframes scaleIn {
    from {
      transform: scale(0.9);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
