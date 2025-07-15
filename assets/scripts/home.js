const userType = localStorage.getItem("userType");
const userInfo = localStorage.getItem("userInfo")
const API_URL = "http://localhost:3000/events/";
let currentEventId = null
if (userType == "admin") {
    //Admin dashboard

    // DOM manipulation
    const profileName = document.getElementById("activeUser");
    userName = JSON.parse(userInfo).name
    profileName.textContent = userName

    const profileType = document.getElementById("userType");
    const userKind = userType
    profileType.textContent = userKind

    //Cargar los eventos en pantalla
    async function loadEvents() {
        const eventTable = document.getElementById("eventTable");
        // eventTable.innerHTML = ""; 
        try {
            const res = await fetch(API_URL);
            const events = await res.json();
            events.forEach(event => {
                eventTable.innerHTML += `
                <tr>
                    <td>
                        <div class="d-flex align-items-center">
                            <img src="${event.img}" class="event-img me-2 img-fluid w-25" alt="Event" />
                            <p class="fw-bold">${event.name}</p>
                        </div>
                    </td>
                    <td>${event.description}</td>
                    <td>${event.capacity}</td>
                    <td>${event.date}</td>
                    <td class="text-end action-icons">
                        <button class="btn btn-warning mb-1" type="button" onclick="openModal('${event.id}')"><i class="bi bi-pencil-fill"></i></button>
                        <button class="btn btn-danger" type="button" onclick="deleteEvent('${event.id}')"><i class="bi bi-trash-fill"></i></button>
                    </td>
                </tr>`;
            });
        } catch (error) {
            console.log("Error cargando eventos:", error);
        }
    }
    document.addEventListener("DOMContentLoaded", function () {
        loadEvents();
    });

} else {
    //Userdashboard

    //DOM manipulation
    const profileName = document.getElementById("activeUser");
    const userName = JSON.parse(userInfo).name
    profileName.textContent = userName

    const profileType = document.getElementById("userType");
    const userKind = userType
    profileType.textContent = userKind

    // Load Events
    async function loadEventsUSer() {
        const eventTable = document.getElementById("eventTable");
        const res = await fetch(API_URL)
        const events = await res.json()
        events.forEach(event => {
            eventTable.innerHTML += `
        <tr>
            <td>
                <div class="d-flex align-items-center">
                    <img src="${event.img}" class="event-img me-2 img-fluid w-25" alt="Event" />
                    <p class="fw-bold">${event.name}</p>
                </div>
            </td>
            <td>${event.description}</td>
            <td>${event.capacity}</td>
            <td>${event.date}</td>
            <td class="text-end action-icons">
                <button class="btn btn-info mb-1" type="button" onclick="subscribeEvent('${event.id}')">Suscribirse</button>
            </td>
        </tr>`
        });
    }
    document.addEventListener("DOMContentLoaded", function () {
        loadEventsUSer()
    })
}


function logout() {
        localStorage.setItem("auth", "")
        localStorage.setItem("userType", "")
    }
//logout
const outBtn = document.getElementById("logoutBtn").addEventListener("click", logout)

 //Abrir y cerrar el modal de crear evento
    async function openModal(id = null) {
        const name = document.getElementById("eventName");
        const img = document.getElementById("eventImg");
        const content = document.getElementById("eventContent");
        const date = document.getElementById("eventDate");
        const capacity = document.getElementById("eventCapacity");

        if (id) {
            //Edit mode
            try {
                const res = await fetch(API_URL + id)
                const event = await res.json()
                currentEventId = id
                document.getElementById("dialogTitle").textContent = "Editar evento"
                name.value = event.name;
                img.value = event.img;
                content.value = event.description;
                date.value = event.date;
                capacity.value = event.capacity;
            } catch (error) {
                console.log(error);
            }
        } else {
            //Add mode
            currentEventId = null
            document.getElementById("dialogTitle").textContent = "Añadir evento"
            name.value = ""
            img.value = ""
            content.value = ""
            date.value = ""
            capacity.value = ""
        }
        const addForm = document.getElementById("addModal");
        addForm.showModal()
    }

    function closeModal() {
        const addForm = document.getElementById("addModal");
        addForm.close()
    }
    const closeBtn = document.getElementById("closeDialog").addEventListener("click", closeModal);

    //Añadir evento

    async function saveEvent(e) {
        e.preventDefault();
        const name = document.getElementById("eventName").value;
        const img = document.getElementById("eventImg").value;
        const content = document.getElementById("eventContent").value;
        const date = document.getElementById("eventDate").value;
        const capacity = document.getElementById("eventCapacity").value;

        if (currentEventId) {
            //Update selected event
            try {
                const res = await fetch(API_URL + currentEventId, {
                    "method": "PUT",
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "body": JSON.stringify({
                        "name": name,
                        "img": img,
                        "description": content,
                        "date": date,
                        "capacity": capacity
                    })
                })
            } catch (error) {
                console.log("Error actualizando evento", error);
            }
        } else {
            // Add new event
            try {
                const res = await fetch(API_URL, {
                    "method": "POST",
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "body": JSON.stringify({
                        "name": name,
                        "img": img,
                        "description": content,
                        "date": date,
                        "capacity": capacity
                    })
                });
            } catch (error) {
                console.log("Error añadiendo evento", error);
            }
        }
        closeModal();
        loadEvents();
    }
    const saveEventBtn = document.getElementById("saveEvent").addEventListener("click", saveEvent)

    // Eliminar evento

    async function deleteEvent(id) {
        try {
            const res = await fetch(API_URL + id, {
                "method": "DELETE"
            })
        } catch (error) {
            console.log(error);
        }
        loadEvents();
    }



