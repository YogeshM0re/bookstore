const fastify = require("fastify")({ logger: false });
const fastifyCors = require("@fastify/cors");

fastify.register(fastifyCors, {
  origin: "http://localhost:5174",
  methods: "POST",
});

let users = require("./users.json");

//----------------------------------- ----- Add new User ---------------------------- ------------

fastify.post("/add-user", async (request, reply) => {
  try {
    const newUser = request.body;
    const emailExists = users.some((user) => user.email === newUser.email);

    if (emailExists) {
      reply.code(400).send({
        success: false,
        error: "User already exists with these Email address.",
      });
    } else {
      users.push(newUser);

      const fs = require("fs");
      fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

      reply
        .code(201)
        .send({ success: true, message: "User added successfully" });
    }
  } catch (error) {
    reply.code(500).send({ success: false, error: "Failed to add user" });
  }
});

//---------------------------------------- Login User ----------------------------------------

fastify.post("/login", async (request, reply) => {
  try {
    const { username, password } = request.body;
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      reply
        .code(200)
        .send({ success: true, message: "Login successful", user });
    } else {
      reply
        .code(401)
        .send({ success: false, message: "Invalid username or password" });
    }
  } catch (error) {
    reply.code(500).send({ success: false, error: "Login failed" });
  }
});

//---------------------------------------- Get all products ----------------------------------------

let products = require("./products.json");

fastify.get("/products", async (request, reply) => {
  try {
    reply.code(200).send({ success: true, products });
  } catch (error) {
    reply.code(500).send({ success: false, error: "Failed to fetch products" });
  }
});

//---------------------------------------- Add new products ----------------------------------------

fastify.post("/add-product", async (request, reply) => {
  try {
    const newProduct = request.body;

    newProduct.id =
      products.length > 0 ? products[products.length - 1].id + 1 : 1;

    products.push(newProduct);

    const fs = require("fs");
    fs.writeFileSync("products.json", JSON.stringify(products, null, 2));

    reply
      .code(201)
      .send({ success: true, message: "Product added successfully" });
  } catch (error) {
    reply.code(500).send({ success: false, error: "Failed to add product" });
  }
});

//---------------------------------------- Add to Cart Endpoint ----------------------------------------

let carts = require("./carts.json");

fastify.post("/add-to-cart", async (request, reply) => {
  try {
    const { username, productId } = request.body;

    const user = users.find((user) => user.username === username);

    if (!user) {
      reply.code(404).send({ success: false, error: "User not found" });
      return;
    }

    const product = products.find((product) => product.id === productId);

    if (!product) {
      reply.code(404).send({ success: false, error: "Product not found" });
      return;
    }

    let userCart = carts.find((cart) => cart.userId === user.id);

    if (!userCart) {
      userCart = { userId: user.id, cart: [] };
      carts.push(userCart);
    }

    userCart.cart.push(product);

    const fs = require("fs");
    fs.writeFileSync("carts.json", JSON.stringify(carts, null, 2));

    reply.code(200).send({
      success: true,
      message: "Product added to the cart successfully",
    });
  } catch (error) {
    reply
      .code(500)
      .send({ success: false, error: "Failed to add product to the cart" });
  }
});

//---------------------------------------- Get the cart data ----------------------------------------

fastify.get("/user-cart", async (request, reply) => {
  const { username } = request.query;

  const userCart = carts.find((cart) => cart.username === username);

  if (userCart) {
    return { success: true, cart: userCart.cart };
  } else {
    return { success: false, message: "User cart not found" };
  }
});

//---------------------------------------- Remove from Cart Endpoint ----------------------------------------

fastify.post("/remove-from-cart", async (request, reply) => {
    try {
      const { username, productId } = request.body;
  
      const user = users.find((user) => user.username === username);
  
      if (!user) {
        reply.code(404).send({ success: false, error: "User not found" });
        return;
      }
  
      let userCart = carts.find((cart) => cart.userId === user.id);
  
      if (!userCart) {
        reply.code(404).send({ success: false, error: "User cart not found" });
        return;
      }
  
      const index = userCart.cart.findIndex((item) => item.id === productId);
  
      if (index === -1) {
        reply.code(404).send({ success: false, error: "Product not found in the cart" });
        return;
      }
  
      userCart.cart.splice(index, 1); // Remove the item from the cart array
  
      const fs = require("fs");
      fs.writeFileSync("carts.json", JSON.stringify(carts, null, 2));
  
      reply.code(200).send({
        success: true,
        message: "Product removed from the cart successfully",
      });
    } catch (error) {
      reply
        .code(500)
        .send({ success: false, error: "Failed to remove product from the cart" });
    }
  });

//---------------------------------------- server start ----------------------------------------
const PORT = 5000;

const start = async () => {
  try {
    await fastify.listen(PORT, "0.0.0.0");
    console.log(`Server is now running on port ${PORT}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
