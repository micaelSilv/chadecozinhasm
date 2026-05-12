const { getAllGifts, MissingSupabaseConfigError } = require("../lib/gifts-store");

module.exports = async (request, response) => {
    if (request.method !== "GET") {
        response.setHeader("Allow", "GET");
        return response.status(405).json({ message: "Metodo nao permitido." });
    }

    try {
        const gifts = await getAllGifts();
        return response.status(200).json({ gifts });
    } catch (error) {
        const message = error instanceof MissingSupabaseConfigError
            ? error.message
            : "Nao foi possivel carregar a lista de presentes.";

        return response.status(500).json({ message });
    }
};