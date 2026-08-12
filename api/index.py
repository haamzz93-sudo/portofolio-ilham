import os
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, HTTPException, UploadFile, File, Form, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="Ilham Eka Saputra Portfolio API",
    description="FastAPI Backend for Portfolio with Supabase Integration",
    version="1.0.0"
)

# Enable CORS for local & production Vercel deployment
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase Client Setup (from Environment Variables)
SUPABASE_URL = os.getenv("SUPABASE_URL", "https://bypxtnuvdldhwsprhvbq.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5cHh0bnV2ZGxkaHdzcHJodmJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1Mzk5ODQsImV4cCI6MjEwMjExNTk4NH0.WphY3WCHLrbAUDe-7JmKTdJmZLX-PiH4VriZ8Bp04vM")

supabase_client = None
try:
    from supabase import create_client, Client
    if SUPABASE_URL and "your-supabase" not in SUPABASE_URL:
        supabase_client: Optional[Client] = create_client(SUPABASE_URL, SUPABASE_KEY)
except Exception as e:
    print(f"Supabase connection warning: {e}")

# Models
class ProjectModel(BaseModel):
    id: str
    title: str
    description: str
    image: Optional[str] = ""
    tags: List[str] = []
    liveUrl: Optional[str] = ""
    githubUrl: Optional[str] = ""
    featured: Optional[bool] = False
    category: str = "web"

class SkillModel(BaseModel):
    id: str
    name: str
    category: str
    level: int
    icon: Optional[str] = ""

class ExperienceModel(BaseModel):
    id: str
    company: str
    role: str
    startDate: str
    endDate: str
    description: str

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "FastAPI Portfolio Backend",
        "supabase_connected": supabase_client is not None
    }

@app.get("/api/portfolio")
def get_portfolio_data():
    """Fetch portfolio data from Supabase if connected, else fallback."""
    if supabase_client:
        try:
            projects = supabase_client.table("projects").select("*").execute().data
            skills = supabase_client.table("skills").select("*").execute().data
            experiences = supabase_client.table("experiences").select("*").execute().data
            return {
                "projects": projects,
                "skills": skills,
                "experiences": experiences
            }
        except Exception as e:
            print(f"Error reading from Supabase: {e}")
            
    return {"message": "Supabase not configured yet. Using client-side state."}

@app.post("/api/upload/cv")
async def upload_cv(file: UploadFile = File(...)):
    """Upload CV document to Supabase Storage or local bucket."""
    allowed_types = [
        "application/pdf", 
        "text/plain", 
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ]
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Only PDF, TXT, DOC, DOCX files are allowed.")
    
    contents = await file.read()
    filename = f"CV_Ilham_Eka_Saputra_{file.filename}"
    
    if supabase_client:
        try:
            res = supabase_client.storage.from_("cv-files").upload(filename, contents, file_options={"upsert": "true"})
            public_url = supabase_client.storage.from_("cv-files").get_public_url(filename)
            return {"status": "success", "url": public_url, "filename": filename}
        except Exception as e:
            print(f"Supabase upload error: {e}")
            
    return {"status": "success", "filename": filename, "size": len(contents)}

@app.post("/api/upload/image")
async def upload_image(file: UploadFile = File(...), target: str = Form("general")):
    """Upload images (Avatar, Project Card, ID photo) to Supabase Storage."""
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files are allowed.")
    
    contents = await file.read()
    filename = f"{target}_{file.filename}"
    
    if supabase_client:
        try:
            supabase_client.storage.from_("portfolio-images").upload(filename, contents, file_options={"upsert": "true"})
            public_url = supabase_client.storage.from_("portfolio-images").get_public_url(filename)
            return {"status": "success", "url": public_url, "target": target}
        except Exception as e:
            print(f"Supabase upload image error: {e}")
            
    return {"status": "success", "filename": filename, "target": target, "size": len(contents)}

# Export Handler for Vercel Serverless
handler = app
