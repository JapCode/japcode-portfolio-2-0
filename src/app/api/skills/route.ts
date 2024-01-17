import Skills from '@/models/skills';
import { ResponseError } from '@/types/globals';
import connectDB from '@/utils/dbConecction';
import { NextResponse } from 'next/server';

type ResponseBody = { message: string };

export async function GET(): Promise<NextResponse<ResponseBody>> {
  connectDB();
  const dataToReturn = await Skills.find();
  return NextResponse.json(dataToReturn);
}

export async function POST(
  body: Request,
): Promise<NextResponse<ResponseBody | ResponseError>> {
  try {
    connectDB();
    const data = await body.json();
    const newContent = new Skills(data);
    await newContent.save();
    return NextResponse.json({ message: 'Successfully' });
  } catch (error) {
    console.error('Error processing POST request:', error);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.message,
        },
        { status: 400 },
      );
    }
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        details: 'Something has happened on the server.',
      },
      { status: 500 },
    );
  }
}
