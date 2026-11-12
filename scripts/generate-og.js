import fs from 'node:fs';
import zlib from 'node:zlib';

function createPNG(width, height, colorFn) {
  // 1 filter byte per row + width * 4 (RGBA) bytes
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter type 0 (None)
    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;
      const [r, g, b, a] = colorFn(x, y, width, height);
      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a;
    }
  }

  const compressed = zlib.deflateSync(rawData);

  function createChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);

    const typeAndData = Buffer.concat([Buffer.from(type), data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(typeAndData), 0);

    return Buffer.concat([len, typeAndData, crc]);
  }

  function crc32(buf) {
    let c = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      c ^= buf[i];
      for (let k = 0; k < 8; k++) {
        c = (c >>> 1) ^ (c & 1 ? 0xedb88320 : 0);
      }
    }
    return (c ^ 0xffffffff) >>> 0;
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type 6: RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  const ihdrChunk = createChunk('IHDR', ihdr);
  const idatChunk = createChunk('IDAT', compressed);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Generate branded 1200x630 OG image
// Palette: ink: #11140f (17, 20, 15), acid: #d7ff58 (215, 255, 88), coral: #ff7659 (255, 118, 89)
const og = createPNG(1200, 630, (x, y, w, h) => {
  // Border accent
  if (x < 16 || x > w - 16 || y < 16 || y > h - 16) {
    return [215, 255, 88, 255]; // Acid border
  }
  // Brand badge square top-left (x: 80-140, y: 80-140)
  if (x >= 80 && x <= 140 && y >= 80 && y <= 140) {
    return [215, 255, 88, 255]; // Acid box
  }
  // Subtle decorative strip
  if (y >= 540 && y <= 550 && x >= 80 && x <= 1120) {
    return [255, 118, 89, 255]; // Coral strip
  }
  // Subtle grid lines in background
  if (x % 40 === 0 || y % 40 === 0) {
    return [26, 32, 23, 255]; // Subtle dark grid
  }
  return [17, 20, 15, 255]; // Base ink
});

fs.writeFileSync('public/og.png', og);
console.log('Generated public/og.png (1200x630)');
