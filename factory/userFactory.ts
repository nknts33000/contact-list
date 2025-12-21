export function generateUsername(
  prefix = 'user',
  maxLength = 20
): string {
  const timePart = Date.now().toString(36); // compact timestamp
  const randomPart = Math.random().toString(36).substring(2, 8); // 6 chars

  let username = `${prefix}-${timePart}${randomPart}`;

  // Ensure max length
  if (username.length > maxLength) {
    username = username.substring(0, maxLength);
  }

  return username;
}


export function generatePassword(length: number = 8): string {
  if (length < 8) {
    throw new Error("Password length must be at least 8 characters.");
  }

  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const specials = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  const allChars = upper + lower + numbers + specials;

  // Helper to get a secure random index
  const randomIndex = (max: number): number => {
    if (typeof crypto !== "undefined" && crypto.getRandomValues) {
      const array = new Uint32Array(1);
      crypto.getRandomValues(array);
      return array[0] % max;
    }
    return Math.floor(Math.random() * max); // fallback
  };

  // Ensure at least one character from each required set
  const passwordChars: string[] = [
    upper[randomIndex(upper.length)],
    lower[randomIndex(lower.length)],
    numbers[randomIndex(numbers.length)],
    specials[randomIndex(specials.length)],
  ];

  // Fill the remaining length with random characters
  for (let i = passwordChars.length; i < length; i++) {
    passwordChars.push(allChars[randomIndex(allChars.length)]);
  }

  // Shuffle the result so the first 4 aren't predictable
  for (let i = passwordChars.length - 1; i > 0; i--) {
    const j = randomIndex(i + 1);
    [passwordChars[i], passwordChars[j]] = [passwordChars[j], passwordChars[i]];
  }

  const generatedPassword = passwordChars.join("");
  console.log(`generated password: ${generatedPassword}`)
  return generatedPassword;
}
