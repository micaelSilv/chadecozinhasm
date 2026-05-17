const { confirmPixChoice, InvalidSupabaseUrlError, MissingSupabaseConfigError } = require("../lib/gifts-store");

module.exports = async (request, response) => {
    if (request.method !== "POST") {
        response.setHeader("Allow", "POST");
        return response.status(405).json({ message: "Metodo nao permitido." });
    }

    const { guestName, guestPhone } = request.body || {};

    if (!guestName || !guestPhone) {
        return response.status(400).json({ message: "Preencha nome e celular para confirmar a escolha via Pix." });
    }

    try {
        await confirmPixChoice({ guestName, guestPhone });
        return response.status(200).json({ message: "Escolha via Pix confirmada com sucesso." });
    } catch (error) {
        const message = error instanceof MissingSupabaseConfigError || error instanceof InvalidSupabaseUrlError
            ? error.message
            : error.message || "Nao foi possivel salvar a escolha via Pix.";

        return response.status(500).json({ message });
    }
};