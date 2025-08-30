export async function POST(request, { params }) {
  const { model } = params
  const body = await request.json()
  
  try {
    // Forward the request to your HTTP endpoint
    const response = await fetch(`http://34.85.21.80:8000/predict/${model}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    
    if (!response.ok) {
      return Response.json(
        { error: 'Failed to get prediction' },
        { status: response.status }
      )
    }
    
    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error('Proxy error:', error)
    return Response.json(
      { error: 'Failed to connect to prediction service' },
      { status: 500 }
    )
  }
}