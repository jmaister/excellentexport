export declare const b64toBlob: (b64Data: string, contentType: string, sliceSize?: number) => Blob;
export declare const templates: {
    excel: string;
};
/**
 * Convert a string to Base64.
 */
export declare const base64: (s: string) => string;
export declare const format: (s: string, context: any) => string;
/**
 * Get element by ID.
 * @param {*} element
 */
export declare const getTable: (element: (HTMLTableElement | string)) => HTMLTableElement;
/**
 * Get element by ID.
 * @param {*} element
 */
export declare const getAnchor: (element: (HTMLAnchorElement | string)) => HTMLAnchorElement;
/**
 * Encode a value for CSV.
 * @param {*} value
 */
export declare const fixCSVField: (value: string, csvDelimiter: string) => string;
export declare const tableToArray: (table: HTMLTableElement) => any[][];
export declare const tableToCSV: (table: HTMLTableElement, csvDelimiter?: string, csvNewLine?: string) => string;
export declare const createDownloadLink: (anchor: HTMLAnchorElement, base64data: string, exporttype: string, filename: string) => boolean;
export declare const string2ArrayBuffer: (s: string) => ArrayBuffer;
export declare const removeColumns: (dataArray: any[][], columnIndexes: number[]) => void;
