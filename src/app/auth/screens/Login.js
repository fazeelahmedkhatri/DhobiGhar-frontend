import React from "react";
import { Alert } from "react-native";
import { Flex, Box, VStack, Text } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import styles from "../styles";
import { Field, TextBtn, Button } from "../../../components";
import { BUSINESS_HOME_SCREEN, SIGNUP_SCREEN } from "../../../routes";
import {
	navigateBetweenTwoScreens,
	navigateToForgotPassword,
} from "../navigation";
import { authApi } from "../../../api/auth";
import { setLogin, setToken, setUser } from "../core/slice";
import { loginSchema } from "../core/validation";

const Login = ({ navigation }) => {
	const [login] = authApi.useLoginMutation();
	const dispatch = useDispatch();

	const handleSubmit = (values) => {
		try {
			return login(values)
			.unwrap()
			.then(loginSuccessHandler)
			.catch(loginErrorHandler);
		} catch (error) {
			Alert.alert(error.message)
		}
	};

	function loginSuccessHandler(data) {
		dispatch(setUser({ data: data.data.user }));
		dispatch(setToken({ data: data.data.access_token }));
    dispatch(setLogin(true));
		navigation.navigate(BUSINESS_HOME_SCREEN)
	}

	function loginErrorHandler(error) {
		console.log(error)
		switch (error.status) {
			case 422:
				Alert.alert("Validation Error", JSON.stringify(error.data.errors));
				break;
			default:
				Alert.alert(error.data?.error ?? 'Error Occurred', error?.data?.message);
        return;
		}
	}

	return (
		<KeyboardAwareScrollView
			contentContainerStyle={{ backgroundColor: "#fff", flex: 1 }}
		>
			<Flex flex={1} bgColor="#6497F7">
				<Flex
					pos="absolute"
					top="0"
					w="100%"
					h="20%"
					alignItems="center"
					justifyContent="center"
				>
					<Text
						style={{
							fontSize: 30,
							padding: 20,
							fontWeight: "bold",
							opacity: 0.7,
							color: "white",
						}}
					>
						{"DhobiGhar"}
					</Text>
				</Flex>

				<Formik
					initialValues={{ email: "", password: "" }}
					onSubmit={handleSubmit}
					validationSchema={loginSchema}
				>
					{({
						initialValues,
						errors,
						handleChange,
						handleBlur,
						values,
						handleSubmit: formikSubmit,
						isSubmitting,
					}) => {
						return (
							<VStack flex={1} style={styles.loginContainer} px="12px">
								<Text fontSize="3xl" style={styles.loginHeading}>
									L O G I N
								</Text>
								<Field
									onChange={handleChange("email")}
									onBlur={handleBlur("email")}
									isReadOnly={false}
									name="email"
									type="text"
									placeholder="Enter email address"
									label="Email Address"
								/>
								<Field
									onChange={handleChange("password")}
									onBlur={handleBlur("password")}
									isReadOnly={false}
									name="password"
									type="password"
									placeholder="Enter your password"
									label="Password"
								/>
								<Button
									title="Login"
									onPress={formikSubmit}
									style={{
										width: 200,
									}}
									disabled={isSubmitting}
								/>
								<Flex
									direction="row"
									justify="space-between"
									width="100%"
									mt="3"
									align="center"
								>
									<TextBtn
										styles={{ fontWeight: "bold" }}
										text="Forgot Password?"
										onPress={() => navigateToForgotPassword(navigation)}
									/>
									<Box flexDirection="row">
										Don't have an account?
										<TextBtn
											text="Signup"
											onPress={() =>
												navigation.dispatch(
													navigateBetweenTwoScreens(SIGNUP_SCREEN)
												)
											}
											styles={{ fontWeight: "bold", paddingLeft: 5 }}
										/>
									</Box>
								</Flex>
							</VStack>
						);
					}}
				</Formik>
			</Flex>
		</KeyboardAwareScrollView>
	);
};

export default Login;
