import { inngest } from "@/src/lib/ingest/client";
import { serve } from "inngest/next";


//over here we will define our functions which will run in the background
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    
  ],
});