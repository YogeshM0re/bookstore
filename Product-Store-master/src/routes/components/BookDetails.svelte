<script>
  export let book;
  export let closeDetails;

  function close() {
    closeDetails();
  }

  function addBookToCart() {
    addToCart(book);
    close();
  }
</script>

<div class="details-modal">
  <div class="details-content">
    <button on:click={close} class="close-button">Close</button>
    <div class="book-details">
      <img
        src={book.image}
        alt={book.title}
        style="width: 150px; height: auto;"
      />
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Price: Rs {book.price}</p>
      <p>Discription: {book.discription}</p>
    </div>
    <div class="button-container">
      <button on:click={addBookToCart} class="add-to-cart-button"
        >Add to Cart</button
      >
      <button on:click={close} class="close-button-mobile">Close</button>
    </div>
  </div>
</div>

<style>
  .details-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }

  .details-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    text-align: center;
    position: relative;
    overflow: hidden;
    animation: zoomIn 0.4s both;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 600px;
    height: auto;
  }

  .book-details {
    margin-bottom: 20px;
  }

  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .close-button {
    display: none;
  }

  .close-button-mobile {
    display: inline-block;
    background: #ff4d4d;
    color: #fff;
    border: none;
    padding: 8px 15px;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 10px;
    transition: background-color 0.3s;
  }

  .close-button-mobile:hover {
    background: #ff0000;
  }

  .add-to-cart-button {
    background: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 12px 20px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .add-to-cart-button:hover {
    background: #0056b3;
  }

  @keyframes zoomIn {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }
  .close-button,
  .close-button-mobile,
  .add-to-cart-button {
    width: 120px;
    display: inline-block;
    text-align: center;
    padding: 8px 0;
    margin-left: 10px;
    border-radius: 4px;
    cursor: pointer;
  }

  .close-button {
    display: none;
  }
</style>
