import "server-only";

export const token = process.env.SANITY_API_READ_TOKEN || 'skyTiKknAxLSgUB2xmdrCSjqvwsqUVVztGm4V8siYVYFpkna6y16o8okvI9Yfy6pgimRq3E3AZyfuFufGSnWMZY0XDjMcC45LjMi0nCtBALmidsKLQkC1fVlOvMzYA1AhHThq3Yho3Q3eRfu5GaeSLFQyts4XFCZcCHeyf0nu6rtt1k96gut';

if (!token) {
  throw new Error("Missing SANITY_API_READ_TOKEN");
}
