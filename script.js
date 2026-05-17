const giftGrid = document.querySelector("#gift-grid");
const giftTemplate = document.querySelector("#gift-card-template");
const pixCardTemplate = document.querySelector("#pix-card-template");
const giftSelectionView = document.querySelector("#gift-selection-view");
const confirmationView = document.querySelector("#confirmation-view");
const openGiftListButton = document.querySelector("#open-gift-list");
const openPresenceModalButton = document.querySelector("#open-presence-modal");
const floatingHomeButton = document.querySelector("#floating-home-button");
const heroPhotoShell = document.querySelector(".hero-photo-shell");
const heroPhoto = document.querySelector(".hero-photo");
const heroPhotoDots = Array.from(document.querySelectorAll(".hero-photo-dot"));
const heroCopy = document.querySelector(".hero-copy");
const confirmationKicker = confirmationView?.querySelector(".section-kicker");
const selectedGiftName = document.querySelector("#selected-gift-name");
const confirmationText = confirmationView?.querySelector(".confirmation-text");
const confirmationForm = document.querySelector("#confirmation-form");
const confirmationSubmitButton = confirmationForm?.querySelector("button[type='submit']");
const presenceView = document.querySelector("#presence-view");
const presenceForm = document.querySelector("#presence-form");
const presenceNameInput = document.querySelector("#presence-name");
const presencePhoneInput = document.querySelector("#presence-phone");
const presenceFeedback = document.querySelector("#presence-feedback");
const guestNameInput = document.querySelector("#guest-name");
const guestPhoneInput = document.querySelector("#guest-phone");
const closeConfirmationModalButton = document.querySelector("#close-confirmation-modal");
const closePresenceModalButton = document.querySelector("#close-presence-modal");
const formFeedback = document.querySelector("#form-feedback");

let selectedGiftId = null;
let confirmationMode = "gift";
let giftItems = [];
let pixChoices = [];
const heroImages = [
    "IMGS/Nobanco.jpeg",
    "IMGS/Apoidos_Pilar.jpeg",
    "IMGS/Retrato.jpeg"
];
const giftImageMap = {
    "01": "IMGS/produtos/1.jpeg",
    "02": "IMGS/produtos/2.jpeg",
    "03": "IMGS/produtos/3.jpeg",
    "04": "IMGS/produtos/4.jpeg",
    "5": "IMGS/produtos/5.jpeg",
    "6": "IMGS/produtos/6.jpeg",
    "7": "IMGS/produtos/7.jpeg",
        "8": "IMGS/produtos/8.jpeg",
    "9": "IMGS/produtos/9.jpeg",
    "10": "IMGS/produtos/10.jpeg",
    "11": "IMGS/produtos/11.jpeg",
    "12": "IMGS/produtos/12.jpeg",
    "13": "IMGS/produtos/13.jpeg",
    "14": "IMGS/produtos/14.jpeg",
    "15": "IMGS/produtos/15.jpeg",
    "16": "IMGS/produtos/16.jpeg",
    "17": "IMGS/produtos/17.jpeg",
    "18": "IMGS/produtos/18.jpeg",
    "19": "IMGS/produtos/19.png",
    "20": "IMGS/produtos/20.jpeg",
    "21": "IMGS/produtos/21.jpeg",
    "22": "IMGS/produtos/22.jpeg",
    "23": "IMGS/produtos/23.jpeg",
    "24": "IMGS/produtos/24.jpeg",
    "25": "IMGS/produtos/25.jpeg",
    "26": "IMGS/produtos/26.jpeg",
    "27": "IMGS/produtos/27.jpeg",
    "28": "IMGS/produtos/28.jpeg",
    "29": "IMGS/produtos/29.jpeg",
    "30": "IMGS/produtos/30.jpeg",
    "31": "IMGS/produtos/31.jpeg",
    "32": "IMGS/produtos/32.jpeg",
    "33": "IMGS/produtos/33.jpeg",
    "34": "IMGS/produtos/34.jpeg",
    "35": "IMGS/produtos/35.jpeg",
    "36": "IMGS/produtos/36.jpeg",
    "37": "IMGS/produtos/37.jpeg",
    "38": "IMGS/produtos/38.jpeg",
    "39": "IMGS/produtos/39.jpeg",
    "40": "IMGS/produtos/40.jpeg",
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

openPresenceModalButton?.addEventListener("click", () => {
    openPresenceView();
});

floatingHomeButton?.addEventListener("click", () => {
    openMainView();
});

giftGrid.addEventListener("click", (event) => {
    const pixTrigger = event.target.closest("button[data-pix-choice]");

    if (pixTrigger) {
        openPixChoiceView();
        return;
    }

    const trigger = event.target.closest("button[data-gift-id]");

    if (!trigger) {
        return;
    }

    const giftId = trigger.dataset.giftId;

    openConfirmationView(giftId);
});

confirmationForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const guestName = guestNameInput.value.trim();
    const guestPhone = guestPhoneInput.value.trim();

    if (!guestName || !guestPhone) {
        return;
    }

    setFeedback("", "");

    try {
        const requestOptions = confirmationMode === "pix"
            ? {
                url: "/api/pix",
                body: JSON.stringify({ guestName, guestPhone }),
                successMessage: "Escolha via Pix confirmada com sucesso."
            }
            : {
                url: "/api/confirm",
                body: JSON.stringify({
                    giftId: selectedGiftId,
                    guestName,
                    guestPhone
                }),
                successMessage: "Presente confirmado com sucesso."
            };

        if (confirmationMode === "gift" && !selectedGiftId) {
            return;
        }

        const response = await fetch(requestOptions.url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: requestOptions.body
        });

        const payload = await response.json();

        if (!response.ok) {
            throw new Error(payload.message || (confirmationMode === "pix" ? "Nao foi possivel confirmar a escolha via Pix." : "Nao foi possivel confirmar o presente."));
        }

        if (confirmationMode === "gift" && payload.gifts) {
            giftItems = payload.gifts;
            renderGiftList();
        }

        if (confirmationMode === "pix") {
            pixChoices = payload.pixChoices || pixChoices;
            renderGiftList();
        }

        confirmationForm.reset();
        setFeedback("success", payload.message || requestOptions.successMessage);
        openGiftSelection();
    } catch (error) {
        setFeedback("error", error.message);

        if (confirmationMode === "gift") {
            await loadGiftList(false);
        }
    }
});

