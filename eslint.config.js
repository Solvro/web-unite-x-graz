import reactThree from "@react-three/eslint-plugin";
import { solvro } from "@solvro/config/eslint";

export default solvro({
  files: ["**/*.{js,ts,jsx,tsx}"],
  plugins: { "@react-three": reactThree },
  rules: {
    ...reactThree.configs.recommended.rules,
    "react/no-unknown-property": "off", // conflict with properties of react fiber
  },
});
