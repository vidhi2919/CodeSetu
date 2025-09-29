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
from app.routes import users, search, translate, bundle, admin, audit

app = FastAPI(
    title="Ayush ↔ ICD-11 Terminology Service",
    docs_url="/docs",
    redoc_url="/redoc"
)

# -------------------- Load CSVs --------------------
BASE_DIR = os.path.dirname(__file__)
AYURVEDA_FILE = os.path.join(BASE_DIR, "data", "Ayurveda.csv")
UNANI_FILE = os.path.join(BASE_DIR, "data", "Unani.csv")
SIDDHA_FILE = os.path.join(BASE_DIR, "data", "Siddha.csv")

def load_csv(path):
    with open(path, newline="", encoding="utf-8-sig", errors="ignore") as f:
        return list(csv.DictReader(f))

ayurveda_terms = load_csv(AYURVEDA_FILE)
unani_terms = load_csv(UNANI_FILE)
siddha_terms = load_csv(SIDDHA_FILE)

# -------------------- WHO ICD API --------------------
WHO_TOKEN_URL = "https://icdaccessmanagement.who.int/connect/token"
WHO_SEARCH_URL = "https://id.who.int/icd/release/11/2025-01/mms/search"

WHO_LOOKUP_URL = "https://id.who.int/fhir/CodeSystem/$lookup"

CLIENT_ID = "ec6fc471-144d-436b-ae9e-4ae88689e663_4701e580-6b92-44f3-a56f-a5044fb67f8a"
CLIENT_SECRET = "w35fJrzL/IGQgh3DObHEyq2a8UftwUwr8DXOkmU29pM="

token_cache = {"access_token": None, "expires": 0}

# -------------------- WHO Token --------------------
async def get_who_token():
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
        print("failed to get token")
        raise HTTPException(500, f"WHO Token request failed: {resp.text}")

    data = resp.json()
    token_cache["access_token"] = data["access_token"]
    token_cache["expires"] = time.time() + data["expires_in"] - 60
    return data["access_token"]


# -------------------- Fetch ICD-11 mapping --------------------

async def fetch_icd11_code(term: str, token: str):
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
    print("Hiii,resp:", resp.json())
    if resp.status_code != 200:
        print("Failed to fetch search results")
        return None, None

    entities = resp.json().get("destinationEntities", []) + resp.json().get("results", [])
    print("Hiii,entities:", entities)
    if entities:
        item = entities[0]  # take first match
        icd_code = item.get("theCode")
        icd_display = item.get("title")
        return icd_code, icd_display

    return None, None



# -------------------- FHIR Endpoint --------------------
@app.get("/search_icd_fhir")
async def search_icd_fhir(term: str = Query(..., description="Enter English disease term")):
    token = await get_who_token()
    results = []

    for source, terms in [("Ayurveda", ayurveda_terms), ("Unani", unani_terms), ("Siddha", siddha_terms)]:
        for row in terms:
            english_name = row.get("Name English")
            if english_name and term.lower() in english_name.lower():
                
                # Fetch ICD-11 code
                icd_code, icd_display = await fetch_icd11_code(term, token)
                
                # Prepare TM2 code if applicable
                tm2_code = "-"
                if "TM2" in english_name:
                    # Take first 4 characters of NAMASTE code before '('
                    namaste_code = row.get("NAMC_CODE") or row.get("NUMC_CODE") or row.get("NAMC_TERM") or ""
                    tm2_code = namaste_code.split("(")[0][:4] if namaste_code else "-"
                
                param = {
                    "resourceType": "Parameters",
                    "parameter": [
                        {"name": "source", "valueString": source},
                        {"name": "code", "valueString": row.get("NAMC_CODE") or row.get("NUMC_CODE")},
                        {"name": "display", "valueString": english_name},
                        {"name": "definition", "valueString": row.get("Long_definition") or row.get("Short_definition") or "-"},
                        {"name": "icd11_biomedicine_code", "valueString": icd_code or "-"},
                        {"name": "icd11_display", "valueString": icd_display or "-"},
                        {"name": "TM2_code", "valueString": tm2_code}  
                    ]
                }
                results.append(param)

    return {"query": term, "results": results}


# -------------------- FHIR Translate by Code --------------------
# @app.get("/translate_fhir_by_code")
# async def translate_fhir_by_code(code: str = Query(..., description="Enter NAMASTE, TM2 or ICD-11 code")):
#     token = await get_who_token()
#     results = []

#     for source, terms in [("Ayurveda", ayurveda_terms), ("Unani", unani_terms), ("Siddha", siddha_terms)]:
#         for row in terms:
#             namaste_code = row.get("NAMC_CODE") or row.get("NUMC_CODE") or ""
#             english_name = row.get("Name English") or row.get("NUMC_TERM") or row.get("NAMC_TERM") or ""

#             # -------------------- Check if input matches NAMASTE code --------------------
#             if code.upper() == namaste_code.split("(")[0][:4].upper():  # input code matches NAMASTE/TM2 code
#                 # TM2 code = first 4 chars of NAMASTE code
#                 tm2_code = namaste_code.split("(")[0][:4] if namaste_code else "-"
#                 # Fetch ICD-11 code using English name
#                 icd_code, icd_display = await fetch_icd11_code(english_name, token)

