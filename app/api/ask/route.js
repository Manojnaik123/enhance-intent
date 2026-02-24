export const tone = ['Professional', 'Friendly', 'Direct', 'Negotiation-friendly', 'Formal'];
export const constraints = ['Location', 'Time aware', 'Budget'];

export async function POST(request) {
  try {
    const body = await request.json();
    const { service, location, urgency } = body;

    const userQuery = service.trim();

    // Send to GPT
    const response = await fetch("https://models.inference.ai.azure.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a smart assistant that decides if user input is a service request (like Plumber, Barber, Tutor, Cleaner, Private chef, etc.) or a casual greeting/chat.`
          },
          {
            role: "user",
            content: `User input: "${userQuery}" UserLocation : "${location.trim()}"
              Instructions:
              1. If the input clearly represents a service or intent, generate exactly 5 high-intent enhanced variations as a JSON array of strings. Include optional tone (Professional, Friendly, Direct, Negotiation-friendly, Formal) and constraints (Location Aware, Budget, Time Aware) and also include user location and make query more intentfull. 
              2. If the input is a casual chat or greeting (like "hi", "hello", "good morning"), respond with a single string JSON array of length 1 appropriate to the message (like "Hello! How can I help you today?") and also convey them to try asking something related to service so you can help them and also convey in the response that you are trained to make service related query more intentfull. 
              3. Always return a JSON array of strings, even if length is 1. 
              4. Do not include explanations or extra text.`
          }
        ]
      })
    });

    const data = await response.json();

    // Parse GPT output safely
    let parsedArray = [];
    try {
      let rawContent = data.choices[0].message.content;

      // Remove Markdown code fences and whitespace
      rawContent = rawContent.replace(/```json|```/g, "").trim();

      parsedArray = JSON.parse(rawContent);

      if (!Array.isArray(parsedArray)) {
        parsedArray = [parsedArray.toString()];
      }

    } catch (err) {
      console.error("Failed to parse GPT response:", err);
      parsedArray = [`${data.choices[0].message.content}`];
    }

    // Return to frontend
    return Response.json({ result: parsedArray });

  } catch (error) {
    console.error(error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}