import TelegramBot from "node-telegram-bot-api";

export interface Command {
  type: "regex" | "code" | "includes" | "photo" | "stickerId";
  matcher?: RegExp | string;
  response?: string;
  responseFunc?: () => string;
  shouldReply?: boolean;
  customBotMethod?: "sendMessage" | "sendPhoto" | "sendVideo";
  additionalCheckers?: (msg: TelegramBot.Message) => boolean;
}
