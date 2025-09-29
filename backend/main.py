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
import pandas as pd
import numpy as np
import re
import faiss
from sentence_transformers import SentenceTransformer


app = FastAPI(
    title="Ayush ↔ ICD-11 Terminology Service",
    docs_url="/docs",
    redoc_url="/redoc"
)

# main.py
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # your Next.js frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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

    if resp.status_code != 200:
        print("Failed to fetch search results")
        return None, None

    entities = resp.json().get("destinationEntities", []) + resp.json().get("results", [])
 
    if entities:
        item = entities[0]  # take first match
        icd_code = item.get("theCode")
        icd_display = item.get("title")
        return icd_code, icd_display

    return None, None

# -------------------- Symptom Tracking Setup --------------------
# INSERT YOUR SYMPTOM TRACKING CODE HERE
# - Convert CSVs to DataFrames
# - Clean Long_definition
# - Negation tagging
# - Create disease_objects
# - Generate embeddings with SentenceTransformer
# - Build FAISS index
# - Define pattern for negation

df_ayurveda = pd.DataFrame(ayurveda_terms)
df_ayurveda["System"] = "Ayurveda"
df_siddha = pd.DataFrame(siddha_terms)
df_siddha["System"] = "Siddha"
df_unani = pd.DataFrame(unani_terms)
df_unani["System"] = "Unani"

df_all = pd.concat([df_ayurveda, df_siddha, df_unani], ignore_index=True)
df_all.drop_duplicates(inplace=True)
df_all["Long_definition"] = df_all["Long_definition"].fillna("")

def normalize_text(text):
    text = text.lower()
    text = re.sub(r"[^\w\s\-]", " ", text, flags=re.UNICODE)
    text = re.sub(r"\s+", " ", text).strip()
    return text

df_all["Cleaned_Description"] = df_all["Long_definition"].apply(normalize_text)

neg_words = ["no", "not", "without", "absence of", "lacking", "never"]
pattern = r"\b(" + "|".join(re.escape(w) for w in neg_words) + r")\b"
df_all["Cleaned_Description"] = df_all["Cleaned_Description"].apply(
    lambda x: re.sub(pattern, lambda m: "NEG_" + m.group(1), x, flags=re.IGNORECASE)
)

disease_objects = []
for _, row in df_all.iterrows():
    system = row["System"]
    disease_id = row.get("NAMC_ID") if system in ["Ayurveda", "Siddha"] else row.get("NUMC_ID")
    disease_code = row.get("NAMC_CODE") if system in ["Ayurveda", "Siddha"] else row.get("NUMC_CODE")
    disease_objects.append({
        "id": disease_id,
        "code": disease_code,
        "name": row.get("Name English"),
        "description": row["Cleaned_Description"]
    })

model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
descriptions = [d['description'] for d in disease_objects]
embeddings = model.encode(descriptions, batch_size=32)
embeddings = np.array(embeddings).astype('float32')
faiss.normalize_L2(embeddings)
for i, d in enumerate(disease_objects):
    d['embedding'] = embeddings[i]
embedding_dim = embeddings.shape[1]
index = faiss.IndexFlatIP(embedding_dim)
index.add(embeddings)


#--------------------- FHIR Search by Term --------------------
# @app.get("/search_icd_fhir")
# async def search_icd_fhir(term: str = Query(..., description="Enter English disease term")):
#     token = await get_who_token()
#     results = []

#     for source, terms in [("Ayurveda", ayurveda_terms), ("Unani", unani_terms), ("Siddha", siddha_terms)]:
#         for row in terms:
#             english_name = row.get("Name English")
#             if english_name and term.lower() in english_name.lower():
                
#                 # Fetch ICD-11 code
#                 icd_code, icd_display = await fetch_icd11_code(term, token)
                
#                 # Prepare TM2 code if applicable
#                 tm2_code = "-"
#                 if "TM2" in english_name:
#                     # Take first 4 characters of NAMASTE code before '('
#                     namaste_code = row.get("NAMC_CODE") or row.get("NUMC_CODE") or row.get("NAMC_TERM") or ""
#                     tm2_code = namaste_code.split("(")[0][:4] if namaste_code else "-"
                
#                 param = {
#                     "resourceType": "Parameters",
#                     "parameter": [
#                         {"name": "source", "valueString": source},
#                         {"name": "code", "valueString": row.get("NAMC_CODE") or row.get("NUMC_CODE")},
#                         {"name": "display", "valueString": english_name},
#                         {"name": "definition", "valueString": row.get("Long_definition") or row.get("Short_definition") or "-"},
#                         {"name": "icd11_biomedicine_code", "valueString": icd_code or "-"},
#                         {"name": "icd11_display", "valueString": icd_display or "-"},
#                         {"name": "TM2_code", "valueString": tm2_code}  
#                     ]
#                 }
#                 results.append(param)

