import TelegramBot from "node-telegram-bot-api";

export interface Command {
  matcher?: RegExp | string;
  response?: string;
  responseFunc?: () => string;
  shouldReply?: boolean;
  customBotMethod?: "sendMessage" | "sendPhoto" | "sendVideo";
  additionalChecker?: (msg: TelegramBot.Message) => boolean;
  timeout?: number;
}

export interface CommandRaw extends Command {
  pattern?: string;
  flags?: string;
  responseArray?: string[];
  checkThread?: string;
  timeout?: number;
}

export type CommandTypes =
  | "regex"
  | "exact"
  | "includes"
  | "photo"
  | "stickerId";

export type Commands = Record<CommandTypes, Command[]>;
