// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                montserrat: ['var(--font-montserrat)', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
