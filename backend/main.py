import json
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# from disaster_finder_agent import identify_disasters

app = FastAPI()
# Allow requests from your frontend (adjust origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


disasters = []


@app.get("/")
async def read_root():
    raise HTTPException(status_code=404, detail="Root page not supported.")


@app.get("/disaster")
async def read_disaster():
    # current_disasters = identify_disasters("./tweets.json")
    # response = {"disasters": []}

    # for disaster, tweets in current_disasters.items():
    #     response["disasters"].append({
    #         "disaster_id": len(response["disasters"]),
    #         "name": disaster,
    #         "Location": tweets[0].location,
    #         "Date": tweets[0].date,
    #     })

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
