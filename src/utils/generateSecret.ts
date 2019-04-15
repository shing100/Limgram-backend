import { adjectives, nouns } from "./words";

export const generateSecret = () : string => {
    const randomNumber : number = Math.floor(Math.random() * nouns.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`
};