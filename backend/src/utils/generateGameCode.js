import { generate } from "otp-generator";

export default function generateGameCode() {
    return generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
    });
}