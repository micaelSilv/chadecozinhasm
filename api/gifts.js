const { getAllGifts, InvalidSupabaseUrlError, MissingSupabaseConfigError } = require("../lib/gifts-store");

module.exports = async (request, response) => {
    if (request.method !== "GET") {
        response.setHeader("Allow", "GET");
        return response.status(405).json({ message: "Metodo nao permitido." });
    }

    response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    response.setHeader("Pragma", "no-cache");
    response.setHeader("Expires", "0");

    try {
        const gifts = await getAllGifts();
        return response.status(200).json({ gifts });
    } catch (error) {
        const message = error instanceof MissingSupabaseConfigError || error instanceof InvalidSupabaseUrlError
            ? error.message
            : error.message || "Nao foi possivel carregar a lista de presentes.";

        return response.status(500).json({ message });
    }
};