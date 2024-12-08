const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const {
  checkIfCanReply,
  checkMessageThread,
  checkMessageByType,
  getRandomResponseByCode,
  getResponseByCode,
  getFileIdByCode,
} = require("./utils");
// const { processMessage } = require("./morpher");

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on("message", async (msg) => {
  if (checkIfCanReply(msg)) {
    // await processMessage(msg);

    const messageHandlers = {
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

      // Includes
      anime: { type: "includes", response: () => getResponseByCode("anime") },

      // Рофланы специфик
      goodScore: {
        type: "photo",
        additionalCheckers: () => checkMessageThread(msg, "scores"),
        response: () => getResponseByCode("goodScore"),
      },
    };

    for (const key of Object.keys(messageHandlers)) {
      const handler = messageHandlers[key];

      const additionalCheckers = handler.additionalCheckers?.() ?? true;

      if (checkMessageByType(msg, handler.type, key) && additionalCheckers) {
        const botMethod = handler.customBotMethod ?? "sendMessage";

        bot[botMethod](msg.chat.id, handler.response(), {
          message_thread_id: msg.message_thread_id,
          ...(handler.shouldReply && {
            reply_parameters: { message_id: msg.message_id },
          }),
        });

        return;
      }
    }
  }
});
