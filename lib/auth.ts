import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secure-watch-super-secret-key-24-7-365';

export interface DecodedToken {
  id: string;
  username: string;
  iat: number;
  exp: number;
}

/**
 * Verify the JWT token from an Authorization header value.
 * Expects format: "Bearer <token>"
 * Returns the decoded payload or throws an error.
 */
export function verifyToken(authHeader: string | null): DecodedToken {
  if (!authHeader) {
    throw new Error('Unauthorized: Access token is missing.');
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new Error('Unauthorized: Malformed authorization header.');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    return decoded;
  } catch {
    throw new Error('Forbidden: Invalid or expired token.');
  }
}

/**
 * Sign a new JWT token for admin login.
 */
export function signToken(payload: { id: string; username: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}
