import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { verifyToken } from '../../../../lib/auth';

// GET /api/sections/:name - Get specific section data
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params;

    const section = await prisma.section.findUnique({
      where: { name },
    });

    if (!section) {
      return NextResponse.json(
        { error: `Section "${name}" not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json(section.data);
  } catch (error: any) {
    console.error('Error fetching section:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve section data.' },
      { status: 500 }
    );
  }
}

// PUT /api/sections/:name - Update specific section data (Authenticated)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    // Verify JWT authentication
    const authHeader = request.headers.get('authorization');
    let adminUsername: string;

    try {
      const decoded = verifyToken(authHeader);
      adminUsername = decoded.username;
    } catch (authError: any) {
      const status = authError.message.includes('Forbidden') ? 403 : 401;
      return NextResponse.json({ error: authError.message }, { status });
    }

    const { name } = await params;
    const body = await request.json();
    const { data } = body;

    if (!data) {
      return NextResponse.json(
        { error: 'Request body must contain "data" object.' },
        { status: 400 }
      );
    }

    // Upsert section data (update if exists, create if not)
    const updatedSection = await prisma.section.upsert({
      where: { name },
      update: { data },
      create: { name, data },
    });

    console.log(`✅ Section "${name}" successfully updated by admin "${adminUsername}".`);

    return NextResponse.json({
      message: `Section "${name}" updated successfully.`,
      section: updatedSection,
    });
  } catch (error: any) {
    console.error('Error updating section:', error);
    return NextResponse.json(
      { error: 'Failed to update section data.' },
      { status: 500 }
    );
  }
}
