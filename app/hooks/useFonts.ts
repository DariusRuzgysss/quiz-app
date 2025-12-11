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
    //RedditSans
    [FONTS.RedditSansBlack]: require("../../assets/fonts/RedditSans-Black.ttf"),
    [FONTS.RedditSansBlackItalic]: require("../../assets/fonts/RedditSans-BlackItalic.ttf"),
    [FONTS.RedditSansBold]: require("../../assets/fonts/RedditSans-Bold.ttf"),
    [FONTS.RedditSansBoldItalic]: require("../../assets/fonts/RedditSans-BoldItalic.ttf"),
    [FONTS.RedditSansExtraBold]: require("../../assets/fonts/RedditSans-ExtraBold.ttf"),
    [FONTS.RedditSansExtraLight]: require("../../assets/fonts/RedditSans-ExtraLight.ttf"),
    [FONTS.RedditSansExtraLightItalic]: require("../../assets/fonts/RedditSans-ExtraLightItalic.ttf"),
    [FONTS.RedditSansItalic]: require("../../assets/fonts/RedditSans-Italic.ttf"),
    [FONTS.RedditSansLight]: require("../../assets/fonts/RedditSans-Light.ttf"),
    [FONTS.RedditSansLightItalic]: require("../../assets/fonts/RedditSans-LightItalic.ttf"),
    [FONTS.RedditSansMedium]: require("../../assets/fonts/RedditSans-Medium.ttf"),
    [FONTS.RedditSansMediumItalic]: require("../../assets/fonts/RedditSans-MediumItalic.ttf"),
    [FONTS.RedditSansRegular]: require("../../assets/fonts/RedditSans-Regular.ttf"),
    [FONTS.RedditSansSemiBold]: require("../../assets/fonts/RedditSans-SemiBold.ttf"),
    [FONTS.RedditSansSemiBoldItalic]: require("../../assets/fonts/RedditSans-SemiBoldItalic.ttf"),
  });

  return { loaded, error };
}
