#!/usr/bin/env bash
# Usage: bash scripts/build-media.sh <path-to-ffmpeg> <folder-with-source-videos> public/media
# Builds web-ready media for the ÉLORA demo from the supplied source videos.
set -e
FF="$1"; SRC="$2"; OUT="$3"
mkdir -p "$OUT"
G="eq=saturation=0.9:contrast=1.02,colorbalance=rs=0.03:gs=0.01:bs=-0.03:rm=0.02:bm=-0.03"
GC="eq=saturation=0.72:contrast=1.0:brightness=0.01,colorbalance=rs=0.05:gs=0.02:bs=-0.05:rm=0.04:bm=-0.05"
still(){ # src time crop width name grade
  "$FF" -v error -y -ss "$2" -i "$SRC/$1" -frames:v 1 -vf "crop=$3,scale=$4:-2:flags=lanczos,${6:-$G}" -c:v libwebp -quality 78 "$OUT/$5.webp"; }
F="iw:ih:0:0"
still "Hero.mp4" 0 "$F" 1920 hero-poster
still "Hero.mp4" 0 "$F" 960 hero-poster-sm
still "Hero.mp4" 9 "iw*0.5:ih:iw*0.24:0" 1000 aesthetic
still "Hero.mp4" 5 "iw*0.5:ih*0.82:iw*0.25:ih*0.1" 1100 skin-texture
still "video 2.mp4" 3 "$F" 1920 skin-poster
still "video 2.mp4" 6 "iw*0.48:ih:iw*0.22:0" 1000 skin-quality
still "video 3.mp4" 2 "iw*0.5:ih:iw*0.42:0" 1000 clinical "$GC"
still "video 4.mp4" 1 "iw*0.48:ih:iw*0.5:0" 1000 technology
still "video 4.mp4" 1 "iw*0.42:ih*0.82:iw*0.15:0" 1000 doctor
still "video 4.mp4" 10 "$F" 1920 room-wide
still "video 4.mp4" 6 "iw*0.4:ih*0.62:iw*0.56:ih*0.12" 1000 equipment
still "video 5.mp4" 0.6 "iw*0.42:ih:iw*0.45:0" 1000 planning
still "video 5.mp4" 8 "iw*0.5:ih:iw*0.42:0" 1100 botanical
still "video 5.mp4" 8 "iw*0.3:ih*0.42:iw*0.62:ih*0.42" 900 botanical-detail
still "video 5.mp4" 8 "$F" 1920 botanical-wide
# Open Graph image (1200x630, JPEG for broad crawler support)
"$FF" -v error -y -ss 0 -i "$SRC/Hero.mp4" -frames:v 1 -vf "scale=1200:-2,crop=1200:630,$G" -q:v 4 "$OUT/og-image.jpg"
vid(){ # src width crf name
  "$FF" -v error -y -i "$SRC/$1" -an -vf "scale=$2:-2:flags=lanczos,$G,format=yuv420p" -c:v libx264 -preset slow -crf "$3" -profile:v high -movflags +faststart "$OUT/$4.mp4"; }
vid "Hero.mp4" 1920 25 hero-1080
vid "Hero.mp4" 1280 27 hero-720
vid "video 2.mp4" 1280 27 skin
vid "video 5.mp4" 1280 28 botanical
# Small responsive variants used in srcset (see src/lib/images.ts)
for f in aesthetic skin-quality clinical technology planning botanical botanical-detail equipment skin-texture doctor; do
  "$FF" -v error -y -i "$OUT/$f.webp" -vf "scale=600:-2:flags=lanczos" -c:v libwebp -quality 76 "$OUT/$f-sm.webp"
done
"$FF" -v error -y -i "$OUT/room-wide.webp" -vf "scale=960:-2:flags=lanczos" -c:v libwebp -quality 76 "$OUT/room-wide-sm.webp"
