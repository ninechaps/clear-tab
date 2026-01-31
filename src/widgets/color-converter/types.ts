export type ColorFormat = 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla'

export interface ColorRGB {
  r: number
  g: number
  b: number
  a?: number
}

export interface ColorHSL {
  h: number
  s: number
  l: number
  a?: number
}

export interface ConvertedColors {
  hex: string
  hexDisplay: string
  rgb: string
  rgba: string
  hsl: string
  hsla: string
}

export interface DetectionResult {
  format: ColorFormat
  rgb: ColorRGB
}
