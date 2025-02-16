import os

from dotenv import load_dotenv
from googlesearch import search
from newspaper import Article
from openai import OpenAI
from pydantic import BaseModel

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI(
    api_key=OPENAI_API_KEY,
)

# Trusted news sources that we should also check... (potentially contianing info about an old disaster)
ADDITIONAL_NEWS_SITES = [
    "https://abc7.com/post/camp-fire-survivors-paradise-rebuild-resistant-homes-insurer-wants-reward/15907641/"
]

verification_prompt = """
You are a verification agent. You will be given a disaster, a location, and recent news articles
from the location the disaster is supposedly occurring. Check if the disaster is actually occurring
by checking if the news articles mention the disaster. If they do, return True. If they do not, return False.
Make sure to carefully read the articles. Mentions of smoke and fire could indicate a wildfire, or
mentions of water damage could indicate a flood.

Disaster: {disaster}
Location: {location}

News Articles:
```news
{news}
```
"""


class DisasterVerification(BaseModel):
    is_real_disaster: bool


def fetch_news_articles(location: str, num_results: int = 5):
    """
    Searches Google for the top news articles related to a given location,
    fetches their content, and returns them.

    :param location: The name of the location to search news about.
    :param num_results: Number of search results to retrieve.
    :return: A dictionary with article URLs as keys and their content as values.
    """
    query = f"{location} news"
    articles_content = {}

    try:
        search_results = search(query, num_results=num_results)

        for url in search_results:
            try:
                article = Article(url)
                article.download()
                article.parse()

                if article.text:
                    articles_content[url] = article.text
            except Exception as e:
                print(f"Failed to fetch article from {url}: {e}")
    except Exception as e:
        print(f"Error during search: {e}")

    try:
        for url in ADDITIONAL_NEWS_SITES:
            try:
                article = Article(url)
                article.download()
                article.parse()

                if article.text:
                    articles_content[url] = article.text
            except Exception as e:
                print(f"Failed to fetch article from {url}: {e}")
    except Exception as e:
        print(f"Error during search: {e}")

    return articles_content


def verify_disaster(disaster_info):
    """
    Verifies if a disaster is occurring in a given location by checking news articles.
    """
    articles = fetch_news_articles(disaster_info["location"])
    content = '\n'.join(articles.values())

    completion = client.beta.chat.completions.parse(
        model="gpt-4o-mini",
        messages=[
            {"role": "user", "content": verification_prompt.format(
                disaster=disaster_info["disaster_name"],
                location=disaster_info["location"],
                news=content,
            )},
        ],
        response_format=DisasterVerification,
    )
    verification_check = completion.choices[0].message.parsed.is_real_disaster

    return verification_check


if __name__ == "__main__":
    print(verify_disaster(
        {"disaster_name": "Fire", "location": "Los Angeles"}))
