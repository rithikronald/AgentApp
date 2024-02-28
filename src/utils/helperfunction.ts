export function extractCountryCode(inputString: string): string | null {
  const regex = /\((\+\d+)\)/; // Regular expression to match the country code within parentheses
  const match = regex.exec(inputString); // Executing the regex on the input string
  if (match && match[1]) {
    return match[1]; // Returning the matched country code
  } else {
    return null; // Return null if no match is found
  }
}

export function retrieveNumberFromString(str: string) {
  // Regular expression to match digits
  const numberPattern = /\d+/;

  // Use match() to find the number in the string
  const numberArray = str.match(numberPattern);

  // If a number is found, return it
  if (numberArray && numberArray.length > 0) {
    return numberArray[0];
  } else {
    return null; // Return null if no number is found
  }
}
