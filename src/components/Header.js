import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { AUTH_HOME_SCREEN } from "../routes";
import { useDispatch } from "react-redux";
import {
	setLogin,
	setToken,
	setUser,
} from "../app/auth/core/slice";
import { setAuthToken } from "../utils/async-storage";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'


const Header = ({ screenName, navigation }) => {

	const dispatch = useDispatch()

	async function logout() {
		dispatch(setUser({ data: {} }));
		dispatch(setLogin(false));
		dispatch(setToken({ data: "" }));
		await setAuthToken("login", "");
		navigation.navigate(AUTH_HOME_SCREEN);
	}
  
	return (
		<View style={styles.headerContainer}>
			<Image
				source={require("../cdn/logo.jpeg")}
        alt="logo"
				style={styles.logo}
			/>
			<Text
				numberOfLines={1}
				adjustsFontSizeToFit
				style={styles.screenText}
			>
				{screenName}
			</Text>
			<Pressable style={styles.dialogItem} onPress={logout}>
				<AntDesign name="logout" size={16} style={styles.dialogIcon} />
				<Text style={styles.dialogText}>Logout</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	headerContainer: {
		width: wp(100),
		paddingHorizontal: 10,
		paddingVertical: 20,
		width: "100%",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		position: "relative",
		backgroundColor: "#56A5FF"
	},
	screenText: {
		fontSize: 22,
		fontWeight: "bold",
		color: "#fff",
	},
	profile: {
		borderColor: "#0038FF",
		borderStyle: "solid",
		borderWidth: 2,
		borderRadius: 25,
	},
	dialogContainer: {
		position: "absolute",
		width: 110,
		backgroundColor: "#f4f4f3",
		top: 82,
		right: 15,
		elevation: 3,
		zIndex: 100,
	},
	triangle: {
		transform: [{ rotate: "45deg" }],
		height: 10,
		width: 10,
		position: "absolute",
		backgroundColor: "#f4f4f3",
		top: -5,
		right: 15,
	},
	dialogItem: {
		display: "flex",
		flexDirection: "row",
		fontSize: 14,
	},
	dialogText: { color: "black", fontSize: 15 },
	dialogIcon: { paddingRight: 10, color: "black" },
	logo: {
		width: '20%',
		height: '20%'
	}
});

export default Header;