#     return {"query": term, "results": results}





@app.get("/search_icd_fhir")
async def search_icd_fhir(
    term: str = Query(..., description="Enter disease term"),
    language: str = Query("english", description="Choose language: english, sanskrit, tamil, arabic")
):
    """
    Search disease term in the selected language and return ICD-11 mapping + other info.
    """
    token = await get_who_token()
    results = []

    for source, terms in [("Ayurveda", ayurveda_terms), ("Unani", unani_terms), ("Siddha", siddha_terms)]:
        for row in terms:
            # choose the correct field based on language
            if language.lower() == "english":
                display_field = row.get("Name English") or ""
            elif language.lower() == "sanskrit":
                display_field = row.get("NAMC_TERM") or ""
            elif language.lower() == "tamil":
                display_field = row.get("NAMC_TERM") or ""
            elif language.lower() == "arabic":
                display_field = row.get("NAMC_TERM") or ""
            else:
                raise HTTPException(400, "Invalid language. Choose english, sanskrit, tamil, arabic.")

            if display_field and term.lower() in display_field.lower():
                # Fetch ICD-11 code using English name (keyword search)
                english_name = row.get("Name English") or ""
                icd_code, icd_display = await fetch_icd11_code_from_name(english_name, token)

                # TM2 code logic (only for Ayurveda)
                tm2_code = "-"
                if source == "Ayurveda" and "TM2" in english_name:
                    namaste_code = row.get("NAMC_CODE") or row.get("NUMC_CODE") or row.get("NAMC_TERM") or ""
                    tm2_code = namaste_code.split("(")[0][:4] if namaste_code else "-"

                param = {
                    "resourceType": "Parameters",
                    "parameter": [
                        {"name": "source", "valueString": source},
                        {"name": "code", "valueString": row.get("NAMC_CODE") or row.get("NUMC_CODE")},
                        {"name": "display", "valueString": display_field},
                        {"name": "definition", "valueString": row.get("Long_definition") or row.get("Short_definition") or "-"},
                        {"name": "icd11_biomedicine_code", "valueString": icd_code or "-"},
                        {"name": "icd11_display", "valueString": icd_display or "-"},
                        {"name": "TM2_code", "valueString": tm2_code}
                    ]
                }
                results.append(param)

    return {"query": term, "language": language, "results": results}


#-------------------- Helper to fetch ICD-11 code from English name --------------------


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
                tm2_code = namaste_code.split("(")[0][:4]

            # ---------------- NAMASTE → TM2 ----------------
            if mode == "namaste_to_tm2" and code.upper() == namaste_code.upper() and tm2_code != "-":
                
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

from fastapi import FastAPI, Query
import httpx
import re
import faiss
import asyncio

@app.get("/search_symptoms")
async def search_symptoms_endpoint(query: str, k: int = 5):
    query_clean = re.sub(r"[^\w\s\-]", " ", query.lower())
    query_clean = re.sub(r"\s+", " ", query_clean).strip()
    query_clean = re.sub(pattern, lambda m: "NEG_" + m.group(1), query_clean, flags=re.IGNORECASE)
    
    query_emb = model.encode([query_clean]).astype('float32')
    faiss.normalize_L2(query_emb)
    distances, indices = index.search(query_emb, k)

    results = []

    async with httpx.AsyncClient() as client:
        for i, idx in enumerate(indices[0]):
            d = disease_objects[idx]
            # Default ICD code placeholder
            icd_code = "-"
            
            # Call FHIR translation API for this disease's code if it exists
            if "code" in d and d["code"]:
                try:
                    fhir_resp = await client.get(
                        "http://127.0.0.1:8000/translate_fhir_by_code",
                        params={"code": d["code"], "mode": "namaste_to_biomedicine"},
                        timeout=10
                    )
                    fhir_data = fhir_resp.json()
                    if fhir_data["results"]:
                        # Take the first ICD code from the results array
                        icd_code = fhir_data["results"][0].get("icd11_code", "-")
                except Exception as e:
                    print(f"Error fetching ICD code for {d['name']}: {e}")

            results.append({
                "name": d['name'],
                "id": d['id'],
                "code": d.get('code', ''),
                "description": d['description'],
                "similarity": float(distances[0][i]),
                "icd11_code": icd_code  # return ICD code to frontend
            })

    return {"query": query, "results": results}
