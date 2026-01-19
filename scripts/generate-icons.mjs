import sharp from 'sharp'
import { writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const iconsDir = join(__dirname, '..', 'public', 'icons')
const distIconsDir = join(__dirname, '..', 'dist', 'icons')

// Ensure directories exist
mkdirSync(iconsDir, { recursive: true })
mkdirSync(distIconsDir, { recursive: true })

const sizes = [16, 32, 48, 128]
const svgFile = join(iconsDir, 'icon128.svg')

async function generateIcons() {
  try {
    for (const size of sizes) {
      // Generate public icons
      const publicPath = join(iconsDir, `icon${size}.png`)
      await sharp(svgFile)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(publicPath)
      console.log(`Created ${publicPath}`)

      // Generate dist icons
      const distPath = join(distIconsDir, `icon${size}.png`)
      await sharp(svgFile)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(distPath)
      console.log(`Created ${distPath}`)
    }
    console.log('✓ All icons generated successfully!')
  } catch (error) {
    console.error('Error generating icons:', error)
    process.exit(1)
  }
}

generateIcons()
