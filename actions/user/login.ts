"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import axios from 'axios';

import { getUserByEmail, updateUserIP } from "@/lib/user";
import { LoginSchema } from "@/schema";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { sendIPChangeNotification } from "@/lib/mail";

const API_KEY = process.env.GEOLOCATION_API_KEY; // Your IPInfo API key

const getGeolocation = async (ipAddress: any) => {
    try {
        const response = await axios.get(`https://ipinfo.io/${ipAddress}/json?token=${API_KEY}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching geolocation data:', error);
        return null;
    }
};

type FormValues = z.infer<typeof LoginSchema>;

export const login = async (
    values: FormValues,
    req: any, // Add request object to capture IP
    callbackUrl?: string | null,
) => {
    const validateFields = LoginSchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "Invalid fields" };
    }

    const { email, password } = validateFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email does not exist" }
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
        return { error: "Wrong password" }
    }

    // Capture the IP address
    const ipAddress = req?.headers['x-forwarded-for'] || req?.socket?.remoteAddress || 'unknown';

    // Get geolocation data
    const geolocationData = await getGeolocation(ipAddress);
    const country = geolocationData?.country || 'Unknown';

    // Capture device information
    const userAgent = req?.headers['user-agent'] || 'unknown';
    const loginDevice = userAgent;

    // Capture current date
    const loginDate = new Date();

    // Compare with the stored IP address
    if (existingUser.ipAddress && existingUser.ipAddress !== ipAddress) {
        // Send notification about IP change
        await sendIPChangeNotification(existingUser.email, ipAddress, country, loginDate, loginDevice);
    }

    // Update user's IP address, login date, and device in the database
    await updateUserIP(existingUser.id, ipAddress, loginDate, loginDevice);

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT || callbackUrl
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials" }
                default:
                    return { error: "Something went wrong!" }
            }
        }
    }

    return { success: "You logged-in successfully" }
}
