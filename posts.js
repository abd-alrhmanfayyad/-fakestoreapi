const DB_URL = "https://orange-api-task-default-rtdb.europe-west1.firebasedatabase.app";

const postForm = document.getElementById("post-form");

postForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();
    const newPost = { title, content };

    const res = await fetch(DB_URL + "/posts.json", {
        method: "POST",
        body: JSON.stringify(newPost),
    });

    if (res.ok) {
        postForm.reset();
        loadNewPosts();
    } else {
        console.log("Failed: " + res.status);
    }
});

async function loadNewPosts() {
    const res = await fetch(DB_URL + "/posts.json");






    const container = document.getElementById("posts");

    if (!res.ok) {
        container.innerHTML = "<p>Couldn't load posts.</p>";
        console.log("Failed: " + res.status);
        return;
    }

    const posts = Object.entries(await res.json() || {});
    const cards = posts.map(function ([id, post]) {


        return `
    <div class="card" data-id="${id}">
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <button class="delete-btn">Delete</button>
    </div>
`;


    });

    container.innerHTML = cards.join("");



}
loadNewPosts()

const postsContainer = document.getElementById("posts");

postsContainer.addEventListener("click", async (e) => {
    const btn = e.target;
    if (!btn.classList.contains("delete-btn")) return;
    const id = btn.closest(".card").dataset.id;

    const delres = await fetch(`${DB_URL}/posts/${id}.json`, { method: "DELETE" });

    if (delres.ok) {
        loadNewPosts()
    }

});