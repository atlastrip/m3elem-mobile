// import Constants from 'expo-constants';
// export function formatNumberToFrenchStyle(stringNumber: string | number | undefined, curency = true) {
//     // Create a new instance of NumberFormat
//     const IntNumber = +(stringNumber || 0)
//     const formatter = new Intl.NumberFormat('fr-FR', {
//         style: 'decimal',
//         minimumFractionDigits: 2
//     });

//     // Format the number
//     return `${formatter.format(IntNumber)}${curency ? ` ${CURRENCY}` : ''}`;
// }
// export const CURRENCY = Constants?.manifest2?.extra?.expoClient?.extra?.currency;



import Constants from 'expo-constants';

// Define the currency constant first
export const CURRENCY = Constants?.manifest2?.extra?.expoClient?.extra?.currency || "$";

/**
 * Formats a number to the desired style with comma as thousands separator and dot as decimal separator.
 *
 * @param {string | number | undefined} stringNumber - The number to format.
 * @param {boolean} [currency=true] - Whether to append the currency symbol.
 * @returns {string} - The formatted number string.
 */
export function formatNumberToFrenchStyle(
  stringNumber: string | number | undefined,
  currency = true
) {
  // Convert the input to a number, defaulting to 0 if undefined
  const numericValue = typeof stringNumber === 'string' ? parseFloat(stringNumber.replace(',', '.')) : Number(stringNumber) || 0;

  // Create a formatter with 'en-US' locale for desired formatting
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Format the number
  const formattedNumber = formatter.format(numericValue);

  // Append the currency symbol if required
  return `${formattedNumber}${currency ? ` ${CURRENCY}` : ''}`;
}
