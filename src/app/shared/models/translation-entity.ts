export interface TranslationEntity {
    key: string;
    value: string;
    srcLoc: string; // Source locale
    translated: Map<string, string>;
}