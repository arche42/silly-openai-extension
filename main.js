export default {
  async setup(app) {
    app.registerAPI({
      id: "openai",
      name: "OpenAI-compatible",
      settings: [
        {
          key: "baseURL",
          name: "API URL",
          type: "text",
          default: "http://127.0.0.1:1234/v1"
        },
        {
          key: "apiKey",
          name: "API Key",
          type: "text",
          default: "natalya-key"
        }
      ],
      async call(api, { prompt, system, stop, temperature, maxTokens }) {
        const res = await fetch(`${api.baseURL}/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${api.apiKey}`
          },
          body: JSON.stringify({
            model: "mythomax-12-13b",  // или другой
            messages: [
              ...(system ? [{ role: "system", content: system }] : []),
              { role: "user", content: prompt }
            ],
            temperature,
            max_tokens: maxTokens,
            stop
          })
        });

        const data = await res.json();
        return data.choices?.[0]?.message?.content || "[Empty response]";
      }
    });
  }
};
