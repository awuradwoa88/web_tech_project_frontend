const user = JSON.parse(localStorage.getItem("user"));

if (!user || user.role !== "admin") {
  window.location.href = "login.html";
}

const booksDiv = document.getElementById("books");

loadBooks();


async function loadBooks() {
  try {
    const res = await fetch("http://localhost:3000/api/books/admin/all");
    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error("Admin books API did not return array:", data);
      booksDiv.innerHTML = "<p>Error loading books</p>";
      return;
    }

    booksDiv.innerHTML = "";

    data.forEach(book => {
      booksDiv.innerHTML += `
        <div class="card">
          <input id="title-${book.id}" value="${book.title}">
          <input id="cat-${book.id}" value="${book.category}">
          <button onclick="updateBook(${book.id})">Update</button>
          <button onclick="deleteBook(${book.id})">Delete</button>
        </div>
      `;
    });
  } catch (err) {
    console.error("Admin load error:", err);
    booksDiv.innerHTML = "<p>Error loading books</p>";
  }
}


async function addBook() {
  const title = document.getElementById("title").value.trim();
  const category = document.getElementById("category").value.trim();

  if (!title || !category) {
    alert("Enter title and category");
    return;
  }

  await fetch("http://localhost:3000/api/books", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, category })
  });

  document.getElementById("title").value = "";
  document.getElementById("category").value = "";

  loadBooks();
}


async function updateBook(id) {
  const title = document.getElementById(`title-${id}`).value;
  const category = document.getElementById(`cat-${id}`).value;

  await fetch(`http://localhost:3000/api/books/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, category })
  });

  loadBooks();
}

async function deleteBook(id) {
  if (!confirm("Delete this book?")) return;

  await fetch(`http://localhost:3000/api/books/${id}`, {
    method: "DELETE"
  });

  loadBooks();
}