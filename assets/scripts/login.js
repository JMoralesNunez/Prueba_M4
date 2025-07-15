const API_URL = "http://localhost:3000/users";

async function auth() {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    if (email && password) {
        const res = await fetch(API_URL)
        const data = await res.json();
        const user = data.find(u => u.email === email && u.password === password);
        if (user && user.rol === "admin") {
                localStorage.setItem("auth", "true")
                localStorage.setItem("userInfo", JSON.stringify({ id: user.id, name: user.name }))
                localStorage.setItem("userType", "admin")
                
                window.location = "../../home.html"
        } else if (user && user.rol === "user"){
                localStorage.setItem("auth", "true")
                localStorage.setItem("userInfo", JSON.stringify({ id: user.id, name: user.name }))
                localStorage.setItem("userType", "user")
                window.location = "../../home.html"
        } else {
            alert("Credenciales no permitidas")
        }
    } else {
        alert("Rellena los campos")
    }
}
const logBtn = document.querySelector(".btn").addEventListener("click", auth)

let test = localStorage.getItem("userInfo")

let uwu = JSON.parse(test).id 
console.log(uwu);

let test2 = localStorage.getItem("userType")
console.log(test2);
