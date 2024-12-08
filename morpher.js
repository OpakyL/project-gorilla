const Morpher = require("morpher-ws3-client");
const MyStem = require("mystem3");
const { getMessageText } = require("./utils");

const morpher = new Morpher({ token: process.env.MORPHER_TOKEN });
const myStem = new MyStem();

myStem.start();

async function pluralizeMessageForPidors(msg) {
  const message = getMessageText(msg);

  if (!message) return false;

  const words = message.split(/\s+/);

  const nouns = [];
  for (const word of words) {
    const result = await myStem.extractAllGrammemes(word);

    if (Array.isArray(result) && result[1] === "S") {
      const lemmatized = await myStem.lemmatize(word);
      nouns.push(lemmatized);
    }
  }

  if (nouns.length === 0) return false;

  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  const declension = await morpher.russian.declension(randomNoun);
  if (declension) {
    const pluralNoun = declension.plural.nominative;

    return `${pluralNoun} для пидоров`;
  }
}

module.exports = {
  pluralizeMessageForPidors,
};