closeConfirmationModalButton?.addEventListener("click", () => {
    confirmationForm.reset();
    setFeedback("", "");
    openGiftSelection();
});

closePresenceModalButton?.addEventListener("click", () => {
    presenceForm?.reset();
    setPresenceFeedback("", "");
    closePresenceView();
});

presenceForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const guestName = presenceNameInput.value.trim();
    const guestPhone = presencePhoneInput.value.trim();

    if (!guestName || !guestPhone) {
        return;
    }

    setPresenceFeedback("", "");

    try {
        const response = await fetch("/api/presence", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                guestName,
                guestPhone
            })
        });

        const payload = await response.json();

        if (!response.ok) {
            throw new Error(payload.message || "Nao foi possivel confirmar a presenca.");
        }

        presenceForm.reset();
        setPresenceFeedback("success", payload.message || "Presenca confirmada com sucesso.");
    } catch (error) {
        setPresenceFeedback("error", error.message);
    }
});

confirmationView?.addEventListener("click", (event) => {
    if (event.target === confirmationView) {
        confirmationForm.reset();
        setFeedback("", "");
        openGiftSelection();
    }
});

presenceView?.addEventListener("click", (event) => {
    if (event.target === presenceView) {
        presenceForm?.reset();
        setPresenceFeedback("", "");
        closePresenceView();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !confirmationView.classList.contains("hidden")) {
        confirmationForm.reset();
        setFeedback("", "");
        openGiftSelection();
        return;
    }

    if (event.key === "Escape" && presenceView && !presenceView.classList.contains("hidden")) {
        presenceForm?.reset();
        setPresenceFeedback("", "");
        closePresenceView();
    }
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
        pixChoices = payload.pixChoices || [];
        renderGiftList();
    } catch (error) {
        if (showError) {
            giftGrid.innerHTML = `<p class="gift-detail">${error.message}</p>`;
        }
    }
}

function renderGiftList() {
    giftGrid.innerHTML = "";

    const pixCard = createPixCard();

    if (pixCard) {
        giftGrid.appendChild(pixCard);
    }

    giftItems.forEach((gift) => {
        const card = giftTemplate.content.firstElementChild.cloneNode(true);
        const image = card.querySelector(".gift-image");
        const status = card.querySelector(".gift-status");
        const giftName = card.querySelector(".gift-name");
        const giftLink = card.querySelector(".gift-link");
        const actionButton = card.querySelector(".gift-button");
        const owner = card.querySelector(".gift-owner");

        setGiftImage(image, gift);
        image.alt = gift.name;
        giftName.textContent = gift.name;
        giftLink.href = gift.purchaseLink || "#";
        giftLink.classList.remove("available");
        giftLink.classList.toggle("is-placeholder", !gift.purchaseLink);
        giftLink.addEventListener("click", (event) => {
            if (!gift.purchaseLink) {
                event.preventDefault();
            }
        });
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
            giftLink.classList.add("available");
            actionButton.textContent = "Pegar";
            actionButton.dataset.giftId = gift.id;
        }

        giftGrid.appendChild(card);
    });
}

function createPixCard() {
    const pixCard = pixCardTemplate?.content.firstElementChild.cloneNode(true) || null;

    if (!pixCard) {
        return null;
    }

    const owner = pixCard.querySelector(".pix-owner");

    if (owner && pixChoices.length > 0) {
        const chooserNames = pixChoices.slice(0, 3).map((choice) => choice.guestName).join(", ");
        const extraCount = pixChoices.length - 3;
        owner.textContent = extraCount > 0
            ? `Escolhido por ${chooserNames} e mais ${extraCount}`
            : `Escolhido por ${chooserNames}`;
        owner.classList.remove("hidden");
    }

    return pixCard;
}

