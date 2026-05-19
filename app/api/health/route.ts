import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

// GET /api/health - Health Check Endpoint
export async function GET() {
  try {
    // Check DB connection by running a simple query
    await prisma.$runCommandRaw({ ping: 1 });

    return NextResponse.json({
      status: 'ok',
      database: 'connected',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'error',
        database: 'disconnected',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
