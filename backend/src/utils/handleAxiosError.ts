import { Response } from 'express';

export function handleAxiosError(error: unknown, res: Response): void {
  if (error instanceof Error && 'response' in error) {
    console.error('Error:', res);
    res.status(500).json({ message: error.message || 'An error occurred' });
  } else {
    console.error('Error:', error);
    res.status(500).json({ message: 'An unknown error occurred' });
  }
}
