import { getServerSession } from "next-auth";
import { authOptions } from '../app/api/auth/[...nextauth]/options';
import db from "./prisma";

export const checkUser = async () => {
  const session = await getServerSession(authOptions);
  
 try{
  //if no user id in the session
  if (!session?.user?._id) {
    return new Response("Unauthorized", { status: 401 });
  }

 //user id from the session
  const authUserId = session.user._id;

  

  // find or create user in NeonDB
  const user = await db.user.upsert({
    where: { authUserId },
    update: {},
    create: {
      authUserId,
      email: session.user.email,
      name: session.user.name,
    },
  });

  return user; //return the user

}catch(err){
  console.log(err);
}



}
