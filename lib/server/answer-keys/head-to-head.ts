import 'server-only'

// Matches the sample problems in app/o/head-to-head/page.tsx.
// Exact-string matching, so keep answers in the same format students are
// asked to enter.
// TODO(content owner): replace with the real Head to Head problem set before launch.
export const HEAD_TO_HEAD_ANSWER_KEY: Record<number, string> = {
  1: '54', // 9 x 6
  2: '45', // 17 + 28
  3: '81', // 3^4
  4: '540', // sum of interior angles of a pentagon
  5: '12', // 144 / 12
}
