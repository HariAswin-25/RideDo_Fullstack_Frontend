document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(`${window.API_BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const result = await response.json();
        console.log("Server response:", result);

        if (response.ok) {
            alert("Login successful!");
            // Store user info or token if needed
            // localStorage.setItem("user", JSON.stringify(result.user)); 
            window.location.href = "../landingpage.html";
        } else {
            if (typeof result.detail === "string") {
                alert(result.detail);
            } else if (Array.isArray(result.detail)) {
                alert(result.detail[0].msg);
            } else {
                alert("Invalid email or password!");
            }
        }

    } catch (error) {
        alert("Server error. Make sure backend is running.");
        console.error(error);
    }
});
