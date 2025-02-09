/** @type {import('tailwindcss').Config} */
export default  {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        'custom': '7px 7px 1px rgba(0, 0, 0, 0.7)',
        'custom-hover': '1px 1px 1px rgba(0, 0, 0, 0.3)',
        'navShadow': '7px 10px 1px black',
        whiteShadow: '10px 10px 2px rgba(255, 255, 255,.7)'
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.4))',
      },
      fontFamily: {
        rorboto: ['var(--font-roboto)', 'sans-serif']
      }
     
    },
  },
  plugins: [],
};
