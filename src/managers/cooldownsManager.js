const fs = require("fs");
const path = require("path");

const cooldownsFilePath = path.resolve(__dirname, "cooldowns.json");

function readCooldowns() {
  try {
    if (!fs.existsSync(cooldownsFilePath)) {
      fs.writeFileSync(cooldownsFilePath, JSON.stringify({}));
    }
    const data = fs.readFileSync(cooldownsFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}

function writeCooldowns(data) {
  try {
    fs.writeFileSync(cooldownsFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    return false;
  }
}

function getCooldown(chatId) {
  const cooldowns = readCooldowns();
  return cooldowns[chatId] || 0;
}

function setCooldown(chatId, timestamp) {
  const cooldowns = readCooldowns();
  cooldowns[chatId] = timestamp;
  writeCooldowns(cooldowns);
}

module.exports = { getCooldown, setCooldown };
