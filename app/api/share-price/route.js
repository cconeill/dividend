// app/api/share-price/route.js
export async function GET() {
    const API_KEY = process.env.FINNHUB_API_KEY; // Replace with your actual API key
    const symbol = 'pcg'; // Example stock symbol
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`;

    console.log('Fetching share price from:', url); // Debugging statement

    try {
        const response = await fetch(url);
        
        // Log the response status
        console.log('Response status:', response.status);

        if (!response.ok) {
            // If the response is not OK, log the response text
            const errorText = await response.text();
            console.error('Error response:', errorText);
            return new Response('Error fetching share price', { status: response.status });
        }

        const data = await response.json();
        console.log('Fetched data:', data); // Debugging statement
        return new Response(JSON.stringify(data.h), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error fetching share price:', error); // Log the error
        return new Response('Error fetching share price', { status: 500 });
    }
}