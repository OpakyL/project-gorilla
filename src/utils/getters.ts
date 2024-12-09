import TelegramBot from "node-telegram-bot-api";

function getMessageText(msg: TelegramBot.Message): string | undefined {
  return msg.text || msg.caption;
}

function getRandomItemFromArray(array: Array<string>): string {
  return array[Math.floor(Math.random() * array.length)];
}

function getIsProductionMode(): boolean {
  return process.env.NODE_ENV === "production";
}

export { getMessageText, getRandomItemFromArray, getIsProductionMode };
