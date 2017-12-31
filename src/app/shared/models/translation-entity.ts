export interface TranslationEntity {
    index: number; // Line index in source properties file
    originLine: string; // Source read line content
    needTranslation: boolean; // Should this line be translated
    key?: string;
    value?: string;
    srcLoc?: string; // Source locale
    translated?: Map<string, string>;
}