function submitForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const feedback = document.getElementById("feedback");

  if (name === "" || email === "" || message === "") {
    feedback.style.color = "red";
    feedback.innerText = "Please fill in all fields.";
    return false;
  }

  fetch("http://web-tech-project-backend-lguj.onrender.com/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, message })
  })
    .then(res => res.json())
    .then(() => {
      feedback.style.color = "green";
      feedback.innerText = "Message sent successfully!";

      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
    })
    .catch(err => {
      console.error(err);
      feedback.style.color = "red";
      feedback.innerText = "Failed to send message.";
    });

  return false; // prevent reload
}