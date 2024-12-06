import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import path from "path";
import { URL } from "../../path";
import fs from "fs";

export async function GET() {
  const url = URL;
  const screenshotPath = path.resolve("./public/screenshot1.png");

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.setViewport({ width: 1280, height: 720 });
    await page.goto(url, { waitUntil: "load", timeout: 60000 });

    await page.screenshot({ path: screenshotPath });

    await browser.close();

    return NextResponse.json({
      message: "Screenshot generated",
      file: "/screenshot1.png",
    });
  } catch (error) {
    console.error("Error generating screenshot:", error);
    return NextResponse.json(
      { error: "Failed to generate screenshot" },
      { status: 500 }
    );
  }
}
