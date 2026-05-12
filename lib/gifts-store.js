const fs = require("fs/promises");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const bundledDataFile = path.join(__dirname, "..", "data", "gifts.json");

class MissingSupabaseConfigError extends Error {
    constructor() {
        super("Configure SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY para carregar os presentes.");
    }
}

async function getAllGifts() {
    const client = getSupabaseAdminClient();
    const { data, error } = await client
        .from("gifts")
        .select("id, category, name, price, detail, sort_order, reserved_by_name, reserved_by_phone, confirmed_at")
        .order("sort_order", { ascending: true });

    if (error) {
        throw error;
    }

    return data.map(mapGiftRecord);
}

async function confirmGift({ giftId, guestName, guestPhone }) {
    const client = getSupabaseAdminClient();
    const normalizedName = guestName.trim();
    const normalizedPhone = guestPhone.trim();

    const { data: gift, error: fetchError } = await client
        .from("gifts")
        .select("id, reserved_by_name")
        .eq("id", giftId)
        .maybeSingle();

    if (fetchError) {
        throw fetchError;
    }

    if (!gift) {
        const notFoundError = new Error("Esse presente nao foi encontrado.");
        notFoundError.statusCode = 404;
        throw notFoundError;
    }

    if (gift.reserved_by_name) {
        const conflictError = new Error("Esse presente ja foi confirmado por outro convidado.");
        conflictError.statusCode = 409;
        conflictError.gifts = await getAllGifts();
        throw conflictError;
    }

    const timestamp = new Date().toISOString();
    const { data: updatedGift, error: updateError } = await client
        .from("gifts")
        .update({
            reserved_by_name: normalizedName,
            reserved_by_phone: normalizedPhone,
            confirmed_at: timestamp
        })
        .eq("id", giftId)
        .is("reserved_by_name", null)
        .select("id")
        .maybeSingle();

    if (updateError) {
        throw updateError;
    }

    if (!updatedGift) {
        const conflictError = new Error("Esse presente ja foi confirmado por outro convidado.");
        conflictError.statusCode = 409;
        conflictError.gifts = await getAllGifts();
        throw conflictError;
    }

    return getAllGifts();
}

function getSupabaseAdminClient() {
    const url = process.env.SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !serviceRoleKey) {
        throw new MissingSupabaseConfigError();
    }

    return createClient(url, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
}

function mapGiftRecord(record) {
    return {
        id: record.id,
        category: record.category,
        name: record.name,
        price: record.price,
        detail: record.detail,
        reservedBy: record.reserved_by_name
            ? {
                guestName: record.reserved_by_name,
                guestPhone: record.reserved_by_phone,
                confirmedAt: record.confirmed_at
            }
            : null
    };
}

async function buildSeedRows() {
    const file = await fs.readFile(bundledDataFile, "utf8");
    const gifts = JSON.parse(file);

    return gifts.map((gift) => ({
        id: gift.id,
        category: gift.category,
        name: gift.name,
        price: gift.price,
        detail: gift.detail,
        sort_order: gifts.indexOf(gift),
        reserved_by_name: gift.reservedBy?.guestName || null,
        reserved_by_phone: gift.reservedBy?.guestPhone || null,
        confirmed_at: gift.reservedBy?.confirmedAt || null
    }));
}

module.exports = {
    buildSeedRows,
    confirmGift,
    getAllGifts,
    MissingSupabaseConfigError
};