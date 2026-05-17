const giftGrid = document.querySelector("#gift-grid");
const giftTemplate = document.querySelector("#gift-card-template");
const giftSelectionView = document.querySelector("#gift-selection-view");
const confirmationView = document.querySelector("#confirmation-view");
const openGiftListButton = document.querySelector("#open-gift-list");
const floatingHomeButton = document.querySelector("#floating-home-button");
const heroPhotoShell = document.querySelector(".hero-photo-shell");
const heroPhoto = document.querySelector(".hero-photo");
const heroPhotoDots = Array.from(document.querySelectorAll(".hero-photo-dot"));
const heroCopy = document.querySelector(".hero-copy");
const selectedGiftName = document.querySelector("#selected-gift-name");
const confirmationForm = document.querySelector("#confirmation-form");
const guestNameInput = document.querySelector("#guest-name");
const guestPhoneInput = document.querySelector("#guest-phone");
const backButton = document.querySelector("#back-button");
const formFeedback = document.querySelector("#form-feedback");

let selectedGiftId = null;
let giftItems = [];
const heroImages = [
    "IMGS/Nobanco.jpeg",
    "IMGS/Apoidos_Pilar.jpeg",
    "IMGS/Retrato.jpeg"
];
const giftImageMap = {
    "assadeira-redonda": "lista_presentes_imagens_reais/imagens/01_assadeira_redonda.jpg",
    "assadeira-retangular": "lista_presentes_imagens_reais/imagens/02_assadeira_retangular.jpg",
    "assadeira-pudim": "lista_presentes_imagens_reais/imagens/03_assadeira_pudim.jpg",
    "assadeira-pizza": "lista_presentes_imagens_reais/imagens/04_assadeira_pizza.jpg",
    boleira: "lista_presentes_imagens_reais/imagens/05_boleira.jpg",
    "bule-chaleira": "lista_presentes_imagens_reais/imagens/06_bule_chaleira.jpg",
    "escorredor-louca": "lista_presentes_imagens_reais/imagens/07_escorredor_de_louca.jpg",
    "garrafa-cafe": "lista_presentes_imagens_reais/imagens/08_garrafa_de_cafe.jpg",
    jarra: "lista_presentes_imagens_reais/imagens/09_jarra.jpg",
    "jogo-americano": "lista_presentes_imagens_reais/imagens/10_jogo_americano.jpg",
    "jogo-copos": "lista_presentes_imagens_reais/imagens/11_jogo_de_copos.jpg",
    "jogo-jantar": "lista_presentes_imagens_reais/imagens/12_jogo_de_jantar.jpg",
    "jogo-panela": "lista_presentes_imagens_reais/imagens/13_jogo_de_panela.jpg",
    "jogo-pratos": "lista_presentes_imagens_reais/imagens/14_jogo_de_pratos.jpg",
    "jogo-sobremesa": "lista_presentes_imagens_reais/imagens/15_jogo_de_sobremesa.jpg",
    "jogo-tacas": "lista_presentes_imagens_reais/imagens/16_jogo_de_tacas.jpg",
    "jogo-talheres": "lista_presentes_imagens_reais/imagens/17_jogo_de_talheres.jpg",
    "jogo-xicaras": "lista_presentes_imagens_reais/imagens/18_jogo_de_xicaras.jpg",
    "kit-canecoes": "lista_presentes_imagens_reais/imagens/19_kit_de_canecoes.jpg",
    "kit-faca": "lista_presentes_imagens_reais/imagens/20_kit_de_utensilios_de_cozinha.jpg",
    "kit-frigideiras": "lista_presentes_imagens_reais/imagens/21_kit_frigideiras.jpg",
    "kit-pia": "lista_presentes_imagens_reais/imagens/22_kit_de_pia.jpg",
    "kit-talheres-utensilios": "lista_presentes_imagens_reais/imagens/23_kit_de_talheres_utensilios.jpg",
    marinex: "lista_presentes_imagens_reais/imagens/24_marinex.jpg",
    "panela-pressao": "lista_presentes_imagens_reais/imagens/25_panela_de_pressao.jpg",
    "panos-prato": "lista_presentes_imagens_reais/imagens/26_panos_de_prato.jpg",
    "panela-pipoqueira": "lista_presentes_imagens_reais/imagens/27_panela_pipoqueira.jpg",
    "porta-temperos": "lista_presentes_imagens_reais/imagens/28_porta_temperos.jpg",
    "potes-arroz-feijao": "lista_presentes_imagens_reais/imagens/29_potes_de_mantimentos.jpg",
    "potes-hermeticos": "lista_presentes_imagens_reais/imagens/30_potes_hermeticos.jpg",
    "tabua-carne": "lista_presentes_imagens_reais/imagens/31_tabua_de_carne.jpg",
    "tigelas-bowls": "lista_presentes_imagens_reais/imagens/32_tigelas_bowls.jpg",
    aspirador: "lista_presentes_imagens_reais/imagens/33_aspirador.jpg",
    batedeira: "lista_presentes_imagens_reais/imagens/34_batedeira.jpg",
    ferro: "lista_presentes_imagens_reais/imagens/35_ferro.jpg",
    liquidificador: "lista_presentes_imagens_reais/imagens/36_liquidificador.jpg",
    mixer: "lista_presentes_imagens_reais/imagens/37_mixer.jpg",
    multiprocessador: "lista_presentes_imagens_reais/imagens/38_multiprocessador.jpg",
    sanduicheira: "lista_presentes_imagens_reais/imagens/39_sanduicheira.jpg",
    almofadas: "lista_presentes_imagens_reais/imagens/40_almofadas.jpg",
    cortinas: "lista_presentes_imagens_reais/imagens/41_cortinas.jpg",
    edredom: "lista_presentes_imagens_reais/imagens/42_edredom.jpg",
    "lencol-fronha": "lista_presentes_imagens_reais/imagens/43_lencol_e_fronha.jpg",
    passadeira: "lista_presentes_imagens_reais/imagens/44_passadeira.jpg",
    tapetes: "lista_presentes_imagens_reais/imagens/45_tapetes.jpg",
    "tapetes-banheiro": "lista_presentes_imagens_reais/imagens/46_tapetes_de_banheiro.jpg",
    toalhas: "lista_presentes_imagens_reais/imagens/47_toalhas.jpg",
    "toalha-mesa": "lista_presentes_imagens_reais/imagens/48_toalha_de_mesa.jpg",
    "toalha-rosto": "lista_presentes_imagens_reais/imagens/49_toalha_de_rosto.jpg",
    travesseiros: "lista_presentes_imagens_reais/imagens/50_travesseiros.jpg",
    "kit-banheiro": "lista_presentes_imagens_reais/imagens/51_kit_de_banheiro.jpg",
    "lixo-banheiro": "lista_presentes_imagens_reais/imagens/52_lixo_de_banheiro.jpg",
    "kit-ferramentas": "lista_presentes_imagens_reais/imagens/53_kit_de_ferramentas.jpg",
    "tabua-passar": "lista_presentes_imagens_reais/imagens/54_tabua_de_passar_roupa.jpg",
    bacias: "lista_presentes_imagens_reais/imagens/55_bacias.jpg",
    baldes: "lista_presentes_imagens_reais/imagens/56_baldes.jpg",
    mop: "lista_presentes_imagens_reais/imagens/57_mop.jpg"
};

