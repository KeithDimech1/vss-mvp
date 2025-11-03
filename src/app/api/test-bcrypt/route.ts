import { NextResponse } from 'next/server';
import { hash, verify } from '@node-rs/bcrypt';

export async function GET() {
  try {
    console.log('Testing @node-rs/bcrypt...');

    const password = 'lithodat2024';
    const hashed = await hash(password, 10);
    console.log('Hash created:', hashed);

    const isValid = await verify(password, hashed);
    console.log('Verification result:', isValid);

    return NextResponse.json({
      success: true,
      password: 'lithodat2024',
      hashCreated: true,
      verificationPassed: isValid,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Bcrypt test error:', error);
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
