alert("login.js loaded");
function loginUser() {
  console.log("loginUser called");
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === "" || password === "") {
    alert("Please enter username and password");
    return false;
  }

  fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "catalog.html";
      } else {
        alert("Login failed");
      }
    })
    .catch(err => {
      console.error(err);
      alert("Server error");
    });

  return false; // prevent page reload
}