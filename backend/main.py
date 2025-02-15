import json
from pathlib import Path

from fastapi import FastAPI, HTTPException

app = FastAPI()


@app.get("/")
async def read_root():
    raise HTTPException(status_code=404, detail="Root page not supported.")


@app.get("/disaster")
async def read_disaster():
    # TODO: Perform sentiment analysis on tweets, figure out if there is a disaster, and return info.
    return {"disasters": [{"disaster_id": 0, "name": "LA Fire", "Location": "Los Angeles", "Date": "2025-01-07"}]}


@app.get("/tweets/{disaster_id}")
async def read_tweets():
    """
    Returns the tweets related to the given disaster id.
    """
    # Read the file tweets.json and send the content as response
    with open("./tweets.json", "r") as file:
        data = json.load(file)

    return data


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
