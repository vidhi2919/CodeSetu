from fastapi import FastAPI, Query, HTTPException
import httpx, csv, os, time

app = FastAPI()
DATA_FILE = os.path.join(os.path.dirname(__file__), "data", "Ayurveda.csv")

namaste_terms = []
with open(DATA_FILE, newline="", encoding="utf-8-sig", errors="ignore") as csvfile:
    reader = csv.DictReader(csvfile)
    namaste_terms = list(reader)

WHO_TOKEN_URL = "https://icdaccessmanagement.who.int/connect/token"
WHO_SEARCH_URL = "https://id.who.int/icd/release/11/2024-01/mms/search"
CLIENT_ID = os.getenv("WHO_CLIENT_ID")      # set in environment
CLIENT_SECRET = os.getenv("WHO_CLIENT_SECRET")

token_cache = {"access_token": None, "expires": 0}

async def get_who_token():
    # reuse token until it expires
    if token_cache["access_token"] and time.time() < token_cache["expires"]:
        return token_cache["access_token"]

    async with httpx.AsyncClient() as client:
        resp = await client.post(
            WHO_TOKEN_URL,
            data={
                "grant_type": "client_credentials",
                "client_id": CLIENT_ID,
                "client_secret": CLIENT_SECRET,
                "scope": "icdapi_access"
            },
            headers={"Content-Type": "application/x-www-form-urlencoded"}
        )
    if resp.status_code != 200:
        raise HTTPException(500, "WHO Token request failed")
    data = resp.json()
    token_cache["access_token"] = data["access_token"]
    token_cache["expires"] = time.time() + data["expires_in"] - 60
    return data["access_token"]

@app.get("/search_icd")
async def search_icd(term: str = Query(..., description="Disease English name from AYUSH")):
    token = await get_who_token()
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            WHO_SEARCH_URL,
            params={"q": term},
            headers={"Authorization": f"Bearer {token}", "Accept": "application/json"}
        )
    if resp.status_code != 200:
        raise HTTPException(resp.status_code, "WHO ICD search failed")
    return {"query": term, "icd_results": resp.json()}
