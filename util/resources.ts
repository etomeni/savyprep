import axios from "axios";
import { Share } from "react-native";
// import * as Device from 'expo-device';
// import * as Clipboard from "expo-clipboard";
// import Toast from "react-native-root-toast";


// const checkDeviceType = () => {
//   if (Device.isDevice) {
//     // It's a real device
//     return "https://tesapay-backend.onrender.com";
//   } else if (Device.osName === 'Android') {
//     // It's an Android emulator
//     return "https://tesapay-backend.onrender.com";
//   } else {
//     // It's neither a real device nor an Android emulator
//     return "http://localhost:3000";
//   }
// };
// export const backendUrl = "http://localhost:3000";
// export const apiEndpoint = `${checkDeviceType()}/api/v1`;

export const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~!@#$^&*()_\-+={}[\]\\|"'`;<>,.?/]).{6,}$/;

export function validateEmail(email: string) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Comprehensive email validation regex
	return emailRegex.test(email);
}


export const defaultApiResponse = {
	display: false,
	status: false,
	message: ""
}



export const statusColor = (statusData: string) => {
	const status = `${statusData}`.toLowerCase();
	if (status.includes("failed")) return "red";
	if (status.includes("success")) return "green";
	if (status.includes("pending")) return "purple";
	if (status.includes("processing")) return "blue";
	return ''
}

export function maskText(input: string): string {
	if (input.length <= 4) {
		return input; // If the string has 4 or fewer characters, return as is.
	}

	const visiblePart = input.slice(0, 4); // Get the first 4 characters
	const maskedPart = '*'.repeat(input.length - 4); // Mask the remaining characters

	return visiblePart + maskedPart;
}

export function maskEmailAddress(email: string) {
	// Split the email address into username and domain parts
	const [username, domain] = email.split('@');

	const lastThreeCharacters = username.slice(-3);
	const firstTwoCharacters = username.slice(0, 2);


	// Mask the username part
	const maskedUsername = firstTwoCharacters + '*'.repeat(username.length - 5) + lastThreeCharacters;

	// // Extract the last 3 characters before the @ symbol
	// const maskedDomain = domain.slice(0, domain.length - 3) + '*'.repeat(3);

	// Combine the masked parts to form the masked email
	const maskedEmail = `${maskedUsername}@${domain}`;

	return maskedEmail;
}

// export async function shareText(
//   sharedText: string,
//   sharedTitle: string,
//   feedbackMsg = `shared!`,
//   errorMsg = "Request failed to share.!"
// ) {
//   try {
//     const shareResult = await Share.share({
//       title: sharedTitle,
//       message: sharedText,
//     });

//     if (shareResult.action === Share.sharedAction) {
//       let toast = Toast.show(feedbackMsg, {
//         duration: Toast.durations.LONG,
//         position: Toast.positions.BOTTOM,
//         shadow: true,
//         animation: true,
//         hideOnPress: true,
//         delay: 0,
//       });

//       return true;
//     }
//     return false;
//   } catch (error) {
//     console.log(error);

//     let toast = Toast.show(errorMsg, {
//       duration: Toast.durations.LONG,
//       position: Toast.positions.BOTTOM,
//       shadow: true,
//       animation: true,
//       hideOnPress: true,
//       delay: 0,
//     });
//     return false;
//   }
// }

// export async function copyToClipboard(
//   copiedText: string,
//   feedbackMsg = "copied to clipboard!"
// ) {
//   try {
//     await Clipboard.setStringAsync(copiedText);

//     let toast = Toast.show(feedbackMsg, {
//       duration: Toast.durations.LONG,
//       position: Toast.positions.BOTTOM,
//       shadow: true,
//       animation: true,
//       hideOnPress: true,
//       delay: 0,
//     });

//     return true;
//   } catch (error) {
//     throw error;
//   }
// }


// remove Special Characters And Replace Spaces
export function sanitizedString(text: string) {
	// Use a regular expression to match special characters and spaces
	const regex = /[^a-zA-Z0-9\s]/g;

	// Replace special characters with an empty string and spaces with hyphens
	const sanitizedString = text.replace(regex, "").replace(/\s+/g, "-");

	return sanitizedString;
}

export const stringToColor = (string: string) => {
	let hash = 0;
	let i;

	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	// let color = "#";
	let color = "";

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}
	/* eslint-enable no-bitwise */

	return color;
};

