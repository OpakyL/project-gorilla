import * as fs from "fs";
import * as path from "path";
import TelegramBot from "node-telegram-bot-api";

import logger from "@utils/logger";
import { ensureFileExists } from "@utils/utils";
import { getRandomItemFromArray } from "@getters";
import { checkMessageThread } from "@checkers";

import { CommandRaw, Commands, CommandTypes } from "@myTypes/commands.types";

export default class CommandFactory {
  private static filePath = path.resolve(
    process.cwd(),
    "config",
    "commands.json"
  );

  private static commands: Commands = {
    regex: [],
    exact: [],
    includes: [],
    stickerId: [],
    photo: [],
  };

  static {
    ensureFileExists(this.filePath);
    this.loadCommands();
  }

  private static loadCommands(): void {
    try {
      const rawData = fs.readFileSync(this.filePath, "utf8");
      const data: Partial<Commands> = JSON.parse(rawData);

      this.commands = {
        ...this.commands,
        ...data,
      };

      Object.keys(this.commands).forEach((key) => {
        (this.commands[key as CommandTypes] || []).forEach((command) =>
          this.processCommand(command)
        );
      });
    } catch (error) {
      logger.error("Failed to load commands:", error);

      this.commands = {
        regex: [],
        exact: [],
        includes: [],
        stickerId: [],
        photo: [],
      };
    }
  }

  private static processCommand(command: CommandRaw): void {
    if (command.pattern) {
      command.matcher = new RegExp(command.pattern, command.flags);
    }

    if (command.responseArray) {
      command.responseFunc = () =>
        getRandomItemFromArray(command.responseArray || []);
    }

    if (command.checkThread) {
      command.additionalChecker = (msg: TelegramBot.Message) =>
        checkMessageThread(msg, command.checkThread || "");
    }
  }

  static getCommands(): Commands {
    return this.commands;
  }

  static reloadCommands(): void {
    this.loadCommands();
  }
}
