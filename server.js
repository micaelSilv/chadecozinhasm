const express = require("express");
const os = require("os");
const { confirmGift, confirmPresence, getAllGifts, InvalidSupabaseUrlError, MissingSupabaseConfigError } = require("./lib/gifts-store");

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";

app.use(express.json());
app.use(express.static(__dirname));

app.get("/api/gifts", async (_request, response) => {
    try {
        const gifts = await getAllGifts();
        response.json({ gifts });
    } catch (error) {
        response.status(500).json({ message: getErrorMessage(error, "Nao foi possivel carregar a lista de presentes.") });
    }
});

app.post("/api/confirm", async (request, response) => {
    const { giftId, guestName, guestPhone } = request.body;

    if (!giftId || !guestName || !guestPhone) {
        return response.status(400).json({ message: "Preencha nome, celular e o item selecionado." });
    }

    try {
        const gifts = await confirmGift({
            giftId,
            guestName,
            guestPhone
        });

        return response.json({ gifts, message: "Presente confirmado com sucesso." });
    } catch (error) {
        if (error.statusCode) {
            return response.status(error.statusCode).json({
                message: error.message,
                ...(error.gifts ? { gifts: error.gifts } : {})
            });
        }

        return response.status(500).json({ message: getErrorMessage(error, "Nao foi possivel salvar a confirmacao.") });
    }
});

app.post("/api/presence", async (request, response) => {
    const { guestName, guestPhone } = request.body;

    if (!guestName || !guestPhone) {
        return response.status(400).json({ message: "Preencha nome e celular para confirmar a presenca." });
    }

    try {
        await confirmPresence({ guestName, guestPhone });
        return response.json({ message: "Presenca confirmada com sucesso." });
    } catch (error) {
        return response.status(500).json({ message: getErrorMessage(error, "Nao foi possivel salvar a confirmacao de presenca.") });
    }
});

app.listen(port, host, () => {
    console.log(`Cha de cozinha disponivel em http://localhost:${port}`);

    for (const address of getNetworkAddresses()) {
        console.log(`Rede local: http://${address}:${port}`);
    }

    console.log("Para acesso publico pela internet, use: npm run share");
});

function getNetworkAddresses() {
    const interfaces = os.networkInterfaces();
    const addresses = [];

    for (const networkGroup of Object.values(interfaces)) {
        if (!networkGroup) {
            continue;
        }

        for (const network of networkGroup) {
            if (network.family === "IPv4" && !network.internal) {
                addresses.push(network.address);
            }
        }
    }

    return addresses;
}

function getErrorMessage(error, fallbackMessage) {
    if (error instanceof MissingSupabaseConfigError || error instanceof InvalidSupabaseUrlError) {
        return error.message;
    }

    return fallbackMessage;
}