function loginUser() {
  console.log("loginUser called");

  // Get form values
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Basic validation
  if (email === "" || password === "") {
    alert("Please enter email and password");
    return false;
  }

  // Send login request to backend
  fetch("https://web-tech-project-backend-lguj.onrender.com/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(data => {
      console.log("Login response:", data);

      if (data.user) {
        // Save logged-in user
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect to catalog page
        window.location.href = "catalog.html";
      } else {
        alert("Invalid email or password");
      }
    })
    .catch(err => {
      console.error("Login error:", err);
      alert("Server error");
    });

  return false; // prevent page reload
}