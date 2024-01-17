import Project from '@/models/project';
import { ResponseError } from '@/types/globals';
import { IProjectDataResponse } from '@/types/project';
import connectDB from '@/utils/dbConecction';
import { NextResponse } from 'next/server';

type ResponseBody = { message: string };
// type RequestBody = { Content: string };

export async function GET(): Promise<NextResponse<IProjectDataResponse[]>> {
  connectDB();
  const dataToReturn: IProjectDataResponse[] = await Project.find().populate({
    path: 'languages',
    select: 'name',
  });
  return NextResponse.json(dataToReturn);
}
export async function POST(
  body: Request,
): Promise<NextResponse<ResponseBody | ResponseError>> {
  try {
    connectDB();
    const data = await body.json();
    const newLanguage = new Project(data);
    await newLanguage.save();
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
