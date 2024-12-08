const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
require("module-alias/register");

const { checkIfCanReply, checkMessageByType } = require("@checkers");
const { pluralizeMessageForPidors } = require("@morpher");
const { getCooldown, setCooldown } = require("@cooldownsManager");
const comands = require("@comands");
// const logger = require("@logger");

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on("message", async (msg) => {
  if (checkIfCanReply(msg)) {
    for (const comand of Object.values(comands)) {
      const additionalCheckers = comand.additionalCheckers?.(msg) ?? true;

      if (
        checkMessageByType(msg, comand.type, comand.matcher) &&
        additionalCheckers
      ) {
        const botMethod = comand.customBotMethod ?? "sendMessage";
        const response = comand.responseFunc?.() ?? comand.response;

        bot[botMethod](msg.chat.id, response, {
          message_thread_id: msg.message_thread_id,
          ...(comand.shouldReply && {
            reply_parameters: { message_id: msg.message_id },
          }),
        });

        return;
      }
    }

    const chatId = msg.chat.id;
    const now = Date.now();
    const lastCooldown = getCooldown(chatId);

    if (now - lastCooldown > 30 * 60 * 1000) {
      const pluralizedMessageForPidors = await pluralizeMessageForPidors(msg);

      if (pluralizedMessageForPidors) {
        bot.sendMessage(msg.chat.id, pluralizedMessageForPidors, {
          message_thread_id: msg.message_thread_id,
          reply_parameters: { message_id: msg.message_id },
        });

        setCooldown(chatId, now);
      }
    }
  }
});

// process.on("uncaughtException", (err) => {
//   logger.error(`Uncaught Exception: ${err.message}`);
// });

// process.on("unhandledRejection", (err) => {
//   logger.error(`Unhandled Rejection: ${err}`);
// });
