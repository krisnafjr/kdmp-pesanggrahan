const config = {
  plugins: ["@tailwindcss/postcss"],

  theme: {
    extend: {
      // Tambahkan atau modifikasi bagian ini
      fontFamily: {
        sans: ['var(--font-lato)'],
        serif: ['var(--font-merriweather)'],
      },
    },
  },
  
};

export default config;
