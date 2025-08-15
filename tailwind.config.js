/** @type {import("tailwindcss").Config} */
const withOpacity = (variableName, alpha) => ({ opacityValue }) => {
  if (alpha) {
    return `rgba(var(${variableName}), ${alpha})`;
  }
  if (opacityValue !== undefined) {
    return `rgba(var(${variableName}), ${opacityValue})`;
  }
  return `rgb(var(${variableName}))`;
};


module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: withOpacity("--color-primary"),
        "primary-50": withOpacity("--color-primary", 0.05),
        "primary-100": withOpacity("--color-primary", 0.1),
        "primary-200": withOpacity("--color-primary", 0.2),
        "primary-300": withOpacity("--color-primary", 0.3),
        "primary-400": withOpacity("--color-primary", 0.4),
        "primary-500": withOpacity("--color-primary", 0.5),
        "primary-600": withOpacity("--color-primary", 0.6),
        "primary-700": withOpacity("--color-primary", 0.7),
        "primary-800": withOpacity("--color-primary", 0.8),
        "primary-900": withOpacity("--color-primary", 0.9),
        secondary: withOpacity("--color-secondary"),
        "secondary-50": withOpacity("--color-secondary", 0.05),
        "secondary-100": withOpacity("--color-secondary", 0.1),
        "secondary-200": withOpacity("--color-secondary", 0.2),
        "secondary-300": withOpacity("--color-secondary", 0.3),
        "secondary-400": withOpacity("--color-secondary", 0.4),
        "secondary-500": withOpacity("--color-secondary", 0.5),
        "secondary-600": withOpacity("--color-secondary", 0.6),
        "secondary-700": withOpacity("--color-secondary", 0.7),
        "secondary-800": withOpacity("--color-secondary", 0.8),
        "secondary-900": withOpacity("--color-secondary", 0.9),
        "dark-plane": "#012242",
        "line": "#D9D9D9",
        "card": "#FAFAFA",
        "icon": "#C3C3C3",
        "valid": "#00A053",
        "font": "#2C2C2C",
        "font-light": "#9CA3AF",
        "font-disabled": "#c3c3c3",
        "error": "#F44336",
        "error-bg": "#FDE3E1",
        "disabled": "#F5F5F7",
        "plane": "#F5F5F7",
        "success": "#06C755",
        "success-bg": "#EAFFF1",
        "warning": "#FF8A00",
        "warning-bg": "#FAE2C7"
      },
      fontSize: {
        "main-size": "26px",
      },
    },
  },
  plugins: [],
}