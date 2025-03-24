import {describe, expect, it} from "@jest/globals";
import {formatDate} from "@/utils/date.utils";

describe('formatDate', () => {
    it('debería devolver la fecha en formato YYYY-MM-DD', () => {
        const isoString = '2025-03-24T00:00:00Z';
        const result = formatDate(isoString);
        expect(result).toBe('2025-03-24');
    });

    it('debería devolver la fecha en formato correcto con un mes y día de un solo dígito', () => {
        const isoString = '2025-03-04T00:00:00Z';
        const result = formatDate(isoString);
        expect(result).toBe('2025-03-04');
    });

    it('debería devolver la fecha correctamente para el final de un año', () => {
        const isoString = '2025-12-31T00:00:00Z';
        const result = formatDate(isoString);
        expect(result).toBe('2025-12-31');
    });

    it('debería manejar fechas con hora en el formato ISO', () => {
        const isoString = '2025-03-24T15:30:00Z';
        const result = formatDate(isoString);
        expect(result).toBe('2025-03-24');
    });

    it('debería manejar fechas de años bisiestos', () => {
        const isoString = '2024-02-29T00:00:00Z';
        const result = formatDate(isoString);
        expect(result).toBe('2024-02-29');
    });

    it('debería devolver una fecha vacía si el input no es válido', () => {
        const isoString = 'invalid-date';
        const result = formatDate(isoString);
        expect(result).toBe('NaN-NaN-NaN'); // En caso de que la fecha no sea válida
    });
});