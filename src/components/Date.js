import React, { useRef, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";
import { View, Text } from "native-base";
import DateField from "react-native-datefield";
import { useField } from "formik";
const Date = ({
	label,
	value,
	name,
	containerStyles = {},
	handleChange,
	defaultItem,
	error = "",
	handleErrors = () => {},
}) => {

	const [field, meta, helpers] = useField({ name, value })

	return (
		<View style={{ width: "100%", marginBottom: 20 }}>
			<Text style={styles.labelText}>{label}</Text>
			<DateField
				containerStyle={styles.containerStyles}
				labelDate="date"
				labelMonth="month"
				labelYear="year"
				defaultValue={defaultItem}
				styleInput={styles.inputBorder}
				handleErrors={handleErrors}
				onSubmit={handleChange}
			/>
			{!!error && (
				<Text pl="2" pt="1" color="#ff101a" fontSize="10">
					{error}
				</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	containerStyles: {
		width: "100%",
	},
	labelText: {
		fontSize: 16,
		paddingLeft: 10,
		textTransform: "capitalize",
		color: "#000",
		marginBottom: 10,
	},
	inputBorder: {
		paddingVertical: 2,
		width: "30%",
		backgroundColor: "#F2F5FF",
		borderRadius: 8,
		borderColor: "#F2F5FF",
		borderWidth: 1,
	},
});
export default React.memo(Date);
