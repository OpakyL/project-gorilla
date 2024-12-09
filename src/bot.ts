import TelegramBot from "node-telegram-bot-api";

import dotenv from "dotenv";
dotenv.config();

import { checkIfCanReply, checkMessageByType } from "@checkers";
import { pluralizeMessageForPidors } from "@services/morpher";
import { getCooldown, setCooldown } from "@managers/cooldownsManager";

import comands from "@comands";

import logger from "@utils/logger";

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on("message", async (msg) => {
  logger.error(`Uncaught Exception: ${msg}`);
  if (checkIfCanReply(msg)) {
    for (const comand of Object.values(comands)) {
      const additionalCheckers = comand.additionalCheckers?.(msg) ?? true;

      if (
        checkMessageByType(msg, comand.type, comand.matcher) &&
        additionalCheckers
      ) {
        const botMethod = comand.customBotMethod ?? "sendMessage";
        const response = comand.responseFunc?.() ?? comand.response ?? "";

        bot[botMethod](msg.chat.id, response, {
          message_thread_id: msg.message_thread_id,
          ...(comand.shouldReply && {
            reply_to_message_id: msg.message_id,
          }),
        });

        return;
      }
    }

    const chatId = msg.chat.id.toString();
    const now = Date.now();
    const lastCooldown = getCooldown(chatId);

    if (now - lastCooldown > 30 * 60 * 1000) {
      const pluralizedMessageForPidors = await pluralizeMessageForPidors(msg);

      if (pluralizedMessageForPidors) {
        bot.sendMessage(msg.chat.id, pluralizedMessageForPidors, {
          message_thread_id: msg.message_thread_id,
          reply_to_message_id: msg.message_id,
        });

        setCooldown(chatId, now);
      }
    }
  }
});

process.on("uncaughtException", (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
});

process.on("unhandledRejection", (err) => {
  logger.error(`Unhandled Rejection: ${err}`);
});
