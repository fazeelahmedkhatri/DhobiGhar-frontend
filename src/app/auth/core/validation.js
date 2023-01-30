import * as yup from "yup";
import moment from 'moment'

export const signUpValidationSchema = yup.object().shape({
	full_name: yup
		.string()
		.min(3, "Your first name length should atleast 3 characters")
		.max(256, "first name cannot exceed 256 characters")
		.required("This is a required field")
		.trim(),
	// last_name: yup
	//   .string()
	//   .min(3, "Your last name length should atleast 3 characters")
	//   .max(256, "last name cannot exceed 256 characters")
	//   .required("This is a required field")
	//   .trim(),
	city: yup.string().required("city is required"),
	gender: yup
		.string()
		.oneOf(["male", "female", "other"], "Wrong value")
		.required("geneder is required"),
  birth_date: yup.string().test("birth_date", (value, ctx) => {
    if (value === "") return ctx.createError({ message: "date of birth is empty" });
    const date = moment(value, "DD-MM-YYYY")
    if (!date.isValid()) return ctx.createError({ message: "Date should be in valid format DD-MM-YYYY" })
    return true;
  }).required("date of birth is required"),
	email: yup
		.string()
		.email("Invalid email formmat")
		.required("This is a required field"),
	password: yup
		.string()
		.required("This is a required field")
		.min(8, "Password must be minimum of 8 characters long")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*^?&])[A-Za-z\d@$!^%*#?&]{8,}$/,
			"Password must contain atleast one number, one special character, one uppercase and lowercase letter "
		),
	confirm_password: yup
		.string()
		.required("This is a required field")
		.oneOf([yup.ref("password"), null], "Passwords must match"),
	contact_number: yup
		.string()
		.trim()
		.matches(/^[0-9]+$/, "The phone cannot contain non-numeric characters")
		.length(11, "The phone number should be 11 digits long"),
});



export const loginSchema = yup.object().shape({
	email: yup
		.string()
		.email("Invalid email formmat")
		.required("This is a required field"),
	password: yup
		.string()
		.required("This is a required field")
		.min(8, "Password must be minimum of 8 characters long"),
});
