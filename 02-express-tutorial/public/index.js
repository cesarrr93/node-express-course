//Product section
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

//People Section
document.getElementById("fetchPeople").addEventListener("click", async () => {
  try {
    const response = await fetch("/api/v1/people");
    const data = await response.json();
    displayPeople(data);
  } catch (error) {
    document.getElementById(
      "peopleContainer"
    ).innerHTML = `<p style="color: red;">Error fetching people: ${error.message}</p>`;
  }
});

document
  .getElementById("addPersonForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name"); //Gets name from form and store it in name variable

    try {
      const response = await fetch("/api/v1/people", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (response.status === 201) {
        alert(`Successfully added: ${data.person.name}`);
        e.target.removeEventListener();
        // Refresh the people list
        document.getElementById("fetchPeople").click();
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  });

//Display People in container
function displayPeople(people) {
  const container = document.getElementById("peopleContainer");

  if (!people || people.length === 0) {
    constainer.innerHTML = "<p>No people found</p>";
    return;
  }

  let html = "<h3>People: </h3><ul>";
  people.forEach((person) => {
    html += `<li>ID: ${person.id}, Name: ${person.name}</li>`;
  });
  html += "</ul>";

  container.innerHTML = html;
}
