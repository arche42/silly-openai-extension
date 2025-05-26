module.exports = {
  id: 'openai',
  name: 'OpenAI-compatible',
  description: 'Connect to any OpenAI-style API endpoint (LM Studio, KoboldCpp, etc.)',

  async setup() {
    return {
      call: async (prompt, context) => {
        const response = await fetch('http://127.0.0.1:1234/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer natalya-key'
          },
          body: JSON.stringify({
            model: 'mythomax-12-13b',
            messages: [
              { role: 'system', content: '' },
              { role: 'user', content: prompt }
            ]
          })
        });

        const result = await response.json();
        return result.choices?.[0]?.message?.content || '[no response]';
      }
    };
  }
};
