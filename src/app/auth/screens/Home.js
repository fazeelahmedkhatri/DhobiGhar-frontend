import React from "react";
import { Flex, VStack, Box } from "native-base";
import { HeaderText, Button } from "../../../components";
import styles from "../styles";
import {
	LOGIN_SCREEN,
	SIGNUP_SCREEN,
} from "../../../routes";
import HomeBannerImage from "../../../cdn/Vectors/home-screen-banner.svg";

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const AuthHome = ({ navigation }) => {
	return (
		<Flex pos="relative" flex={1} align="center" overflowX="hidden">
			<Box style={styles.homeContainer}>
				<HomeBannerImage width={wp(70)} height={hp(70)} />
			</Box>
			<Box flex={1} style={styles.homeHeaderContainer}>
				<VStack flex={1} pos="relative" w="100%" alignItems="center">
					<HeaderText title="Welcome to DhobiGhar" subTitle="Let's start working now" />
          
					<Button
						variant="outlined"
						onPress={() => navigation.navigate(SIGNUP_SCREEN)}
						title="SignUp"
						style={{
							marginVertical: 15,
							width: wp(50),
						}}
					/>
					<Button
						onPress={() => {
							navigation.navigate(LOGIN_SCREEN)
						}}
						title="Login"
						style={{
							width: wp(50),
						}}
					/>
				</VStack>
			</Box>
		</Flex>
	);
};

export default AuthHome;
