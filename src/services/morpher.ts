import Morpher from "morpher-ws3-client";
import MyStem from "mystem3";
import TelegramBot from "node-telegram-bot-api";

import { getMessageText, getRandomItemFromArray } from "@getters";

const morpher = new Morpher({ token: process.env.MORPHER_TOKEN });
const myStem = new MyStem();

myStem.start();

async function getNouns(words: string[]): Promise<string[]> {
  const grammemes = await Promise.all(
    words.map((word) => myStem.extractAllGrammemes(word))
  );

  return words.filter(
    (_, i) => Array.isArray(grammemes[i]) && grammemes[i][1] === "S"
  );
}

async function pluralizeMessageForPidors(msg: TelegramBot.Message): Promise<false | string> {
  const message = getMessageText(msg);

  if (!message) return false;

  const nouns = await getNouns(message.split(/\s+/));

  if (nouns.length === 0) return false;

  const randomNoun = getRandomItemFromArray(nouns);

  const declension = await morpher.russian.declension(randomNoun);
  if (declension) {
    const pluralNoun = declension.plural.nominative;

    return `${pluralNoun} для пидоров`;
  }

  return false;
}

export { pluralizeMessageForPidors };
