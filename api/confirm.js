const { confirmGift, InvalidSupabaseUrlError, MissingSupabaseConfigError } = require("../lib/gifts-store");

module.exports = async (request, response) => {
    if (request.method !== "POST") {
        response.setHeader("Allow", "POST");
        return response.status(405).json({ message: "Metodo nao permitido." });
    }

    const { giftId, guestName, guestPhone } = request.body || {};

    if (!giftId || !guestName || !guestPhone) {
        return response.status(400).json({ message: "Preencha nome, celular e o item selecionado." });
    }

    try {
        const gifts = await confirmGift({ giftId, guestName, guestPhone });
        return response.status(200).json({ gifts, message: "Presente confirmado com sucesso." });
    } catch (error) {
        if (error.statusCode) {
            return response.status(error.statusCode).json({
                message: error.message,
                ...(error.gifts ? { gifts: error.gifts } : {})
            });
        }

        const message = error instanceof MissingSupabaseConfigError || error instanceof InvalidSupabaseUrlError
            ? error.message
            : error.message || "Nao foi possivel salvar a confirmacao.";

        return response.status(500).json({ message });
    }
};