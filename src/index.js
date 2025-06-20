export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method !== "POST") {
      return new Response("Only POST allowed", { status: 405 });
    }

    const body = await request.json();

    if (url.pathname === "/groq") {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.GROQ_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      return res;
    }

    if (url.pathname === "/huggingface") {
      const res = await fetch("https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.HF_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      return res;
    }

    return new Response("Not Found", { status: 404 });
  }
};
