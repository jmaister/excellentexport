
// Constants for cell types
export enum CellTypes {
    TEXT = 's',
    NUMBER = 'n',
    DATE = 'd',
    BOOLEAN = 'b',
}

// Constants for cell patterns
export enum CellPatterns {
    INTEGER = '0',
    DECIMAL = '0.00',
    DATE = 'dd/mm/yyyy',
    TIME = 'hh:mm:ss',
    DATETIME = 'dd/mm/yyyy hh:mm:ss',
    CURRENCY = '[$$-409]#,##0.00;[RED]-[$$-409]#,##0.00',
    PERCENTAGE = '0.00%',
    EXPONENT = '0.00E+00',
    TEXT = '@',
}

export type CellType = 's' | 'n' | 'd' | 'b';

export interface CellFormat {
    type: CellType,
    pattern?: string,
}

// Define structure for predefined formats
export interface CellFormats {
    [key: string]: CellFormat
}
export const PredefinedFormat : CellFormats = {
    NUMBER: { type: CellTypes.NUMBER},
    INTEGER: { type: CellTypes.NUMBER, pattern: CellPatterns.INTEGER },
    DECIMAL: { type: CellTypes.NUMBER, pattern: CellPatterns.DECIMAL },
    CURRENCY: { type: CellTypes.NUMBER, pattern: CellPatterns.CURRENCY },
    PERCENTAGE: { type: CellTypes.NUMBER, pattern: CellPatterns.PERCENTAGE },
    EXPONENT: { type: CellTypes.NUMBER, pattern: CellPatterns.EXPONENT },

    DATE: { type: CellTypes.DATE, pattern: CellPatterns.DATE },

    TIME: { type: CellTypes.DATE, pattern: CellPatterns.TIME },
    DATETIME: { type: CellTypes.DATE, pattern: CellPatterns.DATETIME },

    TEXT: { type: CellTypes.TEXT, pattern: CellPatterns.TEXT },

    BOOLEAN: { type: CellTypes.BOOLEAN },
}

export interface FormatDefinition {
    range: string,
    format?: CellFormat,
}

