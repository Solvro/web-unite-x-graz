import reactThree from "@react-three/eslint-plugin";
import { solvro } from "@solvro/config/eslint";

export default solvro({
  files: ["**/*.{js,mjs,ts,jsx,tsx}"],
  plugins: { "@react-three": reactThree },
  //eslint-disable-next-line import/no-named-as-default-member
  rules: {
    ...reactThree.configs.recommended.rules,
    "react/no-unknown-property": "off",
  },
});
