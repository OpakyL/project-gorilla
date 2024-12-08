const {
  checkMessageThread,
  getRandomResponseByCode,
  getResponseByCode,
  getFileIdByCode,
} = require("./utils");

module.exports = {
  messageHandlers: {
    // Regex
    wordForPidors: {
      type: "regex",
      response: () => getResponseByCode("wordForPidors"),
      shouldReply: true,
    },
    myWord: {
      type: "regex",
      customBotMethod: "sendPhoto",
      response: () => getFileIdByCode("myWord"),
      shouldReply: true,
    },

    // Code
    goodLuck: {
      type: "code",
      response: () => getRandomResponseByCode("goodLuck"),
    },
    yes: {
      type: "code",
      response: () => getResponseByCode("yes"),
      shouldReply: true,
    },
    no: {
      type: "code",
      response: () => getResponseByCode("no"),
      shouldReply: true,
    },
    pizda: {
      type: "code",
      response: () => getResponseByCode("pizda"),
      shouldReply: true,
    },
    a: { type: "code", response: () => getResponseByCode("a") },
    iam: {
      type: "code",
      response: () => getResponseByCode("iam"),
      shouldReply: true,
    },

    // Includes
    anime: { type: "includes", response: () => getResponseByCode("anime") },
    ahuel: {
      type: "includes",
      response: () => getResponseByCode("ahuel"),
      shouldReply: true,
    },

    // Includes
    gorilla: {
      type: "stickerId",
      response: () => getResponseByCode("gorilla"),
      shouldReply: true,
    },

    // Рофланы специфик
    goodScore: {
      type: "photo",
      additionalCheckers: (msg) => checkMessageThread(msg, "scores"),
      response: () => getResponseByCode("goodScore"),
    },
  },
};
