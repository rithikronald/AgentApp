export function extractCountryCode(inputString: string): string | null {
  const regex = /\((\+\d+)\)/; // Regular expression to match the country code within parentheses
  const match = regex.exec(inputString); // Executing the regex on the input string
  if (match && match[1]) {
    return match[1]; // Returning the matched country code
  } else {
    return null; // Return null if no match is found
  }
}
