import { NextResponse } from "next/server";

import { connectDB } from "../../../lib/mongodb";
import { EXPORT_DETAIL } from "next/dist/shared/lib/constants";

export async function GET() {
    try{
        await connectDB();

        return NextResponse.json({
            succes: true,
            message: "mongodb berhasil terhubung",
        });
    }  catch (error){
        console.error(error);

        return NextResponse.json({
            succes:false,
            message: "mongodb tidak berhasil",
            error: error.message,            
        },
    {
        status:500,
    });
    }
    
}