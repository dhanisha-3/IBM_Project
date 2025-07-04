const OPENAI_API_KEY = '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';

export async function explainCode(code: string, language: string): Promise<string> {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a helpful programming tutor. Explain code snippets in plain English that beginners can understand. Focus on:
            1. What the code does overall
            2. How it works step by step
            3. Key concepts and terminology
            4. Any important programming patterns used
            Keep explanations clear, concise, and educational.`
          },
          {
            role: 'user',
            content: `Please explain this ${language} code:\n\n${code}`
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API Error:', response.status, response.statusText, errorText);
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'Sorry, I could not explain this code.';
  } catch (error) {
    console.error('Error explaining code:', error);
    throw new Error('Failed to explain code. Please try again.');
  }
}