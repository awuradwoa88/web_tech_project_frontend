function filterBooks() {
  const searchValue = document
    .getElementById("search")
    .value.toLowerCase();

  const selectedCategory =
    document.getElementById("category").value;

  const books = document.querySelectorAll(".book");

  books.forEach(book => {
    const title = book.querySelector("h3").innerText.toLowerCase();
    const category = book.dataset.category;

    const matchesSearch = title.includes(searchValue);
    const matchesCategory =
      selectedCategory === "all" || category === selectedCategory;

    if (matchesSearch && matchesCategory) {
      book.style.display = "block";
    } else {
      book.style.display = "none";
    }
  });
}