initHeroSlideshow();
loadGiftList();
syncHeroPhotoHeight();

window.addEventListener("load", syncHeroPhotoHeight);
window.addEventListener("resize", syncHeroPhotoHeight);

openGiftListButton?.addEventListener("click", (event) => {
    event.preventDefault();
    openGiftSelection();
    giftSelectionView.scrollIntoView({ behavior: "smooth", block: "start" });
});

floatingHomeButton?.addEventListener("click", () => {
    openMainView();
});

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
        const response = await fetch("/api/gifts", {
            cache: "no-store"
        });
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
        status.classList.remove("available", "confirmed");

        if (gift.reservedBy) {
            status.textContent = "Confirmado";
            status.classList.add("confirmed");
            actionButton.textContent = "Indisponível";
            actionButton.disabled = true;
            owner.textContent = `Reservado por ${gift.reservedBy.guestName}`;
            owner.classList.remove("hidden");
        } else {
            status.textContent = "Disponível";
            status.classList.add("available");
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
    document.body.classList.add("list-view");
    floatingHomeButton?.classList.remove("hidden");
    giftSelectionView.classList.add("hidden");
    confirmationView.classList.remove("hidden");
    guestNameInput.focus();
}

function openGiftSelection() {
    selectedGiftId = null;
    document.body.classList.add("list-view");
    floatingHomeButton?.classList.remove("hidden");
    confirmationView.classList.add("hidden");
    giftSelectionView.classList.remove("hidden");
}

function openMainView() {
    selectedGiftId = null;
    setFeedback("", "");
    confirmationForm.reset();
    document.body.classList.remove("list-view");
    floatingHomeButton?.classList.add("hidden");
    confirmationView.classList.add("hidden");
    giftSelectionView.classList.add("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function initHeroSlideshow() {
    if (!heroPhoto || heroImages.length === 0) {
        return;
    }

    let activeIndex = 0;
    updateHeroSlide(activeIndex);

    if (heroImages.length === 1) {
        return;
    }

    window.setInterval(() => {
        activeIndex = (activeIndex + 1) % heroImages.length;
        updateHeroSlide(activeIndex);
    }, 2000);
}

function updateHeroSlide(activeIndex) {
    heroPhoto.src = heroImages[activeIndex];

    heroPhotoDots.forEach((dot, index) => {
        dot.classList.toggle("is-active", index === activeIndex);
    });
}

function syncHeroPhotoHeight() {
    if (!heroPhotoShell || !heroCopy) {
        return;
    }

    if (window.innerWidth >= 901) {
        heroPhotoShell.style.height = `${heroCopy.offsetHeight}px`;
        return;
    }

    heroPhotoShell.style.height = "";
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
    return giftImageMap[gift.id] || gift.image || "IMGS/Apoidos_Pilar.jpeg";
}