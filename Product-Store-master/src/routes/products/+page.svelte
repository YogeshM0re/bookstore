<script>
  import { onMount } from "svelte"; 
  import { Router, Route } from "svelte-routing";

  import BookDetails from "../components/BookDetails.svelte";

  let books = [];
  let cart = [];

  let selectedBook = null;

  function gotoCart() {
    window.location.href = '/cart'; 
  }
  async function fetchProducts() {
    try {
      const response = await fetch("http://localhost:5000/products");
      const data = await response.json();
      if (data.success) {
        books = data.products;
      } else {
        console.error("Failed to fetch products:", data.error);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  onMount(fetchProducts);

  async function addToCart(book) {
    try {
      const isBookInCart = cart.some((item) => item.id === book.id);

      if (isBookInCart) {
        alert("This book is already in the cart!");
      } else {
        const response = await fetch("http://localhost:5000/add-to-cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: "iamyogesh",
            productId: book.id,
          }),
        });

        const data = await response.json();
        if (data.success) {
          cart = [...cart, book];
          console.log("Book added to cart successfully!");
         
          gotoCart();
        } else {
          console.error("Failed to add book to cart:", data.error);
        }
      }  
    } catch (error) {
      console.error("Error adding book to cart:", error);
    }
  }

  function showDetails(book) {
    selectedBook = book;
  }

  function closeDetails() {
    selectedBook = null;
  }
</script>

<div>
  <ul style="display: flex; flex-wrap: wrap; justify-content: center;">
    {#each books as book}
      <li class="card">
        <div class="card-content">
          <img src={book.image} alt={book.title} />
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <p>Rs {book.price}</p>
          <div class="button-container">
            <button on:click={() => addToCart(book)} class="add-to-cart-button">
              Add to Cart
            </button>
            <button
              on:click={() => showDetails(book)}
              class="view-details-button"
            >
              View Details
            </button>
          </div>
        </div>
      </li>
    {/each}
  </ul>
</div>

{#if selectedBook}
  <BookDetails book={selectedBook} {closeDetails} />
{/if}

<style>
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin: 10px;
    padding: 10px;
    width: 250px;

    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
    background-color: #fff;
  }

  .card img {
    max-width: 60%;
    height: auto;
    margin-bottom: 0px;
  }

  .card:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 12px rgba(58, 39, 236, 0.495);
  }

  .button-container {
    white-space: nowrap;
  }

  .add-to-cart-button,
  .view-details-button {
    display: inline-block;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
  }

  .add-to-cart-button {
    background-color: #3498db;
    color: #fff;
  }

  .view-details-button {
    background-color: #27ae60;
    color: #fff;
  }

  .add-to-cart-button:hover,
  .view-details-button:hover {
    filter: brightness(1.2);
  }

  .card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    margin-bottom: 0px;
  }
</style>
