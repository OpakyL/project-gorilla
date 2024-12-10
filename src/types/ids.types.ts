export type IdType = "chatIds" | "threadIds" | "userIds";

export type Id = Record<string, number>;

export type Ids = Record<IdType, Id>;
