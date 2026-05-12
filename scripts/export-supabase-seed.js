const fs = require("fs/promises");
const path = require("path");
const { buildSeedRows } = require("../lib/gifts-store");

const outputFile = path.join(__dirname, "..", "supabase", "seed.json");

async function main() {
    const rows = await buildSeedRows();
    await fs.writeFile(outputFile, JSON.stringify(rows, null, 4) + "\n");
    console.log(`Seed gerado em ${outputFile}`);
}

main().catch((error) => {
    console.error("Nao foi possivel gerar o seed do Supabase.");
    console.error(error);
    process.exit(1);
});