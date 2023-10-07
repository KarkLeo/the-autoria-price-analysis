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

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const generateRandomColors = (count) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(getRandomColor());
  }
  return colors;
}
