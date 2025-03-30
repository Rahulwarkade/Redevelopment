/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      colors: {
        gray: {
          "787878": "var(--color-gray_787878)",
          "414141": "var(--color-gray_414141)",
        },
        black: "var(--color-black_000000)",
        red: "var(--color-red_e52c42)",
        yellow: "var(--color-yellow_d8b500)",
        green: "var(--color-green_36ce00)",
        white: "var(--color-white_ffffff)",
        blue: {
          "3e91ff": "var(--color-blue_3e91ff)",
          eef7ff: "var(--color-blue_eef7ff)",
          d9ecff: "var(--color-blue_d9ecff)",
          bcdeff: "var(--color-blue_bcdeff)",
          "8ecbff": "var(--color-blue_8ecbff)",
          "59acff": "var(--color-blue_59acff)",
          "1b6af5": "var(--color-blue_1b6af5)",
          "1454e1": "var(--color-blue_1454e1)",
          "1744b6": "var(--color-blue_1744b6)",
          "193d8f": "var(--color-blue_193d8f)",
        },
      },
      spacing: {
        "16": "var(--spacing-16)",
        "24": "var(--spacing-24)",
        "32": "var(--spacing-32)",
        "40": "var(--spacing-40)",
        "80": "var(--spacing-80)",
      },
      fontSize: {
        "16": "var(--text-fs-16)",
        "20": "var(--text-fs-20)",
        "24": "var(--text-fs-24)",
        "32": "var(--text-fs-32)",
        "60": "var(--text-fs-60)",
      },
    },
  },
};

export default config;