function openConfirmationView(giftId) {
    const selectedGift = giftItems.find((gift) => gift.id === giftId);

    if (!selectedGift || selectedGift.reservedBy) {
        return;
    }

    selectedGiftId = giftId;
    confirmationMode = "gift";
    setFeedback("", "");
    if (confirmationKicker) {
        confirmationKicker.textContent = "Reserva do presente";
    }
    selectedGiftName.textContent = selectedGift.name;
    if (confirmationText) {
        confirmationText.textContent = "Preencha seus dados para assumir este presente. Depois da confirmação, ele ficará indisponível para os próximos convidados.";
    }
    if (confirmationSubmitButton) {
        confirmationSubmitButton.textContent = "Confirmar presente";
    }
    document.body.classList.add("list-view");
    floatingHomeButton?.classList.remove("hidden");
    giftSelectionView.classList.remove("hidden");
    confirmationView.classList.remove("hidden");
    syncModalState();
}

function openPixChoiceView() {
    selectedGiftId = null;
    confirmationMode = "pix";
    setFeedback("", "");
    if (confirmationKicker) {
        confirmationKicker.textContent = "Escolha via Pix";
    }
    selectedGiftName.textContent = "Contribuir com Pix";
    if (confirmationText) {
        confirmationText.textContent = "Preencha seus dados para avisar que você escolheu presentear via Pix. Essa opção continua disponível para outras pessoas também.";
    }
    if (confirmationSubmitButton) {
        confirmationSubmitButton.textContent = "Confirmar Pix";
    }
    document.body.classList.add("list-view");
    floatingHomeButton?.classList.remove("hidden");
    giftSelectionView.classList.remove("hidden");
    confirmationView.classList.remove("hidden");
    syncModalState();
}

function openGiftSelection() {
    selectedGiftId = null;
    document.body.classList.add("list-view");
    floatingHomeButton?.classList.remove("hidden");
    confirmationView.classList.add("hidden");
    giftSelectionView.classList.remove("hidden");
    syncModalState();
}

function openMainView() {
    selectedGiftId = null;
    setFeedback("", "");
    confirmationForm.reset();
    presenceForm?.reset();
    setPresenceFeedback("", "");
    document.body.classList.remove("list-view");
    floatingHomeButton?.classList.add("hidden");
    confirmationView.classList.add("hidden");
    presenceView?.classList.add("hidden");
    giftSelectionView.classList.add("hidden");
    syncModalState();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function openPresenceView() {
    presenceForm?.reset();
    setPresenceFeedback("", "");
    presenceView?.classList.remove("hidden");
    syncModalState();
}

function closePresenceView() {
    presenceView?.classList.add("hidden");
    syncModalState();
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

function syncModalState() {
    const hasOpenModal = [confirmationView, presenceView].some((modal) => modal && !modal.classList.contains("hidden"));
    document.body.classList.toggle("modal-open", hasOpenModal);
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

function setPresenceFeedback(type, message) {
    presenceFeedback.textContent = message;
    presenceFeedback.classList.remove("hidden", "error", "success");

    if (!message) {
        presenceFeedback.classList.add("hidden");
        return;
    }

    presenceFeedback.classList.add(type);
}

function setGiftImage(imageElement, gift) {
    const candidates = getGiftImageCandidates(gift);
    const fallbackImage = "/IMGS/Apoidos_Pilar.jpeg";
    let currentIndex = 0;

    const applyNextImage = () => {
        if (currentIndex >= candidates.length) {
            imageElement.removeEventListener("error", applyNextImage);
            imageElement.src = fallbackImage;
            return;
        }

        imageElement.src = candidates[currentIndex];
        currentIndex += 1;
    };

    imageElement.addEventListener("error", applyNextImage);
    applyNextImage();
}

function getGiftImageCandidates(gift) {
    const rawImage = giftImageMap[gift.id] || gift.image || "IMGS/Apoidos_Pilar.jpeg";
    const normalizedImage = normalizeImagePath(rawImage);
    const candidates = [normalizedImage];

    if (normalizedImage.endsWith(".jpg")) {
        candidates.push(normalizedImage.replace(/\.jpg$/i, ".jpeg"));
    }

    if (normalizedImage.endsWith(".jpeg")) {
        candidates.push(normalizedImage.replace(/\.jpeg$/i, ".jpg"));
    }

    return [...new Set(candidates)];
}

function normalizeImagePath(imagePath) {
    const normalizedPath = String(imagePath || "")
        .trim()
        .replace(/\\/g, "/")
        .replace(/^\.\//, "")
        .replace(/^\/+/, "");

    return `/${normalizedPath}`;
}