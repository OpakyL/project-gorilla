declare module 'morpher-ws3-client' {
  export default class Morpher {
    constructor(options: { token: string });
    russian: {
      declension(word: string): Promise<{
        plural: {
          nominative: string;
        };
      }>;
    };
  }
}