#                 param = {
#                     "resourceType": "Parameters",
#                     "parameter": [
#                         {"name": "source", "valueString": source},
#                         {"name": "NAMASTE_code", "valueString": namaste_code},
#                         {"name": "TM2_code", "valueString": tm2_code},
#                         {"name": "icd11_biomedicine_code", "valueString": icd_code or "-"},
#                         {"name": "icd11_display", "valueString": icd_display or "-"}
#                     ]
#                 }
#                 results.append(param)

#             # -------------------- Check if input matches TM2 code --------------------
#             elif code.upper() == (namaste_code.split("(")[0][:4].upper() if namaste_code else ""):
#                 icd_code, icd_display = await fetch_icd11_code(english_name, token)
#                 param = {
#                     "resourceType": "Parameters",
#                     "parameter": [
#                         {"name": "source", "valueString": source},
#                         {"name": "TM2_code", "valueString": code.upper()},
#                         {"name": "NAMASTE_code", "valueString": namaste_code},
#                         {"name": "icd11_biomedicine_code", "valueString": icd_code or "-"},
#                         {"name": "icd11_display", "valueString": icd_display or "-"}
#                     ]
#                 }
#                 results.append(param)

#             # -------------------- Check if input matches ICD-11 code --------------------
#             elif code.upper() == row.get("ICD11_CODE", "").upper():
#                 param = {
#                     "resourceType": "Parameters",
#                     "parameter": [
#                         {"name": "source", "valueString": source},
#                         {"name": "NAMASTE_code", "valueString": namaste_code},
#                         {"name": "TM2_code", "valueString": namaste_code.split("(")[0][:4] if namaste_code else "-"},
#                         {"name": "icd11_biomedicine_code", "valueString": code.upper()},
#                         {"name": "icd11_display", "valueString": row.get("ICD11_DISPLAY", "-")}
#                     ]
#                 }
#                 results.append(param)

#     return {"query_code": code, "results": results}


async def fetch_icd11_code_from_name(english_name: str, token: str):
    words = [w.strip(" ,()[]{}-") for w in english_name.split()]
    async with httpx.AsyncClient() as client:
        for word in words:
            if not word:
                continue
            resp = await client.get(
                WHO_SEARCH_URL,
                params={"q": word, "outputFormat": "json"},
                headers={
                    "Authorization": f"Bearer {token}",
                    "Accept": "application/json",
                    "Accept-Language": "en",
                    "API-Version": "v2"
                }
            )
            if resp.status_code != 200:
                continue
            entities = resp.json().get("destinationEntities", []) + resp.json().get("results", [])
            if entities:
                item = entities[0]
                return item.get("theCode"), item.get("title")
    return None, None

# -------------------- FHIR Translate by Code --------------------
@app.get("/translate_fhir_by_code")
async def translate_fhir_by_code(
    code: str = Query(..., description="Enter NAMASTE or TM2 code"),
    mode: str = Query(..., description="Select translation mode: 'namaste_to_tm2', 'tm2_to_biomedicine', 'namaste_to_biomedicine'")
):
    token = await get_who_token()
    results = []

    for source, terms in [("Ayurveda", ayurveda_terms), ("Unani", unani_terms), ("Siddha", siddha_terms)]:
        for row in terms:
            namaste_code = row.get("NAMC_CODE") or row.get("NUMC_CODE") or row.get("NAMC_TERM") or ""
            english_name = row.get("Name English")

            # ---------------- TM2 code logic ----------------
            tm2_code = "-"
            if "TM2" in english_name:
                print("Hiii,namaste_code:", namaste_code)
                tm2_code = namaste_code.split("(")[0][:4]

            # ---------------- NAMASTE → TM2 ----------------
            if mode == "namaste_to_tm2" and code.upper() == namaste_code.upper() and tm2_code != "-":
                print("Hii",tm2_code)
                results.append({"NAMASTE_code": namaste_code, "TM2_code": tm2_code, "source": source})

            # ---------------- TM2 → Biomedicine ----------------
            elif mode == "tm2_to_biomedicine" and tm2_code != "-" and code.upper() == tm2_code.upper():
                icd_code, icd_display = await fetch_icd11_code_from_name(english_name, token)
                results.append({
                    "TM2_code": tm2_code,
                    "icd11_code": icd_code or "-",
                    "icd11_display": icd_display or "-",
                    "source": source
                })

            # ---------------- NAMASTE → Biomedicine ----------------
            elif mode == "namaste_to_biomedicine" and code.upper() == namaste_code.upper():
                icd_code, icd_display = await fetch_icd11_code_from_name(english_name, token)
                results.append({
                    "NAMASTE_code": namaste_code,
                    "TM2_code": tm2_code if tm2_code != "-" else "-",
                    "icd11_code": icd_code or "-",
                    "icd11_display": icd_display or "-",
                    "source": source
                })

    return {"query_code": code, "mode": mode, "results": results}






##Vidhi backend

app.include_router(users.router)
app.include_router(search.router)
app.include_router(translate.router)
app.include_router(bundle.router)
app.include_router(admin.router)
app.include_router(audit.router)  
