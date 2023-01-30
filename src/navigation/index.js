import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { getAuthToken } from "../utils/async-storage";
import { setLogin, setToken, setUser } from "../app/auth/core/slice";
import { Header, Loader } from "../components";
import { authApi } from "../api/auth";
import { ACCESS_TOKEN } from "../constants";

import {
	AuthHome,
	Login,
	SignUp,
	BusinessHome,
} from "../app";

import {
	AUTH_HOME_SCREEN,
	LOGIN_SCREEN,
	SIGNUP_SCREEN,
	BUSINESS_HOME_SCREEN,
} from "../routes";

export const AppStack = createNativeStackNavigator();

const Routes = () => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [getMe] = authApi.useLazyMeQuery();

	const checkUserLoggedIn = async () => {
		setLoading(true);
		const token = await getAuthToken(ACCESS_TOKEN);
		if (!token) {
			dispatch(setLogin(false));
			setLoading(false);
			return;
		}
		try {
			return getMe({ token })
				.unwrap()
				.then(checkUserLoggedInSuccess)
				.catch(checkUserLoggedInError);
		} catch (error) {
			Alert.alert(error.message);
		}
	};

	function checkUserLoggedInSuccess(data) {
		setLoading(false);
		dispatch(setLogin(true));
		dispatch(setToken({ data: data.data.access_token }));
		dispatch(setUser({ data: data.data.user }));
		setTimeout(() => setLoading(false), 500);
	}

	function checkUserLoggedInError() {
		setLoading(false);
		dispatch(setLogin(false));
		setTimeout(() => setLoading(false), 500);
	}

	useEffect(() => {
		checkUserLoggedIn();
	}, []);

	const { isLoggedIn } = useSelector((state) => state.auth);

	const config = {
		animation: "timing",
		config: {
			stiffness: 1000,
			damping: 500,
			mass: 3,
			overshootClamping: true,
			restDisplacementThreshold: 0.01,
			restSpeedThreshold: 0.01,
		},
	};

	const headerOptions = {
		headerTitle: () => <></>,
		headerShadowVisible: false,
		headerBackImageSource: require("../cdn/BackArrow.png"),
	};

	if (loading) {
		return <Loader />;
	}

	return (
		<AppStack.Navigator>
			{!isLoggedIn ? (
				<AppStack.Group>
					<AppStack.Screen
						name={AUTH_HOME_SCREEN}
						options={{
							headerTransparent: true,
							headerShown: false,
						}}
						component={AuthHome}
					/>

					<AppStack.Screen
						name={SIGNUP_SCREEN}
						component={SignUp}
						options={headerOptions}
					/>
					<AppStack.Screen
						name={LOGIN_SCREEN}
						component={Login}
						options={{
							headerTransparent: true,
							...headerOptions,
						}}
					/>
				</AppStack.Group>
			) : (
				<AppStack.Group screenOptions={{ ...headerOptions }}>
					<AppStack.Screen
						name={BUSINESS_HOME_SCREEN}
						component={BusinessHome}
						options={{
							header:  (props) => <Header {...props} screenName={"Business"}/>
						}}
					/>
				</AppStack.Group>
			)}
		</AppStack.Navigator>
	);
};

export default Routes;
