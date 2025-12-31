import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const imageUrl = searchParams.get('url')

    if (!imageUrl) {
        return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 })
    }

    // Only allow proxying from your R2 bucket
    const allowedDomain = 'pub-141831e61e69445289222976a15b6fb3.r2.dev'
    if (!imageUrl.includes(allowedDomain)) {
        return NextResponse.json({ error: 'Invalid image URL' }, { status: 403 })
    }

    try {
        const response = await fetch(imageUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
            },
        })

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch image' },
                { status: response.status }
            )
        }

        const imageBuffer = await response.arrayBuffer()
        const contentType = response.headers.get('content-type') || 'image/webp'

        return new NextResponse(imageBuffer, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        })
    } catch (error) {
        console.error('Error proxying image:', error)
        return NextResponse.json(
            { error: 'Failed to proxy image' },
            { status: 500 }
        )
    }
}
