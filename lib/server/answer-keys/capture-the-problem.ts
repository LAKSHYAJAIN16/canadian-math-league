import 'server-only'

// Matches the sample problems in app/o/capture-the-problem/page.tsx.
// The old code accidentally graded these against the Team Rush answer key
// (both pages called the same /api/validate_team_results endpoint) — this
// key was never actually correct for this round. Exact-string matching, so
// keep answers in the same format students are asked to enter.
// TODO(content owner): replace with the real Capture the Problem set before launch.
export const CAPTURE_THE_PROBLEM_ANSWER_KEY: Record<number, string> = {
  1: '4', // 2 + 2
  2: '12', // sqrt(144)
  3: '5', // 3x + 5 = 20
  4: '154', // area of circle r=7, using pi = 22/7
  5: '55', // sum of first 10 natural numbers
  6: '120', // 5!
  7: '32', // next in 2, 4, 8, 16, ...
  8: '3.14', // pi to two decimal places
  9: '225', // 15^2
  10: '180', // sum of interior angles of a triangle
}
