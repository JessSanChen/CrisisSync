from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from disaster_finder_agent import (generate_disaster_response,
                                   identify_disasters)
from calling_agent import generate_call_message, make_call
from verification_agent import verify_disaster

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# List of all currently known disasters since the last query.
app.current_disasters = []


@app.get("/")
async def read_root():
    raise HTTPException(status_code=404, detail="Root page not supported.")


@app.get("/disaster")
async def read_disaster():
    return app.disaster_response


@app.get("/tweets/{disaster_id}")
async def read_tweets(disaster_id: int):
    """
    Returns the tweets related to the given disaster id.
    """
    # Read the file tweets.json and send the content as response
    current_disasters = identify_disasters("./tweets.json")
    disaster_response = generate_disaster_response(current_disasters)
    app.current_disasters = current_disasters
    app.disaster_response = disaster_response

    for i, disaster in enumerate(app.current_disasters):
        if i == disaster_id:
            return [tweet.model_dump() for tweet in app.current_disasters[disaster]]

    raise HTTPException(status_code=400, detail="Disaster not found.")


@app.get("/call_911/{disaster_id}")
async def call_911(disaster_id: int):
    """
    Makes a call to the authorities about the given disaster.
    """
    for disaster in app.disaster_response:
        if disaster["id"] == disaster_id:
            # Verify this disaster is real.
            is_real_disaster = verify_disaster(disaster["disaster_name"])

            if not is_real_disaster:
                return {"message": "Disaster is potentially unverified. Not calling 911."}

            # Generate a message to send to 911.
            tweets = app.current_disasters[disaster["disaster_name"]]
            message = generate_call_message(disaster, tweets)
            print("Making call to 911:", message)
            make_call(message)
            return {"message": message}

    raise HTTPException(status_code=400, detail="Disaster not found.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000,
                reload=True, log_level="debug")
