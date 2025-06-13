"use client";

import { useState } from "react";
import tellMeAJokeAction from "./actions/tellMeAJokeAction";

const Home = () => {
    const [jokeTopic, setJokeTopic] = useState("");
    const [jokes, setJokes] = useState<string[]>([]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setJokeTopic(e.target.value);

    const handleJokeRequest = async () => {
        if (!jokeTopic.trim()) {
            alert("Please enter a joke topic.");
            return;
        };

        try {
            const joke = await tellMeAJokeAction(jokeTopic);

            setJokes([...jokes, joke]);

        } catch(error) {
            console.error("Error fetching joke:", error);
            alert("Failed to fetch a joke. Please try again later.");
            return;
        };
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 gap-10">
        <h1 className="text-6xl font-bold">Joke Generator</h1>
        <input placeholder="Insert a joke topic" className="border border-amber-600 py-2 px-5 rounded-md" onChange={onChangeHandler} />
        <button className="bg-amber-600 px-5 py-2 rounded-lg text-lg cursor-pointer" onClick={handleJokeRequest}>Tell me a joke</button>
            <ul>
            {jokes.map((joke, index) => (
                <li key={joke.toLowerCase().trim()} className="text-white mt-4">
                    Joke #{index + 1}: {joke}
                </li>
            ))}
            </ul>
    </div>
  );
}

export default Home;
