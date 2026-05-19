import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

// GET /api/sections - Get all sections data
export async function GET() {
  try {
    const sections = await prisma.section.findMany();

    // Convert array of sections into a key-value object { [name]: data }
    const sectionMap = sections.reduce((acc: Record<string, any>, sec: { name: string; data: any }) => {
      acc[sec.name] = sec.data;
      return acc;
    }, {});

    return NextResponse.json(sectionMap);
  } catch (error: any) {
    console.error('Error fetching all sections:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve website data.' },
      { status: 500 }
    );
  }
}
