import { USER_IDS, THREAD_IDS } from "@ids";
import { getMessageText } from "@getters";

import TelegramBot from "node-telegram-bot-api";

function checkIfCanReply(msg: TelegramBot.Message): boolean {
  return !msg.from?.is_bot && !msg.forward_from && msg.chat.type !== "private";
}

function checkMessageSender(msg: TelegramBot.Message, person: string): boolean {
  return msg.from?.id === USER_IDS[person];
}

function checkMessageThread(msg: TelegramBot.Message, thread: string): boolean {
  if (thread === "general") {
    return !msg.message_thread_id;
  }

  return msg.message_thread_id === THREAD_IDS[thread];
}

function checkMessageByType(
  msg: TelegramBot.Message,
  type: string,
  matcher: string | RegExp | undefined
): boolean {
  const message = getMessageText(msg);

  if (!message || (!message && type !== "stickerId" && type !== "photo"))
    return false;

  const typeCheckers: Record<string, () => boolean> = {
    code: () =>
      typeof matcher === "string" && message.toLowerCase() === matcher,
    regex: () => matcher instanceof RegExp && matcher.test(message),
    includes: () =>
      typeof matcher === "string" && message.toLowerCase().includes(matcher),
    photo: () => !!msg.photo,
    stickerId: () =>
      typeof matcher === "string" &&
      !!msg.sticker &&
      msg.sticker.file_id === matcher,
  };

  return typeCheckers[type] ? typeCheckers[type]() : false;
}

export {
  checkIfCanReply,
  checkMessageSender,
  checkMessageThread,
  checkMessageByType,
};
