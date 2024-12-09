declare module "mystem3" {
  export default class MyStem {
    constructor();
    start(): Promise<void>;
    stop(): void;
    extractAllGrammemes(word: string): Promise<string[]>;
    analyze(text: string): Promise<Array<{ analysis: any[]; text: string }>>;
  }
}
