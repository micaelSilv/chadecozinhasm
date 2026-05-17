const fs = require("fs/promises");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const bundledDataFile = path.join(__dirname, "..", "data", "gifts.json");

class MissingSupabaseConfigError extends Error {
    constructor() {
        super("Configure SUPABASE_URL e uma chave secreta do Supabase: SUPABASE_SERVICE_ROLE_KEY ou SUPABASE_SECRET_KEY.");
    }
}

class InvalidSupabaseUrlError extends Error {
    constructor() {
        super("O valor de SUPABASE_URL esta invalido. Use a Project URL do Supabase ou o Project ID.");
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

async function confirmPresence({ guestName, guestPhone }) {
    const client = getSupabaseAdminClient();
    const normalizedName = guestName.trim();
    const normalizedPhone = guestPhone.trim();

    const { error } = await client
        .from("presence_confirmations")
        .insert({
            guest_name: normalizedName,
            guest_phone: normalizedPhone
        });

    if (error) {
        throw error;
    }
}

async function confirmPixChoice({ guestName, guestPhone }) {
    const client = getSupabaseAdminClient();
    const normalizedName = guestName.trim();
    const normalizedPhone = guestPhone.trim();

    const { error } = await client
        .from("pix_confirmations")
        .insert({
            guest_name: normalizedName,
            guest_phone: normalizedPhone
        });

    if (error) {
        throw error;
    }
}

function getSupabaseAdminClient() {
    const url = normalizeSupabaseUrl(process.env.SUPABASE_URL);
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;

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

function normalizeSupabaseUrl(rawUrl) {
    if (!rawUrl) {
        return rawUrl;
    }

    const trimmedValue = rawUrl.trim().replace(/^['"]|['"]$/g, "");

    if (!trimmedValue) {
        return trimmedValue;
    }

    const projectUrlMatch = trimmedValue.match(/^https?:\/\/([a-z0-9-]+)\.supabase\.co\/?$/i);

    if (projectUrlMatch) {
        return `https://${projectUrlMatch[1]}.supabase.co`;
    }

    const dashboardMatch = trimmedValue.match(/\/project\/([a-z0-9-]+)/i);

    if (dashboardMatch) {
        return `https://${dashboardMatch[1]}.supabase.co`;
    }

    if (/^[a-z0-9-]+$/i.test(trimmedValue)) {
        return `https://${trimmedValue}.supabase.co`;
    }

    throw new InvalidSupabaseUrlError();
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
    confirmPixChoice,
    confirmPresence,
    getAllGifts,
    InvalidSupabaseUrlError,
    MissingSupabaseConfigError
};