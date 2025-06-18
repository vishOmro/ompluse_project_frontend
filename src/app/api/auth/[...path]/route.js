import { NextResponse } from "next/server";
import axios from "axios";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";

export async function POST(req, context) {
  const path = context.params.path.join("/");
  const body = await req.json();

  try {
    const response = await axios.post(`${BACKEND_URL}/api/${path}`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: req.headers.get("Authorization") || "",
      },
    });
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: error.response?.data?.error || "Something went wrong" },
      { status: error.response?.status || 500 }
    );
  }
}

export async function GET(req, context) {
  const path = context.params.path.join("/");
  const url = new URL(req.url);
  const query = Object.fromEntries(url.searchParams);

  try {
    const response = await axios.get(`${BACKEND_URL}/api/${path}`, {
      headers: {
        Authorization: req.headers.get("Authorization") || "",
      },
      params: query,
    });
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: error.response?.data?.error || "Something went wrong" },
      { status: error.response?.status || 500 }
    );
  }
}
