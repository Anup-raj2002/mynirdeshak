const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs/promises');
const path = require('path');
require('dotenv').config();

async function generateScoreCard({ year, stream, UID, Name, Rank, Score, FatherName, MotherName, commonName }) {
  const storagePath = process.env.STORAGE_PATH || '../server_assets/';
  const dir = path.join(storagePath, 'scoreCards', String(year), String(stream));
  await fs.mkdir(dir, { recursive: true });
  const filePath = path.join(dir, `${UID}.pdf`);

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([841.89, 595.28]);
  const { width, height } = page.getSize();

  const primary = rgb(0.13, 0.32, 0.56);
  const accent = rgb(0.93, 0.67, 0.13);
  const text = rgb(0.15, 0.15, 0.15);
  const gradientLeft = rgb(0.13, 0.32, 0.56);
  const gradientRight = rgb(0.4, 0.2, 0.6);

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const title = 'My nirdeshak';
  const titleFontSize = 44;
  const titleX = 40;
  const titleY = height - 60;
  const mid = Math.floor(title.length / 2);
  page.drawText(title.slice(0, mid), {
    x: titleX,
    y: titleY,
    size: titleFontSize,
    font: fontBold,
    color: gradientLeft,
  });
  page.drawText(title.slice(mid), {
    x: titleX + fontBold.widthOfTextAtSize(title.slice(0, mid), titleFontSize),
    y: titleY,
    size: titleFontSize,
    font: fontBold,
    color: gradientRight,
  });

  const subtitleText = 'Educational Excellence';
  const subtitleFontSize = 18;
  page.drawText(subtitleText, {
    x: titleX,
    y: titleY - 30,
    size: subtitleFontSize,
    font,
    color: gradientLeft,
  });

  if (commonName) {
    const headingFontSize = 30;
    const headingText = commonName;
    const headingWidth = fontBold.widthOfTextAtSize(headingText, headingFontSize);
    const headingX = (width - headingWidth) / 2;
    const headingY = height - 170;

    page.drawText(headingText, {
      x: headingX,
      y: headingY,
      size: headingFontSize,
      font: fontBold,
      color: primary,
    });

    const underlineY = headingY - 8;
    page.drawLine({
      start: { x: headingX, y: underlineY },
      end: { x: headingX + headingWidth, y: underlineY },
      thickness: 2,
      color: primary,
    });
  }

  let y = height / 2 + 70;

  const rankText = `Rank: ${Rank}`;
  const rankFontSize = 36;
  const rankWidth = fontBold.widthOfTextAtSize(rankText, rankFontSize);
  page.drawText(rankText, {
    x: (width - rankWidth) / 2,
    y,
    size: rankFontSize,
    font: fontBold,
    color: accent,
  });
  y -= 50;

  const scoreText = `Score: ${Score}`;
  const scoreFontSize = 32;
  const scoreWidth = fontBold.widthOfTextAtSize(scoreText, scoreFontSize);
  page.drawText(scoreText, {
    x: (width - scoreWidth) / 2,
    y,
    size: scoreFontSize,
    font: fontBold,
    color: primary,
  });
  y -= 40;

  const info = [
    ['Name', Name],
    ['Father Name', FatherName],
    ['Mother Name', MotherName],
    ['Stream', stream],
    ['Year', year],
  ];
  const infoFontSize = 22;
  for (const [label, value] of info) {
    const labelWidth = fontBold.widthOfTextAtSize(label + ':', infoFontSize);
    const valueWidth = font.widthOfTextAtSize(String(value ?? ''), infoFontSize);
    const totalWidth = labelWidth + 16 + valueWidth;
    const x = (width - totalWidth) / 2;
    page.drawText(label + ':', { x, y, size: infoFontSize, font: fontBold, color: text });
    page.drawText(String(value ?? ''), { x: x + labelWidth + 16, y, size: infoFontSize, font, color: text });
    y -= 38;
  }

  const uidFontSize = 16;
  page.drawText(`UID: ${UID}`, {
    x: 32,
    y: 48,
    size: uidFontSize,
    font,
    color: text,
  });

  const footerText = 'Score card for mynirdeshak.com';
  const footerFontSize = 18;
  const footerWidth = fontBold.widthOfTextAtSize(footerText, footerFontSize);
  page.drawRectangle({ x: 0, y: 0, width, height: 40, color: accent });
  page.drawText(footerText, {
    x: (width - footerWidth) / 2,
    y: 15,
    size: footerFontSize,
    font: fontBold,
    color: primary,
  });

  const pdfBytes = await pdfDoc.save();
  await fs.writeFile(filePath, pdfBytes);
  return filePath;
}

module.exports = { generateScoreCard };
