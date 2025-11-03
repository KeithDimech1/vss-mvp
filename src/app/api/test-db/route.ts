import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    console.log('Testing database connection...');

    // Test 1: Count users
    const userCount = await prisma.user.count();
    console.log('User count:', userCount);

    // Test 2: Find keith user
    const keith = await prisma.user.findUnique({
      where: { username: 'keith' },
      select: {
        id: true,
        username: true,
        fullName: true,
        role: true
      }
    });
    console.log('Keith user:', keith);

    return NextResponse.json({
      success: true,
      userCount,
      keithUser: keith,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Database test error:', error);
    console.error('Error name:', error?.name);
    console.error('Error message:', error?.message);
    console.error('Error stack:', error?.stack);

    return NextResponse.json(
      {
        success: false,
        error: error?.message,
        name: error?.name,
        stack: error?.stack
      },
      { status: 500 }
    );
  }
}
