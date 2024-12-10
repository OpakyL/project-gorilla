import * as fs from "fs";
import * as path from "path";

import { ensureFileExists } from "@utils/utils";

import { Ids, IdType, Id } from "@myTypes/ids.types";

export default class IdsFactory {
  private static filePath = path.resolve(process.cwd(), "config", "ids.json");

  private static ids: Ids = {
    chatIds: {},
    threadIds: {},
    userIds: {},
  };

  static {
    ensureFileExists(this.filePath);
    this.loadIds();
  }

  private static loadIds(): void {
    const rawData = fs.readFileSync(this.filePath, "utf8");
    const data: Partial<Ids> = JSON.parse(rawData);

    this.ids = { ...this.ids, ...data };
  }

  static getIds(): Ids {
    return this.ids;
  }

  static getId(fieldKey: IdType): Id {
    return this.ids[fieldKey];
  }

  static reloadIds(): void {
    this.loadIds();
  }
}
