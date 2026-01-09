import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/src/lib/dbConnect";
import UserModel from "@/src/models/User";
import type { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from "@/src/lib/mongodb";

export const authOptions: NextAuthOptions={
   adapter: MongoDBAdapter(clientPromise),
    providers:[
          //giving the strategies that i want to use for authentication



          //strategy-1
        CredentialsProvider({

            id: "credentials" ,
            name: "Credentials" ,

            credentials:{
                 identifier :{ label:"Email" , type:"text" } ,
                  password:{ label:"Password" , type:"password"}

            },

            //designing the custom method for authorizing the credentials
            async authorize(credentials:any):Promise<any>{
                // await dbConnect();
                const client = await clientPromise;
                 const db = client.db();


                try{
                       //find the user in db using the credential ie  the email
                    //here we are using mongodb adapter for querying our database
                    
const user = await db.collection("users").findOne({
  email: credentials.identifier,
});

                        if(!user){
                            throw new Error("No user found with this email");

                        }
                      
                        //decode the users password

                        const isPasswordCorrect=  await bcrypt.compare(credentials.password , user.password as string);

                        if(isPasswordCorrect) return user; //this user will go into the jwt present in the callbacks part
                        else {
                            throw new Error("Incorrect password")  ;
                        }
                    
                }catch(err:any){
                  throw new Error(err);


                }}}) ,

  //strategy-2
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),

  //strategy-3
  GitHubProvider({
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  }),
    ] ,

    callbacks:{
       //user se jo bhi info mili wo token me shift krdi
        async jwt({token ,user}: {token: JWT, user: any}){

            //my strategy is to inculcate as much data as i can in the TOKEN so that i have to minimize the db queries i.e whatever i want to have i can fethc it directly from the jwt payload4
//Case 1: Credential login ..
          if (user) {
    token._id = user._id?.toString();
    token.email = user.email;
    token.name = user.name;
    return token;
  }
   
               
  // Case 2: OAuth login → user._id does NOT exist

    const client = await clientPromise; //mongodb client
    const db = client.db();


  if (!token._id && token.email) {
    //since the email exists it means that the user is in the database  ,now hop inside the mongodb and get the user id from there


    const existingUser = await db.collection("users").findOne({
  email: token.email,
});


    if (existingUser) {
      token._id = existingUser._id.toString();
      token.name = existingUser.name;
      token.email = existingUser.email;
    }
  }
            return token;
        },

        
        //token se jo bhi info mili wo session me shift krdi
         async session({session  ,token}: {session: any, token: JWT}){

            if(token){
                session.user._id=token._id;
                session.user.email=token.email;
               session.user.name=token.name;
            }
            return session
        }
    } ,
 
    pages:{
           signIn: "/sign-in"
    } ,
    session:{
        strategy:"jwt" ,//bearer strategy jiske pass bhi token hai bas wahi login hai
    } ,
    secret:  process.env.NEXTAUTH_SECRET,
}

