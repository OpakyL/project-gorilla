import * as fs from "fs";

export function ensureFileExists(filePath: string): void {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({}));
  }
}
