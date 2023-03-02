export declare enum CellType {
    TEXT = "s",
    NUMBER = "n",
    DATE = "d",
    BOOLEAN = "b"
}
export declare enum CellPattern {
    INTEGER = "0",
    DECIMAL = "0.00",
    DATE = "dd/mm/yyyy",
    TIME = "hh:mm:ss",
    DATETIME = "dd/mm/yyyy hh:mm:ss",
    CURRENCY = "[$$-409]#,##0.00;[RED]-[$$-409]#,##0.00",
    PERCENTAGE = "0.00%",
    EXPONENT = "0.00E+00",
    TEXT = "@"
}
export interface CellFormat {
    type: CellType;
    pattern?: CellPattern;
}
export interface CellFormats {
    [key: string]: CellFormat;
}
export declare const PredefinedFormat: CellFormats;
export interface FormatDefinition {
    range: string;
    format?: CellFormat;
}
