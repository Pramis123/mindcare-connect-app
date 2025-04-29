
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export async function sendMessageToAI(inputText: string): Promise<Message> {
  const API_KEY = '48f31d7042581994b88616ebbd3129aaeee1ee928c428c89b476d76db44a9475';
  const API_URL = 'https://api.together.xyz/v1/chat/completions';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        messages: [
          {role:'system', content: 'You are a mental assistant bot and help other with mental health related stuffs and clear all their problems and doubts related to this and you whole purpose to assist with this stuff and you will give answers to ppls questions mainly on the basis of country nepal and only work is on mental health nothing more than that'},
          {role: 'user', content: inputText }
        ],
        temperature: 0.7,
      })
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      return {
        id: Date.now().toString(),
        text: data.choices[0].message.content.trim(),
        sender: 'bot',
        timestamp: new Date()
      };
    } else {
      return {
        id: Date.now().toString(),
        text: 'Something went wrong. Please try again.',
        sender: 'bot',
        timestamp: new Date()
      };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      id: Date.now().toString(),
      text: 'Error talking to AI.',
      sender: 'bot',
      timestamp: new Date()
    };
  }
}
