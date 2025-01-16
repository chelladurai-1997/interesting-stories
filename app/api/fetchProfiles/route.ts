// app/api/fetchProfiles/route.ts

import { JSDOM } from "jsdom"; // Import jsdom
import { NextResponse } from "next/server";

// Function to fetch a page and extract the 'data-page' value using jsdom
async function getDataPageFromApp(
  url: string,
  id: string
): Promise<string | null> {
  try {
    // Fetch the page content
    const response = await fetch(url);
    const html = await response.text();

    // Use jsdom to parse the HTML content
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Get the element by ID
    const element = document.getElementById(id);

    // Retrieve the value of the data-page attribute
    const dataPage = element ? element.getAttribute("data-page") : null;

    // Return the data-page value
    return dataPage;
  } catch (error) {
    console.error("Error fetching page or parsing HTML:", error);
    return null;
  }
}

async function fetchAllData(url: string): Promise<any[]> {
  let commonArray: any[] = [];

  try {
    // Fetch data for page 1
    const firstPageUrl = `${url}&page=1`;
    const firstPageData = await getDataPageFromApp(firstPageUrl, "app");

    if (!firstPageData) {
      console.log("No data found on page 1");
      return [];
    }

    // Parse and push data from the first page
    const parsedFirstPageData = JSON.parse(firstPageData);
    commonArray.push(...parsedFirstPageData?.props.profiles.data);

    // Extract the last page number from the first page response
    const lastPage = parsedFirstPageData.props.profiles.last_page;

    if (lastPage === 1) {
      // If there's only one page, return the data
      return commonArray;
    }

    // Create an array of promises for all remaining pages (page 2 to lastPage)
    const pagePromises = Array.from({ length: lastPage - 1 }, (_, index) => {
      const page = index + 2; // Start from page 2
      const pageUrl = `${url}&page=${page}`;
      return getDataPageFromApp(pageUrl, "app");
    });

    // Run all promises concurrently and wait for the results
    const pageResults = await Promise.all(pagePromises);

    // Parse and add data from all fetched pages
    for (const result of pageResults) {
      if (result) {
        commonArray.push(...JSON.parse(result)?.props.profiles.data);
      } else {
        console.log(`No data found for one of the pages`);
      }
    }

    return commonArray;
  } catch (error) {
    console.error("Error fetching or parsing the pages:", error);
    return [];
  }
}

// API route handler
export async function GET(request: Request): Promise<NextResponse<any>> {
  const url = new URL(request.url);

  // Extract the 'gender' query parameter from the URL (if needed for filtering)
  const gender = url.searchParams.get("gender") || "female"; // Default to "female" if not provided

  // Construct the base URL for fetching profiles (this can be modified as needed)
  // const baseUrl = `https://www.varam.app/search-profiles?gender=female&jaadhagam=ragu%20kedhu%20sevvai%20-%20இராகு%20கேது%20செவ்வாய்&jaadhagam=ragu%20kedhu%20-%20இராகு%20கேது`;

  const baseUrl = `https://www.varam.app/search-profiles?gender=female&jaadhagam=sevvai%20-%20செவ்வாய்&jaadhagam=sutha%20jathagam%20-%20சுத்த%20ஜாதகம்`;
  // const baseUrl = `https://www.varam.app/search-profiles?gender=female`;

  try {
    // Fetch all data from the API
    const data = await fetchAllData(baseUrl);

    // Return the collected data
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in API handler:", error);
    return NextResponse.json(
      { error: "Failed to fetch profiles data" },
      { status: 500 }
    );
  }
}
