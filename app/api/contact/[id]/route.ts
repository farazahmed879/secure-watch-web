import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { verifyToken } from '../../../../lib/auth';

// DELETE /api/contact/:id - Admin protected endpoint to delete a contact submission
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify JWT authentication
    const authHeader = request.headers.get('authorization');
    try {
      verifyToken(authHeader);
    } catch (authError: any) {
      const status = authError.message.includes('Forbidden') ? 403 : 401;
      return NextResponse.json({ error: authError.message }, { status });
    }

    const { id } = await params;

    // Verify database entry exists
    const existingSubmission = await prisma.contactSubmission.findUnique({
      where: { id },
    });

    if (!existingSubmission) {
      return NextResponse.json(
        { error: 'Contact submission not found.' },
        { status: 404 }
      );
    }

    // Delete submission from MongoDB
    await prisma.contactSubmission.delete({
      where: { id },
    });

    return NextResponse.json({
      message: 'Submission deleted successfully.',
    });
  } catch (error: any) {
    console.error('Error deleting contact submission:', error);
    return NextResponse.json(
      { error: 'Failed to delete contact submission.' },
      { status: 500 }
    );
  }
}
