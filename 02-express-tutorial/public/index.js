document.getElementById("fetchProducts").addEventListener("click", async () => {
  try {
    const response = await fetch("/api/v1/products");
    const data = await response.json();
    displayProducts(data.products);
  } catch (error) {
    document.getElementById(
      "productsContainer"
    ).innerHTML = `<p style="color: red;">Error fetching products: ${error.message}</p>`;
  }
});

document
  .getElementById("fetchCheapProducts")
  .addEventListener("click", async () => {
    try {
      const response = await fetch("/api/v1/query?maxprice=200");
      const data = await response.json();
      displayProducts(data.products);
    } catch (error) {
      document.getElementById(
        "productsContainer"
      ).innerHTML = `<p style="color: red;">Error fetching products: ${error.message}</p>`;
    }
  });

function displayProducts(products) {
  const container = document.getElementById("productsContainer");

  if (!products || products.length === 0) {
    container.innerHTML = "<p>No products found</p>";
    return;
  }

  let html = "<h3>Products:</h3>";
  products.forEach((product) => {
    html += `
            <div class="product">
                <h4>${product.name}</h4>
                <p>ID: ${product.id}</p>
                <p>Price: $${product.price.toFixed(2)}</p>
                <p>Category: ${product.category}</p>
            </div>
        `;
  });

  container.innerHTML = html;
}
