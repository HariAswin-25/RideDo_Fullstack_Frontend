document.addEventListener("DOMContentLoaded", async function () {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) {
        // If not logged in, redirect to login page
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch(`${window.API_BASE_URL}/users/${user_id}`);
        const user = await response.json();

        if (response.ok) {
            // Populate the form fields with user data
            document.getElementById("full_name").value = user.full_name;
            document.getElementById("email").value = user.email;
            document.getElementById("phone").value = user.phone || "";
            document.getElementById("dob").value = user.dob || "";
        } else {
            alert("Could not load profile details.");
        }
    } catch (error) {
        console.error("Error loading profile:", error);
    }
});

// Update Profile logic
document.getElementById("profileForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const user_id = localStorage.getItem("user_id");

    const data = {
        full_name: document.getElementById("full_name").value,
        phone: document.getElementById("phone").value,
        dob: document.getElementById("dob").value
    };

    try {
        const response = await fetch(`${window.API_BASE_URL}/users/${user_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Profile updated successfully!");
        } else {
            alert("Failed to update profile.");
        }
    } catch (error) {
        alert("Server error.");
    }
});

// Logout logic
const logoutBtn = document.querySelector(".logout");
if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
        localStorage.removeItem("user_id");
        alert("Logged out successfully!");
    });
}
