import { getAllRankingsServer } from '@/lib/data-server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const rankings = await getAllRankingsServer();
    
    return NextResponse.json(rankings, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error reading rankings:', error);
    return NextResponse.json({ error: 'Failed to load rankings' }, { status: 500 });
  }
}
