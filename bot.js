const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const { checkIfCanReply, checkMessageByType } = require("./utils");
const { pluralizeMessageForPidors } = require("./morpher");
const { messageHandlers } = require("./handlers");
const { getCooldown, setCooldown } = require("./cooldownsManager");

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on("message", async (msg) => {
  if (checkIfCanReply(msg)) {
    for (const [key, handler] of Object.entries(messageHandlers)) {
      const additionalCheckers = handler.additionalCheckers?.(msg) ?? true;

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
