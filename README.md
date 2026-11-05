# Fake Store API Task

A small web app built for Orange Coding Academy, in two parts:

1. **Products:** fetches 20 products from the [Fake Store API](https://fakestoreapi.com/products) and shows them as cards.
2. **Posts:** a CRUD page where users can create, read, update, and delete posts, saved in Firebase Realtime Database.

## Live Demo

- Products: https://abd-alrhmanfayyad.github.io/-fakestoreapi/
- Posts: https://abd-alrhmanfayyad.github.io/-fakestoreapi/posts.html

## Features

- Fetch data with `async/await` and check `res.ok`
- A `Product` class, with `map()` to build the cards
- Create posts with `POST`, edit with `PATCH`, and remove with `DELETE`
- Event delegation for the Edit and Delete buttons
- Responsive card grid with CSS Grid

## Built With

HTML, CSS, JavaScript, Firebase Realtime Database (REST API)