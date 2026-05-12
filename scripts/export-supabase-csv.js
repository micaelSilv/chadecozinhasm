const fs = require("fs/promises");
const path = require("path");

const inputFile = path.join(__dirname, "..", "supabase", "seed.json");
const outputFile = path.join(__dirname, "..", "supabase", "seed.csv");

async function main() {
    const raw = await fs.readFile(inputFile, "utf8");
    const rows = JSON.parse(raw);
    const headers = [
        "id",
        "category",
        "name",
        "price",
        "detail",
        "sort_order",
        "reserved_by_name",
        "reserved_by_phone",
        "confirmed_at"
    ];

    const csv = [
        headers.join(","),
        ...rows.map((row) => headers.map((header) => escapeCsv(row[header])).join(","))
    ].join("\n") + "\n";

    await fs.writeFile(outputFile, csv);
    console.log(`CSV gerado em ${outputFile}`);
}

function escapeCsv(value) {
    if (value === null || value === undefined) {
        return "";
    }

    const text = String(value);

    if (text.includes(",") || text.includes("\n") || text.includes("\"")) {
        return `"${text.replace(/\"/g, '""')}"`;
    }

    return text;
}

main().catch((error) => {
    console.error("Nao foi possivel gerar o CSV do Supabase.");
    console.error(error);
    process.exit(1);
});