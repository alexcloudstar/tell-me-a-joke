'use server';

import OpenAI from 'openai';

const tellMeAJokeAction = async (jokeTopic: string) => {
    const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.responses.create({
        model: 'gpt-4o',
        instructions: 'You are a helpful assistant that tells jokes.',
        input: `Tell me a joke about ${jokeTopic}.`,
    });


    return response.output_text.trim();
}

export default tellMeAJokeAction;
