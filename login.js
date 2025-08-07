

        const loginForm = document.getElementById('loginForm');
        const errMsg = document.getElementById('errMsg');

        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Demo email & password validation (in production, use backend)
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            errMsg.textContent = ""; // Clear previous errors

            if (!email || !password) {
                errMsg.textContent = "Both fields are required.";
            } else if (!email.includes("@")) {
                errMsg.textContent = "Please enter a valid email address.";
            } else if (password.length < 6) {
                errMsg.textContent = "Password must be at least 6 characters.";
            } else {
                // Demo: Show fake "success" (replace this with real login logic)
                errMsg.style.color = "#167d25";
                errMsg.textContent = "Login successful! (This is just a demo.)";
                setTimeout(() => {
                    errMsg.textContent = "";
                    errMsg.style.color = "#d62727";
                    // Here you would redirect to the dashboard
                }, 1500);
            }
        });
    