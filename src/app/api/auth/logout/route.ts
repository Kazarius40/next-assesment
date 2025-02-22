import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(): Promise<NextResponse> {
    const cookieStore = await cookies();
    cookieStore.set('userWithTokens', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    });

    return NextResponse.json({ message: 'Logged out successfully' });
}
