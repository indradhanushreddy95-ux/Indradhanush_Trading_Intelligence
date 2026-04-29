import { anthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';
import { Composio } from '@composio/core';
import { VercelProvider } from '@composio/vercel';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  const composio = new Composio({ provider: new VercelProvider() });
  
  console.log("Setting up Composio toolset...");
  
  // Note: Ensure you have connected the app using Composio CLI: `npx composio add github`
  try {
    const tools = await composio.getTools({ apps: ["github"] });

    console.log("Starting conversation with the agent...");
    const result = await generateText({
      model: anthropic('claude-opus-4-6'),
      tools: tools,
      prompt: 'What are the tools available?',
      maxToolRoundtrips: 5,
    });

    console.log('Agent Response:\n', result.text);
  } catch (error) {
    console.error("Error running the agent:");
    console.error(error);
    console.log("\nPlease ensure your API keys are set in the .env file.");
  }
}

main().catch(console.error);
