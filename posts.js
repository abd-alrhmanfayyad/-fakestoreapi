const DB_URL = "https://orange-api-task-default-rtdb.europe-west1.firebasedatabase.app";

const postForm = document.getElementById("post-form");
const submitBtn = postForm.querySelector('button[type="submit"]');

let editingId = null;
postForm.addEventListener("submit", async (e) => {
    e.preventDefault();



    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();
    const newPost = { title, content };


    if (editingId === null) {
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
    }
    else {
        const res = await fetch(DB_URL + `/posts/${editingId}.json`, {
            method: "PATCH",
            body: JSON.stringify(newPost),
        });
        if (res.ok) {
            postForm.reset();
            loadNewPosts();
            editingId = null;
            submitBtn.textContent = "Post";
        } else {
            console.log("Failed: " + res.status);
        }

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
         <button class="edit-btn">Edit</button>
    </div>
`;


    });

    container.innerHTML = cards.join("");



}
loadNewPosts()

const postsContainer = document.getElementById("posts");

postsContainer.addEventListener("click", async (e) => {

    const btn = e.target;
    if (!btn.classList.contains("delete-btn") && !btn.classList.contains("edit-btn")) return;

    const id = btn.closest(".card").dataset.id;

    if (btn.classList.contains("delete-btn")) {
        const delres = await fetch(`${DB_URL}/posts/${id}.json`, { method: "DELETE" });

        if (delres.ok) {
           if (id === editingId) {
            editingId = null;
            postForm.reset();
            submitBtn.textContent = "Post";
        }
         loadNewPosts();
    }}
    else {
        editingId = id;
        const res = await fetch(DB_URL + `/posts/${id}.json`);
        const data = await res.json();
        submitBtn.textContent = "Update";
        document.getElementById("title").value = data.title;
        document.getElementById("content").value = data.content;

    }



});