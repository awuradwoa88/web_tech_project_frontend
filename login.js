function loginUser() {
  console.log("loginUser called");

  // Get form values
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Basic validation
  if (!email || !password) {
    alert("Please enter email and password");
    return false;
  }

  // Send login request to backend (FIXED URL)
  fetch("https://web-tech-project-backend-lguj.onrender.com/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("Login failed");
      }
      return res.json();
    })
    .then(data => {
      console.log("Login response:", data);

      if (data.user) {
        // Save logged-in user
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect based on role
        if (data.user.role === "admin") {
          window.location.href = "admin.html";
        } else {
          window.location.href = "catalog.html";
        }
      } else {
        alert("Invalid email or password");
      }
    })
    .catch(err => {
      console.error("Login error:", err);
      alert("Login failed");
    });

  return false; // prevent page reload
}