document.addEventListener("DOMContentLoaded", function () {
    fetch("../resources/cards.json")
        .then(response => response.json())
        .then(data => displayCards(data.cards))
        .catch(error => console.error("Error loading cards:", error));
});

function displayCards(cards) {
    const container = document.getElementById("cards");
    container.innerHTML = "";

    cards.forEach(card => {
        const cardBody = document.createElement("div");
        cardBody.classList.add("col");

        cardBody.innerHTML = `
            <div class="card text-white bg-dark h-100">
                <div class="card-body">
                    <h5 class="card-title">${card.title}</h5>
                    <p class="card-text">${card.description}</p>
                    <a href="${card.link}" class="btn btn-dark-blue">${card.btnText}</a>
                </div>
            </div>
        `;

        container.appendChild(cardBody);
    });
}