document.addEventListener("DOMContentLoaded", function () {
    fetch("../resources/projects.json")
        .then(response => response.json())
        .then(data => displayProjects(data.projects, data.clients))
        .catch(error => console.error("Error loading projects:", error));
});

function displayProjects(projects, clients) {
    const container = document.getElementById("projectsContainer");
    container.innerHTML = ""; // Clear existing content

    projects.forEach(project => {
        const client = clients.find(c => c.id === project.client);

        const card = document.createElement("div");
        card.classList.add("col-md-4", "mb-4");

        card.innerHTML = `
            <div class="card text-dark border-dark">
                <div class="card-body">
                    <h5 class="card-title">${project.title}</h5>
                    <h6 class="text-muted">${project.role} @ ${client ? client.name : "Unknown Client"}</h6>
                    <p class="card-text">${project.shortDescription}</p>
                    <button class="btn btn-primary" onclick="toggleDetails(this)">More Info</button>
                    <div class="details" style="display: none;">
                        <p>${project.fullDescription}</p>
                        <p><strong>Technologies:</strong> ${project.technologies.join(", ")}</p>
                        ${client ? `<a href="${client.website}" target="_blank">Client Website</a>` : ""}
                    </div>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

function toggleDetails(button) {
    const details = button.nextElementSibling;
    details.style.display = details.style.display === "none" ? "block" : "none";
}
