export default function generateIdFromEmail(email: string): string {
  if (!email.includes("@")) {
    throw new Error("Email inválido");
  }

  const prefix = email.substring(0, 3);
  const timestamp = Date.now();

  return `${timestamp}${prefix}`;
}