export const stringAvatar = (_name: string) => {
	const name = _name ? _name : "Demo";
	const parts = name.split(" ").filter(Boolean); // Split by space and remove empty parts
	const firstInitial = parts[0]?.[0] || ""; // Get the first character of the first part
	const secondInitial = parts[1]?.[0] || ""; // Get the first character of the second part (if exists)
	return `${firstInitial}${secondInitial}`.toUpperCase(); // Combine and ensure uppercase
};

export const avatarImageUrl = (size: number, fullName: string) => {
	let imgUrl = `https://placehold.co/${size}x${size}/`;
	imgUrl += stringToColor(fullName);
	imgUrl += `/white.png?text=`;
	imgUrl += stringAvatar(fullName);
	return imgUrl;
	// const imgUrl = `https://placehold.co/55x55/${stringToColor(item.otherNames + " " + item.lastName)}/white.png?text=${stringAvatar(item.otherNames + " " + item.lastName)}`,
}

export function formatedNumber(number: number, locales = 'en-US', options = {}) {
	return new Intl.NumberFormat(locales, options).format(number);
}

export const currencyDisplay = (amount: number) => {
	return new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency: "NGN",
		maximumFractionDigits: 2,
	}).format(amount);


	return '₦' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

};

export function displayMessageCount(messageCount: number) {
	if (messageCount < 1000) {
		return messageCount.toString(); // No suffix needed for less than 1000
	} else if (messageCount < 1000000) {
		return (messageCount / 1000).toFixed(2) + "K"; // Suffix K for thousands
	} else if (messageCount < 1000000000) {
		return (messageCount / 1000000).toFixed(2) + "M"; // Suffix M for millions
	} else {
		return (messageCount / 1000000000).toFixed(2) + "B"; // Suffix B for billions
	}
}

export function isNumeric(str: string) {
	// Use regular expression to check if the string contains only digits
	const regex = /^\d+$/;
	return regex.test(str);
	// This test will return false if it contains a decimal point
}


// Format time as MM:SS
export const formatTime = (seconds: number) => {
	const mins = Math.floor(seconds / 60);
	const secs = seconds % 60;
	return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};


export function formatDateToDDMMYYYY(dateString: string): string {
	const date = new Date(dateString);

	if (isNaN(date.getTime())) {
		const date = new Date();
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
		const year = date.getFullYear();

		return `${day}/${month}/${year}`;
		// throw new Error('Invalid date string provided');
	};

	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
	const year = date.getFullYear();

	return `${day}/${month}/${year}`;
}

export function formatTimeToHHMM(dateInput: string): string {
	// const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
	const date = new Date(dateInput);


	if (isNaN(date.getTime())) {
		const date = new Date();

		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');

		return `${hours}:${minutes}`;
	}

	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');

	return `${hours}:${minutes}`;
}

export const pauseExecution = (ms: number): Promise<void> => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

export function formatChatDate(dateString: string): string {
	const date = new Date(dateString);
	const now = new Date();
	const diffMs = now.getTime() - date.getTime();
	const diffHours = diffMs / (1000 * 60 * 60);
	const diffMinutes = Math.floor(diffMs / (1000 * 60));
	const diffSeconds = Math.floor(diffMs / 1000);

	const isToday = date.toDateString() === now.toDateString();

	const yesterday = new Date();
	yesterday.setDate(now.getDate() - 1);
	const isYesterday = date.toDateString() === yesterday.toDateString();

	const isOverAYear = now.getFullYear() > date.getFullYear();

	const formatTime = (d: Date) => {
		const hours = d.getHours();
		const minutes = d.getMinutes().toString().padStart(2, '0');
		const ampm = hours >= 12 ? 'PM' : 'AM';
		const hr = hours % 12 || 12;
		return `${hr}:${minutes} ${ampm}`;
	};

	const formatTimeAgo = (): string => {
		if (diffSeconds < 60) return 'Just now';
		if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`;
		const roundedHours = Math.floor(diffHours);
		return `${roundedHours} hour${roundedHours === 1 ? '' : 's'} ago`;
	};

	if (diffHours < 6) {
		return formatTimeAgo();
	} else if (isToday) {
		return `Today at ${formatTime(date)}`;
	} else if (isYesterday) {
		return `Yesterday at ${formatTime(date)}`;
	} else if (isOverAYear) {
		const month = date.toLocaleString('default', { month: 'short' });
		const day = date.getDate();
		const year = date.getFullYear();
		return `${month} ${day}, ${year} at ${formatTime(date)}`;
	} else {
		const month = date.toLocaleString('default', { month: 'short' });
		const day = date.getDate();
		return `${month} ${day} at ${formatTime(date)}`;
	}
}
