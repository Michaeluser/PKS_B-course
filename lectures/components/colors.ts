// Colors chosen so no two land in the same commonly-named "family" (the
// earlier version had 4 shades that all just read as "green" next to
// each other). Matched contrast (~4.8:1 on white); brown is distinguished
// from orange by saturation, not hue, since hue alone ran out of room.
export const palette = {
  red: '#e11919',
  orange: '#a76113',
  brown: '#9f6441',
  green: '#0f8422',
  teal: '#0e7f7f',
  blue: '#1772ce',
  indigo: '#5547eb',
  purple: '#ab32e8',
  magenta: '#d117a3',
  pink: '#de194a',
} as const

export type ColorName = keyof typeof palette
