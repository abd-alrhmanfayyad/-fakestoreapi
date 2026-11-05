class Product {
    constructor(title, price, description, image) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.image = image;
    }
}

const products = [];
const DB_URL = "https://orange-api-task-default-rtdb.europe-west1.firebasedatabase.app";


async function getProducts() {
    const response = await fetch("https://fakestoreapi.com/products");

    if (!response.ok) {
        throw new Error("Request failed: " + response.status);
    }

    const data = await response.json();

    data.forEach(d => {
        const p = new Product(d.title, d.price, d.description, d.image);
        products.push(p);
    });
}



async function getPosts() {
    const response = await fetch(DB_URL + "/posts.json");

    if (!response.ok) {
        throw new Error("Request failed: " + response.status);
    }

    const data = await response.json();

  Object.values(data || {}).forEach(d => {
        const p = new Product(d.title, Number(d.price), d.content, d.image);
        products.push(p);
    });
}




async function createCards() {
    const container = document.getElementById("products");

    try {
        await getProducts();
        await getPosts();

        const cards = products.map(p => `
            <div class="card">
                <img src="${p.image}" alt="${p.title}">
                <h3>${p.title}</h3>
              <p class="description">${p.description}</p>
              <p class="price">$${p.price.toFixed(2)}</p>
            </div>
        `);

        container.innerHTML = cards.join("");
    } catch (error) {
        container.innerHTML = "<p>Couldn't load products. Please try again later.</p>";
        console.error(error);
    }
}

createCards();