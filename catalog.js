const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  window.location.href = "login.html";
}

// Admin should not see student catalog
if (user.role === "admin") {
  window.location.href = "admin.html";
}

const availableEl = document.getElementById("availableBooks");
const borrowedEl = document.getElementById("borrowedBooks");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");

let availableBooks = [];
let borrowedBooks = [];

/* =====================
   LOAD BOOKS
===================== */
async function loadBooks() {
  try {
    const res = await fetch(
      `http://web-tech-project-backend-lguj.onrender.com/api/books?userId=${user.id}`
    );
    const data = await res.json();

    availableBooks = Array.isArray(data.available)
      ? data.available
      : [];

    borrowedBooks = Array.isArray(data.borrowed)
      ? data.borrowed
      : [];

    render();
  } catch (err) {
    console.error("Failed to load books:", err);
    availableEl.innerHTML = "<p>Error loading books</p>";
    borrowedEl.innerHTML = "<p>Error loading books</p>";
  }
}

/* =====================
   RENDER
===================== */
function render() {
  const search = searchInput.value.toLowerCase();
  const category = categorySelect.value;

  renderSection(
    availableBooks,
    availableEl,
    "No available books",
    false,
    search,
    category
  );

  renderSection(
    borrowedBooks,
    borrowedEl,
    "No borrowed books",
    true,
    search,
    category
  );
}

function renderSection(books, container, emptyText, borrowed, search, category) {
  container.innerHTML = "";

  if (!Array.isArray(books) || books.length === 0) {
    container.innerHTML = `<p>${emptyText}</p>`;
    return;
  }

  const filtered = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(search);
    const matchesCategory =
      category === "all" || book.category === category;
    return matchesSearch && matchesCategory;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<p>${emptyText}</p>`;
    return;
  }

  filtered.forEach(book => {
    const card = document.createElement("div");
    card.className = "card";

    let timer = "";
    if (borrowed && book.borrowed_at) {
      const daysLeft =
        14 -
        Math.floor(
          (Date.now() - new Date(book.borrowed_at)) /
            (1000 * 60 * 60 * 24)
        );
      timer = `<p class="due">Due in ${daysLeft} days</p>`;
    }

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>${book.category}</p>
      ${timer}
      <button onclick="${
        borrowed ? "returnBook" : "borrowBook"
      }(${book.id})">
        ${borrowed ? "Return" : "Borrow"}
      </button>
    `;

    container.appendChild(card);
  });
}

/* =====================
   ACTIONS
===================== */
async function borrowBook(id) {
  await fetch(`http://web-tech-project-backend-lguj.onrender.com/api/books/borrow/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: user.id })
  });
  loadBooks();
}

async function returnBook(id) {
  await fetch(`http://web-tech-project-backend-lguj.onrender.com/api/books/return/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: user.id })
  });
  loadBooks();
}


function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}


searchInput.addEventListener("input", render);
categorySelect.addEventListener("change", render);

loadBooks();