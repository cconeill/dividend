// app/api/share-price/route.js
export async function GET() {
    const API_KEY = process.env.FINNHUB_API_KEY;
    const symbol = 'pcg';
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`;

    try {
        const response = await fetch(url, {
            // Cache response for 10 minutes.
            next: { revalidate: 600 },
        });

        // log cache 
        // if (response.headers.get('x-vercel-cache') === 'HIT') {
        //     console.log('✅ Vercel Cache HIT: Returning cached data');
        // } else {
        //     console.log('⚠️ Vercel Cache MISS: Fetching new data from API');
        // }

        if (!response.ok) {
            // If the response is not OK, log the response text
            const errorText = await response.text();
            console.error('Error response:', errorText);
            return new Response('Error fetching share price', { status: response.status });
        }

        const data = await response.json();
        // console.log('Fetched data:', data); // Debugging statement
        return new Response(JSON.stringify(data.h), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error fetching share price:', error);
        return new Response('Error fetching share price', { status: 500 });
    }
}