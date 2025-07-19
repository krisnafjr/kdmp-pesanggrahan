import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

// Ambil revalidation secret dari environment variable
const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{ _type: string }>(
      req,
      SANITY_WEBHOOK_SECRET
    );

    if (!isValidSignature) {
      return new Response('Invalid Signature', { status: 401 });
    }

    if (!body?._type) {
      return new Response('Bad Request', { status: 400 });
    }

    // Revalidate data berdasarkan tag (tipe konten)
    revalidateTag(body._type);

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    });

  } catch (error: any) {
    console.error(error);
    return new Response(error.message, { status: 500 });
  }
}