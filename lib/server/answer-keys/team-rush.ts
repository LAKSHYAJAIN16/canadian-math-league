import 'server-only'

// Matches the sample questions in app/o/team-competition/page.tsx.
// TODO(content owner): replace with the real Team Rush problem set before launch.
export const TEAM_RUSH_ANSWER_KEY: Record<number, string> = {
  1: '133',
  2: '30',
  3: '1024', // 2^10
  4: '154', // 22/7 * 7 * 7
  5: '36', // LCM of 12 and 18
  6: '7', // 3x - 7 = 14 => x = 7
  7: '720', // sum of interior angles of a hexagon
  8: '30', // 5-12-13 right triangle, area = (5*12)/2
  9: '13', // Fibonacci sequence
  10: '3628800', // 10!
}
