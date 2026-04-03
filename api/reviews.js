const PLACE_ID = 'ChIJAQAwjjtMJ5URZFdC1X4F3Ow'
const API_KEY = process.env.GOOGLE_PLACES_API_KEY

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${PLACE_ID}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': API_KEY,
          'X-Goog-FieldMask': 'rating,userRatingCount,reviews.rating,reviews.text,reviews.originalText,reviews.authorAttribution,reviews.relativePublishTimeDescription,reviews.publishTime',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`Google API error: ${response.status}`)
    }

    const data = await response.json()

    res.status(200).json({
      rating: data.rating,
      totalReviews: data.userRatingCount,
      reviews: (data.reviews || []).map((r) => ({
        name: r.authorAttribution?.displayName || 'Anônimo',
        photoUrl: r.authorAttribution?.photoUri
          ? r.authorAttribution.photoUri.replace(/^\/\//, 'https://')
          : null,
        rating: r.rating,
        text: r.originalText?.text || r.text?.text || '',
        date: r.relativePublishTimeDescription || '',
        publishTime: r.publishTime,
      })),
    })
  } catch (error) {
    console.error('Reviews API error:', error)
    res.status(500).json({ error: 'Failed to fetch reviews' })
  }
}
