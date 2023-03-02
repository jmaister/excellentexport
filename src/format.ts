
export enum CellType {
    TEXT = 's',
    NUMBER = 'n',
    DATE = 'd',
    BOOLEAN = 'b',
}

export enum CellPattern {
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

export interface CellFormat {
    type: CellType,
    pattern?: CellPattern,
}

// Define structure for predefined formats
export interface CellFormats {
    [key: string]: CellFormat
}
export const PredefinedFormat : CellFormats = {
    NUMBER: { type: CellType.NUMBER},
    INTEGER: { type: CellType.NUMBER, pattern: CellPattern.INTEGER },
    DECIMAL: { type: CellType.NUMBER, pattern: CellPattern.DECIMAL },
    CURRENCY: { type: CellType.NUMBER, pattern: CellPattern.CURRENCY },
    PERCENTAGE: { type: CellType.NUMBER, pattern: CellPattern.PERCENTAGE },
    EXPONENT: { type: CellType.NUMBER, pattern: CellPattern.EXPONENT },

    DATE: { type: CellType.DATE, pattern: CellPattern.DATE },

    TIME: { type: CellType.DATE, pattern: CellPattern.TIME },
    DATETIME: { type: CellType.DATE, pattern: CellPattern.DATETIME },

    TEXT: { type: CellType.TEXT, pattern: CellPattern.TEXT },

    BOOLEAN: { type: CellType.BOOLEAN },
}

export interface FormatDefinition {
    range: string,
    format?: CellFormat,
}

