import TelegramBot from "node-telegram-bot-api";

import dotenv from "dotenv";
dotenv.config();

import { checkIfCanReply, checkMessageByType } from "@checkers";
import { getMessageText } from "@getters";
import { pluralizeMessageForPidors } from "@services/morpher";
import { getCooldown, setCooldown } from "@managers/cooldownsManager";

import IdsFactory from "@factories/idsFactory";

import CommandFactory from "@factories/commandFactory";
import { CommandTypes } from "@myTypes/commands.types";

import logger from "@utils/logger";

if (!process.env.BOT_TOKEN) {
  throw new Error("BOT_TOKEN is not defined in the environment variables");
}

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on("message", async (msg) => {
  if (checkIfCanReply(msg)) {
    const message = getMessageText(msg);

    if (message === "/reload") {
      CommandFactory.reloadCommands();
      IdsFactory.reloadIds();

      bot.sendMessage(msg.chat.id, "Обновление конфига завершено", {
        message_thread_id: msg.message_thread_id,
      });

      return;
    }

    const commands = CommandFactory.getCommands();
    for (const commandKey of Object.keys(commands) as CommandTypes[]) {
      commands[commandKey].forEach((command) => {
        const additionalChecker = command.additionalChecker?.(msg) ?? true;

        if (
          checkMessageByType(msg, commandKey, command.matcher) &&
          additionalChecker
        ) {
          const botMethod = command.customBotMethod ?? "sendMessage";
          const response = command.responseFunc?.() ?? command.response ?? "";

          bot[botMethod](msg.chat.id, response, {
            message_thread_id: msg.message_thread_id,
            ...(command.shouldReply && {
              reply_to_message_id: msg.message_id,
            }),
          });

          return;
        }
      });
    }

    if (process.env.MORPHER_TOKEN) {
      const chatId = msg.chat.id.toString();
      const now = Date.now();
      const lastCooldown = getCooldown(chatId);

      if (now - lastCooldown > 60 * 60 * 1000) {
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
  }
});

process.on("uncaughtException", (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
});

process.on("unhandledRejection", (err) => {
  logger.error(`Unhandled Rejection: ${err}`);
});
