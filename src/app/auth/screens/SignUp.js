import React from "react";
import { Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Box, ScrollView } from "native-base";
import { useDispatch } from "react-redux";
import { HeaderText, Form, TextBtn } from "../../../components";
import styles from "../styles";
import { LOGIN_SCREEN } from "../../../routes";
import { navigateBetweenTwoScreens } from "../navigation";
import { authApi } from "../../../api/auth";
import { signUpFormData } from "../constants/index";
import { signUpValidationSchema } from "../core/validation";
import moment from "moment";

const SignUp = ({ navigation, route }) => {
	const dispatch = useDispatch();

	const [register, {}] = authApi.useRegisterMutation();

	const handleSubmit = async (values, { setSubmitting }) => {
		setSubmitting(true);
		try {
			const payload = await register({
				full_name: values.full_name,
				email: values.email,
				contact_number: values.contact_number,
				password: values.password,
				city: values.city,
				gender: values.gender,
				birth_date: moment(values.birth_date, "DD-MM-YYYY").format(
					"YYYY-MM-DD"
				),
			}).unwrap();

			Alert.alert(
				"Registration Successful",
				"A verification link has been sent to your email.",
				[
					{
						text: "ok",
						isPreferred: true,
						onPress: () => navigation.navigate(LOGIN_SCREEN),
					},
				]
			);
		} catch (error) {
			Alert.alert(error.data.message.toString());
		} finally {
			setSubmitting(false);
    }
	};

	return (
		<KeyboardAwareScrollView
			contentContainerStyle={{ backgroundColor: "#fff", flex: 1 }}
		>
			<ScrollView style={styles.signUpContainer}>
				<HeaderText title="Signup" my="20px" />
				<Form
					data={signUpFormData}
					handleSubmit={handleSubmit}
					validationSchema={signUpValidationSchema}
					_btn={{
						title: "Create Account",
						style: {
							width: 250,
						},
					}}
				/>
				<Box
					flexDirection="row"
					alignItems="center"
					justifyContent="center"
					w="100%"
					mt="2"
					mb="5"
				>
					Already have an account?
					<TextBtn
						text="Login"
						onPress={() => {
							navigation.dispatch(navigateBetweenTwoScreens(LOGIN_SCREEN));
						}}
						styles={{ fontWeight: "bold", paddingLeft: 5 }}
					/>
				</Box>
			</ScrollView>
		</KeyboardAwareScrollView>
	);
};

export default SignUp;
