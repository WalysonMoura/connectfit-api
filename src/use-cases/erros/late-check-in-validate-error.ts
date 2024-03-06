export class LateCheckInValidateError extends Error {
  constructor() {
    super("The check in can only be validate until 20 minutes if its creation");
  }
}
