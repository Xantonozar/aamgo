# Image Assets for AmGo Mango Shop

This directory contains image assets used in the AmGo Mango e-commerce website.

## Required Images

### Product Images
Place product images in the `/public/images/products/` directory with the following filenames:

- `alphonso-mango.jpg`
- `kesar-mango.jpg`
- `langra-mango.jpg`
- `mango-gift-box.jpg`
- `badami-mango.jpg`
- `dasheri-mango.jpg`
- `mango-preserve.jpg`
- `organic-mango-pack.jpg`
- `mango-pulp.jpg`
- `chaunsa-mango.jpg`
- `dried-mango.jpg`
- `amrapali-mango.jpg`
- `mango-honey.jpg`
- `mango-chutney.jpg`
- `placeholder-mango.jpg` (used when other images fail to load)

### Hero Images
Place hero images in the `/public/images/hero/` directory:

- `mango-hero-bg.jpg` (fallback for video hero)

### Banner Images
Place banner images in the `/public/images/banners/` directory:

- `mango-orchard-banner.jpg`
- `placeholder-banner.jpg` (used when other banner images fail to load)

### Videos
Place video files in the `/public/videos/` directory:

- `mango-hero.mp4` (hero background video)

## Image Specifications

- Product images: 800x800px (1:1 aspect ratio)
- Hero image: 1920x1080px (16:9 aspect ratio)
- Banner images: 1600x600px (wide rectangle)
- Placeholder images: Simple designs that represent the content they're replacing

## Image Optimization

For optimal performance:
1. Compress all images using tools like TinyPNG or ImageOptim
2. Use JPEG format for photos and PNG for images with transparency
3. Keep file sizes under 200KB when possible
4. Consider using WebP format with JPG fallbacks for better performance

## Video Optimization

1. Keep the hero video under 5MB
2. Use MP4 format with H.264 encoding
3. Compress the video to a reasonable bitrate (500kbps-1Mbps) 