import { FONTS } from "@utils/constants";
import { useFonts } from "expo-font";

export function useLoadFonts() {
  const [loaded, error] = useFonts({
    [FONTS.MerriweatherLightIt]: require("../../assets/fonts/Merriweather-LightIt.ttf"),
    [FONTS.MerriweatherLight]: require("../../assets/fonts/Merriweather Light.ttf"),
    [FONTS.MerriweatherRegular]: require("../../assets/fonts/Merriweather-Regular.ttf"),
    [FONTS.MerriweatherItalic]: require("../../assets/fonts/Merriweather-Italic.ttf"),
    [FONTS.MerriweatherBold]: require("../../assets/fonts/Merriweather-Bold.ttf"),
    [FONTS.MerriweatherBoldIt]: require("../../assets/fonts/Merriweather-BoldIt.ttf"),
    [FONTS.MerriweatherUltraBold]: require("../../assets/fonts/Merriweather UltraBold.ttf"),
    [FONTS.MerriweatherUltraBdIt]: require("../../assets/fonts/Merriweather-UltraBdIt.ttf"),
  });

  return { loaded, error };
}
