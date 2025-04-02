/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

const primaryColor = "#0d2d77"; //; '#2cd5f6';
const secondryColor = '#2cd5f6';


export const kolors = {
	light: {
		text: 'rgb(28, 28, 30)', // #11181C
		background: '#fff',
		tint: tintColorLight,
		icon: '#687076',
		tabIconDefault: '#687076',
		tabIconSelected: tintColorLight,

		primary: primaryColor,
		secondry: secondryColor,
		card: 'rgb(255, 255, 255)',
		border: 'rgb(216, 216, 216)',
		notification: 'rgb(255, 59, 48)',
	},
	dark: {
		text: 'rgb(229, 229, 231)', // #ECEDEE
		background: 'rgb(1, 1, 1)', // #151718
		// background: '#151718',
		tint: tintColorDark,
		icon: '#9BA1A6',
		tabIconDefault: '#9BA1A6',
		tabIconSelected: tintColorDark,

		primary: primaryColor,
		secondry: secondryColor,
		card: 'rgb(18, 18, 18)',
		border: 'rgb(39, 39, 41)',
		notification: 'rgb(255, 69, 58)',
	},
	theme: {
		black: "#000000",
		dark: "#393A3D",
		// textColor: _themeSetting === "dark" ? "#fff" : "#0c0c0c",


		darkContent: "#323232",
		lightContent: "#f2f2f2",
		
		primary: primaryColor,
		secondry: secondryColor,
		light: "#F2F2F2", // #F8F4F4
		white: "#ffffff",
		error: "#de2341",
		success: "#4CAF50",
		successBg: "#ddffdd",
		borderColor: "#0000001A",
		bgColor: "#FCE1E5",
		overlayBgColor: "#00000070"
	}

};
