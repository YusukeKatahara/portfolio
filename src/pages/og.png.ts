/**
 * OGP 画像（1200×630）をビルド時に生成する。
 * リポジトリには PNG を置かず、SVG を sharp で焼く（デプロイ先の手元ビルドでも同じものが出る）。
 * デザインは HERO の言語そのまま: 白地に Impact の3行、BIG / DOG / DIG だけ紫、
 * 下端は「地面」の下＝黒帯にドメインと DIG/BUILD/TEST。
 * 論文はここでも売りにしない（記録は本文と CV の役割）。
 */
import sharp from 'sharp';

export const prerender = true;

const FONT = "Impact, 'Anton', 'Noto Sans Condensed', 'Haettenschweiler', 'Arial Narrow Bold', sans-serif";
const ACCENT = '#d166ff';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#ffffff"/>
  <g font-family="${FONT}" fill="#000000">
    <text x="56" y="158" font-size="118">DREAM <tspan fill="${ACCENT}">BIG</tspan></text>
    <text x="56" y="282" font-size="118">BE YOUR <tspan fill="${ACCENT}">DOG</tspan></text>
    <text x="56" y="406" font-size="118"><tspan fill="${ACCENT}">DIG</tspan> DEEPER</text>
  </g>
  <g font-family="${FONT}" fill="#000000">
    <text x="742" y="140" font-size="58">YUSUKE</text>
    <text x="742" y="204" font-size="58">KATAHARA</text>
    <rect x="744" y="238" width="180" height="6" fill="#000000"/>
    <text x="742" y="308" font-size="36">NEUROENGINEERING</text>
    <text x="742" y="356" font-size="36">taVNS RESEARCH</text>
    <text x="742" y="404" font-size="36">NIIGATA UNIVERSITY</text>
  </g>
  <rect y="478" width="1200" height="152" fill="#000000"/>
  <g font-family="${FONT}" fill="#ffffff">
    <text x="56" y="576" font-size="47">bigdogdig.com</text>
    <text x="1144" y="572" font-size="31" text-anchor="end">DIG — RESEARCHER · BUILD — ENGINEER · TEST — ANALYST</text>
  </g>
</svg>`;

export async function GET() {
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
