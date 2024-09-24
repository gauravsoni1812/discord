/* eslint-disable @typescript-eslint/no-unused-vars */
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { currentUser } from '@clerk/nextjs/server'
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();



const handleauth= async()=>{
    const user = await currentUser()
    const userId = user?.id
    if(!userId){
        throw new Error("unauthorised")
    }
    return {userId:userId}
}

export const ourFileRouter = {
    serverImage : f({image:{maxFileSize:"4MB",maxFileCount:1}}).middleware(()=>handleauth()).onUploadComplete(()=>{
        console.log("upload completed")
    }),
    messageFile:f(["image","pdf"]).middleware(()=>handleauth()).onUploadComplete(()=>{})
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
