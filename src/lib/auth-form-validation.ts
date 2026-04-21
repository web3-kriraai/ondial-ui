const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLoginEmail(value: string): string | undefined {
  const v = value.trim();
  if (!v) return "Email is required";
  if (!EMAIL_RE.test(v)) return "Enter a valid email address";
  return undefined;
}

export function validateLoginPassword(value: string): string | undefined {
  if (!value) return "Password is required";
  if (value.length < 8) return "Use at least 8 characters";
  return undefined;
}

export function validateSignupEmail(value: string): string | undefined {
  const v = value.trim();
  if (!v) return "Email address is required";
  if (!EMAIL_RE.test(v)) return "Please enter a valid email address";
  return undefined;
}
