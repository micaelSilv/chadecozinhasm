const express = require("express");
const fs = require("fs/promises");
const os = require("os");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";
const bundledDataFile = path.join(__dirname, "data", "gifts.json");
const dataDirectory = process.env.DATA_DIR || path.join(__dirname, "data");
const dataFile = process.env.DATA_FILE || path.join(dataDirectory, "gifts.json");

app.use(express.json());
app.use(express.static(__dirname));

app.get("/api/gifts", async (_request, response) => {
    try {
        const gifts = await readGifts();
        response.json({ gifts });
    } catch {
        response.status(500).json({ message: "Nao foi possivel carregar a lista de presentes." });
    }
});

app.post("/api/confirm", async (request, response) => {
    const { giftId, guestName, guestPhone } = request.body;

    if (!giftId || !guestName || !guestPhone) {
        return response.status(400).json({ message: "Preencha nome, celular e o item selecionado." });
    }

    try {
        const gifts = await readGifts();
        const selectedGift = gifts.find((gift) => gift.id === giftId);

        if (!selectedGift) {
            return response.status(404).json({ message: "Esse presente nao foi encontrado." });
        }

        if (selectedGift.reservedBy) {
            return response.status(409).json({
                message: "Esse presente ja foi confirmado por outro convidado.",
                gifts
            });
        }

        selectedGift.reservedBy = {
            guestName: guestName.trim(),
            guestPhone: guestPhone.trim(),
            confirmedAt: new Date().toISOString()
        };

        await writeGifts(gifts);
        return response.json({ gifts, message: "Presente confirmado com sucesso." });
    } catch {
        return response.status(500).json({ message: "Nao foi possivel salvar a confirmacao." });
    }
});

app.listen(port, host, () => {
    console.log(`Cha de cozinha disponivel em http://localhost:${port}`);

    for (const address of getNetworkAddresses()) {
        console.log(`Rede local: http://${address}:${port}`);
    }

    console.log("Para acesso publico pela internet, use: npm run share");
});

async function readGifts() {
    await ensureDataFile();
    const file = await fs.readFile(dataFile, "utf8");
    return JSON.parse(file);
}

async function writeGifts(gifts) {
    await fs.mkdir(path.dirname(dataFile), { recursive: true });
    await fs.writeFile(dataFile, JSON.stringify(gifts, null, 4));
}

async function ensureDataFile() {
    await fs.mkdir(path.dirname(dataFile), { recursive: true });

    try {
        await fs.access(dataFile);
    } catch {
        const seedFile = await fs.readFile(bundledDataFile, "utf8");
        await fs.writeFile(dataFile, seedFile);
    }
}

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