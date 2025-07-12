export class AuthError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.name = 'AuthError';
  }

  static getReadableMessage(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'An account with this email already exists.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/operation-not-allowed':
        return 'Email/password accounts are not enabled. Please contact support.';
      case 'auth/weak-password':
        return 'Password is too weak. Please choose a stronger password.';
      case 'auth/user-disabled':
        return 'This account has been disabled. Please contact support.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please check your credentials and try again.';
      case 'auth/too-many-requests':
        return 'Too many unsuccessful attempts. Please try again later.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection and try again.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }

  getReadableMessage(): string {
    return AuthError.getReadableMessage(this.code);
  }
}
