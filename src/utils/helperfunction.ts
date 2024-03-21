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

export const decimalCheck = (val: number, decimalDigits?: number): number => {
  if (val) {
    if (val % 1 == 0) {
      return val;
    } else {
      if (decimalDigits) {
        return Number(val?.toFixed(decimalDigits));
      } else {
        return Number(val?.toFixed(1));
      }
    }
  } else {
    return 0;
  }
};

export const fetchCity = async (lat: number, lng: number) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${
        import.meta.env.VITE_MAP_API_KEY
      }`
    );
    const data = await response.json();
    console.log("MAP DATA", data);
    if (data.results && data.results.length > 0) {
      const cityName = data.results[0].address_components.find((component) => {
        return component.types.includes("locality");
      }).long_name;
      return cityName;
    }
  } catch (error) {
    console.error("Error fetching current city:", error);
  }
};
