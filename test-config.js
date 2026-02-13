// Simple test to verify config loading
import { config } from "./src/config.js";

console.log("=== CONFIGURATION TEST ===");
console.log("Sender:", config.names.sender);
console.log("Receiver:", config.names.receiver);
console.log("Title:", config.content.title);
console.log("Number of songs:", config.songs.length);
console.log("Number of photos:", config.couplePhotos.length);
console.log("=== END TEST ===");
