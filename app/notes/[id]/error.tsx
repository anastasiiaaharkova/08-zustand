"use client"

interface ErrorProps {
    error: Error;
    reset: () => void;    
}

function Error({ error, reset }: ErrorProps) {
    return (
        <div>
            <p>Could not fetch note details. {error.message}</p>
            <button onClick={() => reset()}>Try again</button>
        </div>
    );
}

export default Error;