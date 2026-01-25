
import { file, write } from "bun";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const DOWNLOAD_DIR = "public/downloads/services";

const FILES_TO_DOWNLOAD = [
  {
    name: "formulaire_passeport_ndp.pdf",
    url: "https://dgdi.ga/wp-content/uploads/2015/05/NDP.pdf",
  },
  {
    name: "formulaire_transcription_naissance.pdf",
    url: "http://www.consulat-france.ga/object.getObject.do?id=383",
  },
  {
    name: "formulaire_demande_mariage.pdf",
    url: "http://www.consulat-france.ga/object.getObject.do?id=385",
  },
  // Reusing the marriage form link for matrimonial regime as per the source text having same ID, 
  // checking if they might be different or bundled.
  // Source text says: "voir documents téléchargeables" but links to id=385 for "Formulaire de demande de mariage".
];

async function downloadFile(url: string, filename: string) {
  try {
    console.log(`Downloading ${url} to ${filename}...`);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to download ${url}: ${response.statusText}`);
    }
    const blob = await response.blob();
    await write(join(DOWNLOAD_DIR, filename), blob);
    console.log(`✅ Saved ${filename}`);
  } catch (error) {
    console.error(`❌ Error downloading ${filename}:`, error);
  }
}

async function main() {
  await mkdir(DOWNLOAD_DIR, { recursive: true });
  
  for (const file of FILES_TO_DOWNLOAD) {
    await downloadFile(file.url, file.name);
  }
  
  console.log("Download complete.");
}

main();
