# from fastapi import FastAPI, Query, HTTPException
# import httpx, csv, os, time

# app = FastAPI()
# DATA_FILE = os.path.join(os.path.dirname(__file__), "data", "Ayurveda.csv")

# namaste_terms = []
# with open(DATA_FILE, newline="", encoding="utf-8-sig", errors="ignore") as csvfile:
#     reader = csv.DictReader(csvfile)
#     namaste_terms = list(reader)

# WHO_TOKEN_URL = "https://icdaccessmanagement.who.int/connect/token"
# WHO_SEARCH_URL = "https://id.who.int/icd/release/11/2024-01/mms/search"

# CLIENT_ID = "ec6fc471-144d-436b-ae9e-4ae88689e663_4701e580-6b92-44f3-a56f-a5044fb67f8a"
# CLIENT_SECRET = "w35fJrzL/IGQgh3DObHEyq2a8UftwUwr8DXOkmU29pM="

# token_cache = {"access_token": None, "expires": 0}


# async def get_who_token():
#     """Fetch and cache WHO ICD API token"""
#     if token_cache["access_token"] and time.time() < token_cache["expires"]:
#         return token_cache["access_token"]

#     async with httpx.AsyncClient() as client:
#         resp = await client.post(
#             WHO_TOKEN_URL,
#             data={
#                 "grant_type": "client_credentials",
#                 "client_id": CLIENT_ID,
#                 "client_secret": CLIENT_SECRET,
#                 "scope": "icdapi_access"
#             },
#             headers={"Content-Type": "application/x-www-form-urlencoded"}
#         )
#     if resp.status_code != 200:
#         raise HTTPException(500, f"WHO Token request failed: {resp.text}")

#     data = resp.json()
#     token_cache["access_token"] = data["access_token"]
#     token_cache["expires"] = time.time() + data["expires_in"] - 60

#     return data["access_token"]


# @app.get("/search_icd")
# async def search_icd(term: str = Query(..., description="Disease English name from AYUSH")):
#     """Search ICD-11 MMS codes for a given English disease name and fetch full codes"""
#     token = await get_who_token()
#     async with httpx.AsyncClient() as client:
#         # Step 1: Search ICD-11
#         resp = await client.get(
#             WHO_SEARCH_URL,
#             params={"q": term, "outputFormat": "json"},
#             headers={
#                 "Authorization": f"Bearer {token}",
#                 "Accept": "application/json",
#                 "Accept-Language": "en",
#                 "API-Version": "v2"
#             }
#         )

#     if resp.status_code != 200:
#         raise HTTPException(resp.status_code, f"WHO ICD search failed: {resp.text}")

#     search_data = resp.json()
#     icd_results = []

#     # Step 2: Collect ICD11_Code URLs
#     code_urls = []
#     for item in search_data.get("destinationEntities", []) + search_data.get("results", []):
#         code_url = item.get("id")
#         title = item.get("title") or item.get("label") or item.get("prefLabel")
#         if code_url:
#             code_urls.append((code_url, title))

#     print(f"Found {code_urls} ICD11_Code URLs for term '{term}'")

#     # Step 3: Follow each ICD11_Code URL to get full ICD code
#     async with httpx.AsyncClient() as client:
#         for url, title in code_urls:
#             # Convert MMS URL to Foundation URL to avoid redirect
    
#             print(f"Fetching ICD details from {url}")
#             detail_resp = await client.get(
#                 url,
#                 headers={
#                     "Authorization": f"Bearer {token}",
#                     "Accept": "application/json",
#                     "Accept-Language": "en",
#                     "API-Version": "v2"
#                 },
#                 follow_redirects=True  # follow any 301/302 automatically
#             )
#             if detail_resp.status_code == 200:
#                 detail = detail_resp.json()
#                 icd_results.append({
#                     "requested_url": url,
#                     "ICD11_Code": detail.get("code") or url.split("/")[-1],
#                     "Title": detail.get("title", {}).get("@value") or title
#                 })
#             else:
#                 icd_results.append({
#                     "requested_url": url,
#                     "error": f"Failed to fetch code: HTTP {detail_resp.status_code}",
#                     "Title": title
#                 })

#     return {"query": term, "icd_results": icd_results}





from fastapi import FastAPI, Query, HTTPException
import httpx, csv, os, time

app = FastAPI()
DATA_FILE = os.path.join(os.path.dirname(__file__), "data", "Ayurveda.csv")

# Load Ayurveda.csv once
namaste_terms = []
with open(DATA_FILE, newline="", encoding="utf-8-sig", errors="ignore") as csvfile:
    reader = csv.DictReader(csvfile)
    namaste_terms = list(reader)

WHO_TOKEN_URL = "https://icdaccessmanagement.who.int/connect/token"
WHO_SEARCH_URL = "https://id.who.int/icd/release/11/2024-01/mms/search"

CLIENT_ID = "ec6fc471-144d-436b-ae9e-4ae88689e663_4701e580-6b92-44f3-a56f-a5044fb67f8a"
CLIENT_SECRET = "w35fJrzL/IGQgh3DObHEyq2a8UftwUwr8DXOkmU29pM="

token_cache = {"access_token": None, "expires": 0}


async def get_who_token():
    """Fetch and cache WHO ICD API token"""
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
        raise HTTPException(500, f"WHO Token request failed: {resp.text}")

    data = resp.json()
    token_cache["access_token"] = data["access_token"]
    token_cache["expires"] = time.time() + data["expires_in"] - 60

    return data["access_token"]


@app.get("/search_icd")
async def search_icd(term: str = Query(..., description="Disease English name from AYUSH")):
    """Search ICD-11 MMS codes and Ayurveda mappings for a given disease"""
    token = await get_who_token()

    # ------------------- Part A: Ayurveda CSV search -------------------
    ayurveda_matches = [
        row for row in namaste_terms if term.lower() in row["Name English"].lower()
    ]

    # ------------------- Part B: ICD-11 API search -------------------
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            WHO_SEARCH_URL,
            params={"q": term, "outputFormat": "json"},
            headers={
                "Authorization": f"Bearer {token}",
                "Accept": "application/json",
                "Accept-Language": "en",
                "API-Version": "v2"
            }
        )

    if resp.status_code != 200:
        raise HTTPException(resp.status_code, f"WHO ICD search failed: {resp.text}")

    search_data = resp.json()
    icd_results = []

    # Collect ICD11 entity URLs
    code_urls = []
    for item in search_data.get("destinationEntities", []) + search_data.get("results", []):
        code_url = item.get("id")
        title = item.get("title") or item.get("label") or item.get("prefLabel")
        if code_url:
            code_urls.append((code_url, title))

    # Fetch real ICD-11 codes from entity URLs
    async with httpx.AsyncClient() as client:
        for url, title in code_urls:
            detail_resp = await client.get(
                url,
                headers={
                    "Authorization": f"Bearer {token}",
                    "Accept": "application/json",
                    "Accept-Language": "en",
                    "API-Version": "v2"
                },
                follow_redirects=True
            )
            if detail_resp.status_code == 200:
                detail = detail_resp.json()
                icd_results.append({
                    "ICD11_Code": detail.get("code"),
                    "Title": detail.get("title", {}).get("@value") or title
                })
            else:
                icd_results.append({
                    "ICD11_Code": None,
                    "Title": title,
                    "error": f"Failed to fetch code: HTTP {detail_resp.status_code}"
                })

    # ------------------- Final Combined Response -------------------
    return {
        "query": term,
        "ayurveda_results": ayurveda_matches,
        "icd_results": icd_results
    }