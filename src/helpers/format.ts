import Constants from 'expo-constants';
export function formatNumberToFrenchStyle(stringNumber: string | number | undefined, curency = true) {
    // Create a new instance of NumberFormat
    const IntNumber = +(stringNumber || 0)
    const formatter = new Intl.NumberFormat('fr-FR', {
        style: 'decimal',
        minimumFractionDigits: 2
    });

    // Format the number
    return `${formatter.format(IntNumber)}${curency ? ` ${CURRENCY}` : ''}`;
}
export const CURRENCY = Constants?.manifest2?.extra?.expoClient?.extra?.currency;


