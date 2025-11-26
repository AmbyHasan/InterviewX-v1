import { NextRequest , NextResponse } from "next/server";
export {default} from "next-auth/middleware"; //MIDDLEWARE RUN KARANE KE LIYE
import { getToken } from "next-auth/jwt"; //GETTING THE TOKEN


export async function middleware(request : NextRequest ){

    const token=await getToken({req:request });
    const url=request.nextUrl; //to find out on which url you are currently at

    //now i am specifying where i can go if i have the token
    
    if(token &&
        (  //if i have the token and i am at any of these routed then i will be redirected to the dashboard page
            url.pathname.startsWith("/sign-in") ||
            url.pathname.startsWith("/sign-up") 
           

        )
    ){
            return NextResponse.redirect(new URL("/" , request.url))
    }

    if(!token && url.pathname.startsWith("/")){
        return NextResponse.redirect(new URL("/sign-in" ,request.url));
    }
    
    return NextResponse.next();


}

//kaha kaha pe mujhe middleware run karana hai
export const config={
    matcher: [
        "/sign-in" ,
        "/sign-up" ,
        "/" 

    ]
}
//jane se phele milke jana

