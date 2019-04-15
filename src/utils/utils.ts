import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.resolve(__dirname, "../.env")
});

import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

export const generateSecret = () : string => {
    const randomNumber : number = Math.floor(Math.random() * nouns.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`
};

console.log(process.env.SENDGRID_USERNAME);

export const sendMail = (email) => {
    const options = {
        auth: {
            api_user: process.env.SENDGRID_USERNAME,
            api_key: process.env.SENDGRID_PASSWORD
        }
    };
    const client = nodemailer.createTransport(sgTransport(options));
    return client.sendMail(email);
};

export const sendSecretMail = (address: string, secret: string) => {
    const email = {
      from: "limg@limgram.com",
      to: address,
      subject: "임그램에 로그인하기 위한 비밀 단어",
      html: `안녕하세요! 당신의 비밀단어는 ${secret} 입니다!<br/> 복사 붙혀넣기 하세요`
    };
    return sendMail(email);
}