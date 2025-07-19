// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{ _type: string }>(
      req,
      SANITY_WEBHOOK_SECRET
    );

    if (!isValidSignature) {
      console.log('Webhook: Invalid signature');
      return new Response('Invalid Signature', { status: 401 });
    }

    if (!body?._type) {
      return new Response('Bad Request: Missing _type in body', { status: 400 });
    }

    // Revalidate berdasarkan tipe konten (e.g., 'berita', 'produk')
    revalidateTag(body._type);

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      type: body._type,
    });

  } catch (error: any) {
    console.error('Error in revalidate webhook:', error);
    return new Response(error.message, { status: 500 });
  }
}