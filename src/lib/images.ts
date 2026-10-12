/**
 * Responsive `srcset` for the stills in /public/media. Each still has a
 * `-sm` variant (see scripts/build-media.sh); widths are the real pixel sizes.
 */
const fullWidths: Record<string, number> = {
  'room-wide': 1920,
  botanical: 1100,
  'skin-texture': 1100,
  'botanical-detail': 900,
};
const smallWidths: Record<string, number> = { 'room-wide': 960 };

export function srcSetFor(src: string): string | undefined {
  const match = src.match(/\/media\/([\w-]+)\.webp$/);
  if (!match) return undefined;
  const name = match[1];
  return `${src.replace('.webp', '-sm.webp')} ${smallWidths[name] ?? 600}w, ${src} ${fullWidths[name] ?? 1000}w`;
}
