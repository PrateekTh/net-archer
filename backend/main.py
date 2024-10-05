from fastapi import FastAPI, Form, Request
from fastapi.middleware.cors import CORSMiddlewareW
from routes.route import router

app = FastAPI()
app.add_middleware(
    CORSMiddleware, 
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)