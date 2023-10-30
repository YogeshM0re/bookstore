<script>
      import Footer from "./footer.svelte";
      import Navbar from "./navbar.svelte";
    </script>
    
    <Navbar />
    <div class="container">
      <slot />
    </div>
    <Footer />
    