export class invalidCredentialsError extends Error {
  constructor() {
    super("Invalid credentials");
  }
}
