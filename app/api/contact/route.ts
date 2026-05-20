import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { verifyToken } from '../../../lib/auth';

// POST /api/contact - Public endpoint to submit a contact form
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate inputs
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields (name, email, subject, message) are required.' },
        { status: 400 }
      );
    }

    if (typeof name !== 'string' || typeof email !== 'string' || typeof subject !== 'string' || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid field types. All fields must be strings.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }


    // Save submission to MongoDB
    const submission = await prisma.contactSubmission.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
      },
    });

    return NextResponse.json({
      message: 'Thank you for reaching out! Our security team will contact you shortly.',
      submission,
    });
  } catch (error: any) {
    console.error('Error saving contact submission:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}

// GET /api/contact - Admin protected endpoint to fetch all contact submissions
export async function GET(request: NextRequest) {
  try {
    // Verify JWT authentication
    const authHeader = request.headers.get('authorization');
    try {
      verifyToken(authHeader);
    } catch (authError: any) {
      const status = authError.message.includes('Forbidden') ? 403 : 401;
      return NextResponse.json({ error: authError.message }, { status });
    }


    // Fetch submissions sorted by most recent
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(submissions);
  } catch (error: any) {
    console.error('Error fetching contact submissions:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve contact submissions.' },
      { status: 500 }
    );
  }
}
