const giftGrid = document.querySelector("#gift-grid");
const giftTemplate = document.querySelector("#gift-card-template");
const giftSelectionView = document.querySelector("#gift-selection-view");
const confirmationView = document.querySelector("#confirmation-view");
const selectedGiftName = document.querySelector("#selected-gift-name");
const confirmationForm = document.querySelector("#confirmation-form");
const guestNameInput = document.querySelector("#guest-name");
const guestPhoneInput = document.querySelector("#guest-phone");
const backButton = document.querySelector("#back-button");
const formFeedback = document.querySelector("#form-feedback");

let selectedGiftId = null;
let giftItems = [];

loadGiftList();

giftGrid.addEventListener("click", (event) => {
    const trigger = event.target.closest("button[data-gift-id]");

    if (!trigger) {
        return;
    }

    const giftId = trigger.dataset.giftId;

    openConfirmationView(giftId);
});

confirmationForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!selectedGiftId) {
        return;
    }

    const guestName = guestNameInput.value.trim();
    const guestPhone = guestPhoneInput.value.trim();

    if (!guestName || !guestPhone) {
        return;
    }

    setFeedback("", "");

    try {
        const response = await fetch("/api/confirm", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                giftId: selectedGiftId,
                guestName,
                guestPhone
            })
        });

        const payload = await response.json();

        if (!response.ok) {
            throw new Error(payload.message || "Nao foi possivel confirmar o presente.");
        }

        giftItems = payload.gifts;
        confirmationForm.reset();
        setFeedback("success", "Presente confirmado com sucesso.");
        openGiftSelection();
        renderGiftList();
    } catch (error) {
        setFeedback("error", error.message);
        await loadGiftList(false);
    }
});

backButton.addEventListener("click", () => {
    confirmationForm.reset();
    setFeedback("", "");
    openGiftSelection();
});

async function loadGiftList(showError = true) {
    try {
        const response = await fetch("/api/gifts");
        const payload = await response.json();

        if (!response.ok) {
            throw new Error(payload.message || "Nao foi possivel carregar a lista.");
        }

        giftItems = payload.gifts;
        renderGiftList();
    } catch (error) {
        if (showError) {
            giftGrid.innerHTML = `<p class="gift-detail">${error.message}</p>`;
        }
    }
}

function renderGiftList() {
    giftGrid.innerHTML = "";

    giftItems.forEach((gift) => {
        const card = giftTemplate.content.firstElementChild.cloneNode(true);
        const image = card.querySelector(".gift-image");
        const status = card.querySelector(".gift-status");
        const giftName = card.querySelector(".gift-name");
        const giftCategory = card.querySelector(".gift-category");
        const giftDetail = card.querySelector(".gift-detail");
        const actionButton = card.querySelector(".gift-button");
        const owner = card.querySelector(".gift-owner");

        image.src = getGiftImage(gift);
        image.alt = gift.name;
        image.addEventListener("error", () => {
            image.src = "IMGS/Apoidos_Pilar.jpeg";
        }, { once: true });
        giftCategory.textContent = gift.category;
        giftName.textContent = gift.name;
        giftDetail.textContent = gift.detail;

        if (gift.reservedBy) {
            status.textContent = "Confirmado";
            status.classList.add("confirmed");
            actionButton.textContent = "Indisponível";
            actionButton.disabled = true;
            owner.textContent = `Reservado por ${gift.reservedBy.guestName}`;
            owner.classList.remove("hidden");
        } else {
            status.textContent = "Disponível";
            actionButton.textContent = "Pegar";
            actionButton.dataset.giftId = gift.id;
        }

        giftGrid.appendChild(card);
    });
}

function openConfirmationView(giftId) {
    const selectedGift = giftItems.find((gift) => gift.id === giftId);

    if (!selectedGift || selectedGift.reservedBy) {
        return;
    }

    selectedGiftId = giftId;
    setFeedback("", "");
    selectedGiftName.textContent = selectedGift.name;
    giftSelectionView.classList.add("hidden");
    confirmationView.classList.remove("hidden");
    guestNameInput.focus();
}

function openGiftSelection() {
    selectedGiftId = null;
    confirmationView.classList.add("hidden");
    giftSelectionView.classList.remove("hidden");
}

function setFeedback(type, message) {
    formFeedback.textContent = message;
    formFeedback.classList.remove("hidden", "error", "success");

    if (!message) {
        formFeedback.classList.add("hidden");
        return;
    }

    formFeedback.classList.add(type);
}
function getGiftImage(gift) {
    const title = `${gift.name} ${gift.category}`.toLowerCase();

    if (title.includes("toalha") || title.includes("banheiro") || title.includes("rosto")) {
        return "IMGS/produtos/kit-toalhas.jpg";
    }

    if (title.includes("edredom") || title.includes("lencol") || title.includes("fronha") || title.includes("travesseiro")) {
        return "IMGS/produtos/edredom.jpg";
    }

    if (title.includes("almofada") || title.includes("cortina") || title.includes("tapete") || title.includes("passadeira")) {
        return "IMGS/produtos/almofadas.jpg";
    }

    if (title.includes("lixo") || title.includes("pia") || title.includes("escorredor") || title.includes("balde") || title.includes("mop") || title.includes("bacia")) {
        return "IMGS/produtos/lixeira.jpg";
    }

    if (title.includes("talher") || title.includes("faca")) {
        return "IMGS/produtos/faqueiro.jpg";
    }

    if (title.includes("prato") || title.includes("jantar") || title.includes("sobremesa") || title.includes("taca") || title.includes("copo") || title.includes("xicara") || title.includes("jarra") || title.includes("americano") || title.includes("boleira")) {
        return "IMGS/produtos/jogo-pratos.jpg";
    }

    if (title.includes("panela") || title.includes("assadeira") || title.includes("frigideira") || title.includes("marinex") || title.includes("pipoqueira") || title.includes("bule") || title.includes("chaleira") || title.includes("tempero") || title.includes("tigela") || title.includes("bowl") || title.includes("tabua") || title.includes("canec")) {
        return "IMGS/produtos/kit-panelas.jpg";
    }

    if (title.includes("caf") || title.includes("garrafa")) {
        return "IMGS/produtos/aparelho-jantar.jpg";
    }

    if (title.includes("aspirador") || title.includes("batedeira") || title.includes("ferro") || title.includes("liquidificador") || title.includes("mixer") || title.includes("multiprocessador") || title.includes("sanduicheira") || title.includes("passar") || title.includes("ferramenta")) {
        return "IMGS/produtos/kit-panelas.jpg";
    }

    return gift.image || "IMGS/produtos/jogo-cama.jpg";
}