import json
import os
from typing import Optional

from dotenv import load_dotenv
from openai import OpenAI
from pydantic import BaseModel

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI(
    api_key=OPENAI_API_KEY,
)

disaster_parsing_prompt = """
You are a disaster response expert looking at tweets to determine if there is a disaster going on in an area.
You will be given a tweet and you must determine if the tweet is talking about an ongoing disaster. If there
is a disaster, give it a name and identify the location if one is mentioned in the tweet. You will be given a 
list of previously identified ongoing disasters. If this tweet seems to match up with one of those disasters,
you should use the existing disaster name.

Disasters:
{disasters}
"""

disaster_response_prompt = """
You are a disaster response expert looking at tweets for an ongoing disaster. You will be given the name
of the disaster, as well as a list of tweets and their locations. Identify the general region the disaster
is taking place, a brief description of the disaster, an action plan for people in the area, and the severity
of the event. Do not use information not included in the tweets.

Disaster: {disaster_name}

```tweets
{tweets}
```
"""


class TweetInfo(BaseModel):
    is_disaster: bool
    disaster_name: Optional[str]
    location: Optional[str]


class DisasterInfo(BaseModel):
    disaster_name: str
    location: str
    description: str
    action_plan: str
    severity: str


class Tweet(BaseModel):
    id: str
    content: str
    location: str


def identify_disasters(path: str):
    """
    Takes a path to a json file of tweets and returns a list of identified disasters.
    """
    current_disasters = {}

    with open(path, "r") as file:
        tweets = json.loads(file.read())

        for tweet in tweets:
            completion = client.beta.chat.completions.parse(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": disaster_parsing_prompt.format(
                        disasters='\n'.join(current_disasters.keys()))},
                    {"role": "user", "content": tweet["content"]},
                ],
                response_format=TweetInfo,
            )
            info: TweetInfo = completion.choices[0].message.parsed

            if info.is_disaster:
                if info.disaster_name not in current_disasters:
                    current_disasters[info.disaster_name] = []
                tweet = Tweet(id=str(tweet["id"]),
                              content=tweet["content"],
                              location=info.location)
                current_disasters[info.disaster_name].append(tweet)

    return current_disasters


def generate_disaster_response(disasters):
    # Given a list of tweets associated with a disaster, identify the location and date of the disaster,
    # a brief description, and an action plan for people in the area.

    disaster_responses = []

    for disaster_name, tweets in disasters.items():
        completion = client.beta.chat.completions.parse(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": disaster_response_prompt.format(
                    disaster_name=disaster_name,
                    tweets='\n\n'.join([f"Tweet: {tweet.content}\nLocation: {tweet.location}" for tweet in tweets]))},
            ],
            response_format=DisasterInfo,
        )
        info: DisasterInfo = completion.choices[0].message.parsed
        info.disaster_name = disaster_name

        disaster_responses.append({
            "id": len(disaster_responses),
            "disaster_name": info.disaster_name,
            "location": info.location,
            "description": info.description,
            "action_plan": info.action_plan,
            "severity": info.severity,
        })

    return disaster_responses


if __name__ == "__main__":
    disasters = identify_disasters("./tweets.json")
    responses = generate_disaster_response(disasters)
    print(responses)
