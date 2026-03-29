const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
const PYTHON_CHAT_URL = `${API_BASE_URL}/chat`;

export async function chatWithAssistant(text, lang, history = []) {
  const trimmed = (text || '').trim();
  if (!trimmed) {
    return { answer: '', services: [], language: lang || 'en', error: 'empty' };
  }

  try {
    const response = await fetch(PYTHON_CHAT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: trimmed, lang, history, top_k: 5 }),
    });

    const data = await response.json();
    if (!response.ok) {
      return { answer: '', services: [], language: lang || 'en', error: data.error || 'chat_failed' };
    }

    return {
      answer: data.answer || '',
      services: Array.isArray(data.services) ? data.services : [],
      language: data.language || lang || 'en',
      error: data.error || null,
    };
  } catch (err) {
    return { answer: '', services: [], language: lang || 'en', error: err.message || 'chat_failed' };
  }
}

export async function chatWithAssistantStream({ text, lang, history = [], onToken }) {
  const trimmed = (text || '').trim();
  if (!trimmed) {
    return { answer: '', services: [], language: lang || 'en', error: 'empty' };
  }

  try {
    const response = await fetch(PYTHON_CHAT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: trimmed, lang, history, top_k: 5, stream: true }),
    });

    if (!response.ok || !response.body) {
      const fallback = await response.json().catch(() => ({}));
      return { answer: '', services: [], language: lang || 'en', error: fallback.error || 'chat_failed' };
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';
    let finalPayload = null;

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue;
        try {
          const data = JSON.parse(trimmedLine);
          if (data.token && onToken) {
            onToken(data.token);
          }
          if (data.done) {
            finalPayload = data;
          }
        } catch (err) {
          continue;
        }
      }
    }

    if (!finalPayload) {
      return { answer: '', services: [], language: lang || 'en', error: 'chat_failed' };
    }

    return {
      answer: finalPayload.answer || '',
      services: Array.isArray(finalPayload.services) ? finalPayload.services : [],
      language: finalPayload.language || lang || 'en',
      error: finalPayload.error || null,
    };
  } catch (err) {
    return { answer: '', services: [], language: lang || 'en', error: err.message || 'chat_failed' };
  }
}
