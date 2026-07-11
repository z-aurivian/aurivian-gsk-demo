import Anthropic from '@anthropic-ai/sdk';

const apiKey = process.env.REACT_APP_ANTHROPIC_API_KEY;

export async function queryClaudeAPI(messages, systemPrompt) {
  if (!apiKey) throw new Error('No Anthropic API key configured');

  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    system: systemPrompt,
    messages: messages.map(m => ({
      role: m.role,
      content: m.content,
    })),
  });

  return response.content[0].text;
}
