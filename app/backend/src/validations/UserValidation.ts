export default class UserValidation {
  private static validateEmail(email: string): boolean {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  }

  public static validateUser(email: string): boolean {
    return (
      this.validateEmail(email)
    );
  }
}
