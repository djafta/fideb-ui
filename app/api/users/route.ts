export function GET(request: Request) {

    console.log(request)

    return new Response(
        JSON.stringify({
            message: 'Hello from the GET method of the users route',
        }),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
}
