export const generateGradient = (startColor, endColor, steps) => {
  const parseColor = (color) => {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return {r, g, b};
  };

  const interpolateColor = (color1, color2, factor) => {
    const r = Math.round(color1.r + (color2.r - color1.r) * factor);
    const g = Math.round(color1.g + (color2.g - color1.g) * factor);
    const b = Math.round(color1.b + (color2.b - color1.b) * factor);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  let gradientColors = [];
  const start = parseColor(startColor);
  const end = parseColor(endColor);
  for (let i = 0; i < steps; i++) {
    const factor = i / (steps - 1);
    gradientColors.push(interpolateColor(start, end, factor));
  }
  return gradientColors;
}

// Convert a hex color to RGB
function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return {r, g, b};
}

// Calculate the relative luminance of a color
function luminance({r, g, b}) {
  const a = [r / 255, g / 255, b / 255].map((v) => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// Calculate the contrast ratio between two colors
function contrastRatio(lum1, lum2) {
  return lum1 > lum2 ? (lum1 + 0.05) / (lum2 + 0.05) : (lum2 + 0.05) / (lum1 + 0.05);
}

function isContrastingWithArray(color, colorsArray, minContrast = 4.5) {
  const colorLum = luminance(hexToRgb(color));

  for (let c of colorsArray) {
    const cLum = luminance(hexToRgb(c));
    if (contrastRatio(colorLum, cLum) < minContrast) {
      return false;
    }
  }
  return true;
}

export const getRandomColor = (colorsArray = [], calls = 0) => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return isContrastingWithArray(color, colorsArray, 2.5) || calls > 10
    ? color : getRandomColor(colorsArray, calls + 1);
}

export const generateRandomColors = (count) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(getRandomColor(['#3a3a3a', '#ffffff']));
  }
  return colors;
}
