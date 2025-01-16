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

// Function to fetch all data across multiple pages
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
    commonArray.push(...JSON.parse(firstPageData)?.props.profiles.data);

    // Extract the last page number from the first page response
    const lastPage = JSON.parse(firstPageData).props.profiles.last_page;

    // Loop through each remaining page starting from page 2
    for (let page = 2; page <= lastPage; page++) {
      const pageUrl = `${url}&page=${page}`;

      const dataPage = await getDataPageFromApp(pageUrl, "app");

      if (dataPage) {
        // Push the result into the common array
        commonArray.push(...JSON.parse(dataPage)?.props.profiles.data);
      } else {
        console.log(`No data found on page ${page}`);
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

  const baseUrl = `https://www.varam.app/search-profiles?gender=female&jaadhagam=sevvai%20-%20செவ்வாய்`;
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
