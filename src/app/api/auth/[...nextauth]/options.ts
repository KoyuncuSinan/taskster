import type { NextAuthOptions} from 'next-auth'
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";


export const options: NextAuthOptions = {
    providers:[
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "Your  email"
                },
                password:{
                    label: "Password",
                    type: "password",
                    placeholder: "Your password"
                }
            },
            async authorize(credentials){


                if(credentials?.email === user.email && credentials?.password === user.password){
                    return user;
                }else{
                    return null;
                }
            }
        })
    ],
}