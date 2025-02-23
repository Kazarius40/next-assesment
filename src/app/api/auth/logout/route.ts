import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';

export async function POST(): Promise<NextResponse> {
    const cookieStore = await cookies();

    cookieStore.set('authTokens', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: -1,
    });

    cookieStore.set('userData', '', {maxAge: -1});

    return NextResponse.redirect('/');
}
