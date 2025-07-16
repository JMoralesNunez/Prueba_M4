const API_URL = "http://localhost:3000/users";

document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("fullName").value
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    if (name && email && password && passwordConfirm) {
        if (password === passwordConfirm) {
            try {
                const resGet = await fetch(API_URL);
                const data = await resGet.json();
                const exist = data.some(item => item.email === email);
                if (exist) {
                    alert("Este usuario ya existe")
                } else {
                    const res = await fetch(API_URL, {
                        "method": "POST",
                        "headers": {
                            "Content-Type": "application/json"
                        },
                        "body": JSON.stringify({
                            "name": name,
                            "email": email,
                            "password": password,
                            "rol": "user",
                            "events": []
                        })
                    })
                    const user = await res.json()
                    localStorage.setItem("auth", "true")
                    localStorage.setItem("userInfo", JSON.stringify({ id: user.id, name: user.name }))
                    localStorage.setItem("userType", "user")
                    window.location = "../../home.html"
                }
            } catch (error) {
                    console.error("Error al registrar el usuario:", error);
                    alert("Error al registrar el usuario. Inténtalo de nuevo más tarde.");
            }
            }
            }
        })


