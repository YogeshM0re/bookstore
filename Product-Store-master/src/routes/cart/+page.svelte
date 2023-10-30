<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

    export let data;
    console.log(data);

  const cartData = writable([]);
  async function fetchCartData() {
    try {
      const response = await fetch("http://localhost:5000/user-cart");
      const data = await response.json();
      if (response.ok) {
        cartData.set(data.cart.map((item) => ({ ...item, quantity: 1 })));
      } else {
        console.error("Failed to fetch cart data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  }

  onMount(() => {
    fetchCartData();
  });

  function increment(item) {
    item.quantity++;
    cartData.update((items) => [...items]);
  }

  function decrement(item) {
    if (item.quantity > 1) {
      item.quantity--;
      cartData.update((items) => [...items]);
    }
  }

  async function removeFromCart(item) {
    try {
      const response = await fetch("http://localhost:5000/remove-from-cart", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'iamyogesh',
          productId: item.id,
        }),
      });

      const data = await response.json();
      if (data.success) {
        // Remove item from the cartData
        cartData.update(items => items.filter(i => i.id !== item.id));
        console.log("Item removed from the cart successfully!");
      } else {
        console.error("Failed to remove item from cart:", data.error);
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  }
  
  $: totalPrice = $cartData.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
</script>

<h1>Cart</h1>
<div class="total-price-container">
  <p class="total-price">
    Total: ${totalPrice}
  </p>
</div>
<div class="cart-container">
  <ul>
    {#if $cartData.length > 0}
    {#each $cartData as item (item.id)}
  <li>
    <img src={item.image} alt={item.title} />
    <div class="details">
      <h3>{item.title}</h3>
      <p class="price">Price: ${item.price * item.quantity}</p>
      <div class="quantity">
        <button on:click={() => decrement(item)}>-</button>
        <p>{item.quantity}</p>
        <button on:click={() => increment(item)}>+</button>
        <button on:click={() => removeFromCart(item)} class="remove-button">Remove</button>

      </div>
    </div>
  </li>
{/each}

    {:else}
      <p class="empty-cart-message">No items in the cart.</p>
    {/if}
  </ul>
</div>

<style>
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }

  .cart-container {
    display: flex;
    justify-content: center;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    width: 850px;
    margin-bottom: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 15px;
    display: flex;
    align-items: center;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }

  li:hover {
    transform: translateY(-5px);
    background-color: rgb(173, 198, 237);
    color: #333;
  }

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .details {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0 15px;
  }

  h3 {
    margin: 0;
    font-size: 18px;
    margin-bottom: 8px;
  }

  p {
    margin: 0;
    font-size: 16px;
    color: #333;
  }

  p.price {
    font-weight: bold;
  }

  .quantity {
    display: flex;
    align-items: center;
    margin-top: 8px;
  }

  button {
    padding: 5px 10px;
    font-size: 14px;
    margin: 0 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f0f0f0;
    cursor: pointer;
    color: #333;
  }

  button:hover {
    background-color: #ff8080;
  }

  p.empty-cart-message {
    text-align: center;
    font-style: italic;
    color: #777;
  }

  .total-price-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 550px;
    margin: 0 auto;
    margin-bottom: 20px;
  }

  .total-price {
    font-weight: bold;
    font-size: 18px;
    color: #333;
    margin: 0;
  }

</style>
