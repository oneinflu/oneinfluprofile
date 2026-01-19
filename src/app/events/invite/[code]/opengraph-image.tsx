import { ImageResponse } from 'next/og'
import { api } from '@/utils/api'

export const runtime = 'edge'

// Image metadata
export const alt = 'Event Invitation'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  
  // Default values
  let eventName = 'Exclusive Event';
  let userName = 'INFLU';
  
  try {
      // Use production URL directly to ensure OG image always has access to data
      const BASE_URL = "https://newyearbackendcode-zrp62.ondigitalocean.app";
      const res = await fetch(`${BASE_URL}/events/public/code/${encodeURIComponent(code)}`);
      const data = await res.json();
      
      const event = data?.data?.event || data?.data?.item || data?.event || data?.item || data?.data || {};
      
      if (event.eventName) eventName = event.eventName;
      if (event.user?.name) userName = event.user.name;
  } catch (e) {
      console.error('Error fetching event for OG image:', e);
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 50%, #fb923c 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
          textAlign: 'center',
          padding: '40px',
        }}
      >
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <h1
            style={{
                fontSize: 80,
                fontWeight: 800,
                margin: '0 0 20px 0',
                padding: 0,
                lineHeight: 1.1,
                textShadow: '0 4px 12px rgba(0,0,0,0.3)',
                letterSpacing: '-0.02em',
            }}
            >
            {eventName}
            </h1>
            <p
            style={{
                fontSize: 36,
                margin: 0,
                padding: 0,
                fontWeight: 500,
                opacity: 0.9,
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
            >
            hosted by {userName}
            </p>
        </div>
        
        {/* Optional Branding at bottom */}
        <div
            style={{
                position: 'absolute',
                bottom: '40px',
                fontSize: 24,
                opacity: 0.7,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
            }}
        >
            Powered by INFLU
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
