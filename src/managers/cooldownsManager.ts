import fs from "fs";
import path from "path";

import { ensureFileExists } from "@utils/utils";
import logger from "@utils/logger";

import { Cooldowns } from "@myTypes/cooldowns.types";

const cooldownsFilePath = path.resolve(__dirname, "cooldowns.json");

function readCooldowns(): Cooldowns {
  try {
    ensureFileExists(cooldownsFilePath);

    const data = fs.readFileSync(cooldownsFilePath, "utf-8");
    const cooldowns: Cooldowns = JSON.parse(data) || {};
    return cooldowns;
  } catch (error) {
    logger.error(`Failed to read cooldowns: ${error}`);
    return {};
  }
}

function writeCooldowns(data: Cooldowns): void {
  try {
    fs.writeFileSync(cooldownsFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    logger.error(`Failed to write cooldowns: ${error}`);
  }
}

function getCooldown(chatId: string): number {
  const cooldowns = readCooldowns();
  return cooldowns[chatId] || 0;
}

function setCooldown(chatId: string, timestamp: number): void {
  const cooldowns = readCooldowns();
  cooldowns[chatId] = timestamp;
  writeCooldowns(cooldowns);
}

export { getCooldown, setCooldown };
