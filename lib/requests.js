import { Query } from "appwrite";
import { databases } from "./appwrite";

export const fetchAgentFun = async ({ id }) => {
  try {
    // Validate that the required environment variables are available
    const datasetId = process.env.NEXT_PUBLIC_APPWRITE_DATASETS_ID;
    const collectionId = process.env.NEXT_PUBLIC_APPWRITE_AGENT_COLLECTION_ID;

    if (!datasetId || !collectionId) {
      throw new Error("Dataset or collection ID is not defined in the environment variables.");
    }

    // Validate the id argument
    if (!id) {
      throw new Error("ID is required to fetch the agent.");
    }

    // Fetch the agent document
    const response = await databases.listDocuments(datasetId, collectionId, [Query.equal("id", id)]);

    // Return the first matching document or null if none found
    return response.documents[0] || null;
  } catch (error) {
    console.error("Error fetching agent:", error);
    return null; // Return null or handle errors appropriately
  }
};


// Helper function to parse numeric parameters
const parseParam = (value) => (value ? parseInt(value, 10) : null);

export default async function fetchPropertyPosts(searchParams) {
  // Extract and parse searchParams
  const type = searchParams?.type || null;
  const condition = searchParams?.condition || null;
  const status = searchParams?.status || null;
  const maxBed = parseParam(searchParams?.maxBed);
  const minBed = parseParam(searchParams?.minBed);
  const maxBath = parseParam(searchParams?.maxBath);
  const minBath = parseParam(searchParams?.minBath);
  const minSize = parseParam(searchParams?.minSize);
  const maxSize = parseParam(searchParams?.maxSize);

  // Build query parameters dynamically
  const filters = [
    Query.orderDesc("$createdAt"), // Default sorting by creation date
    type ? Query.equal("catagory", type) : null,
    condition ? Query.equal("condition", condition) : null,
    status ? Query.equal("status", status) : null,
    minBed ? Query.greaterThanEqual("numberOfBed", minBed) : null,
    maxBed ? Query.lessThanEqual("numberOfBed", maxBed) : null,
    minBath ? Query.greaterThanEqual("numberOfBath", minBath) : null,
    maxBath ? Query.lessThanEqual("numberOfBath", maxBath) : null,
    minSize ? Query.greaterThanEqual("size", minSize) : null,
    maxSize ? Query.lessThanEqual("size", maxSize) : null,
  ].filter(Boolean); // Filter out null values

  try {
    // Fetch property posts
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATASETS_ID,
      process.env.NEXT_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
      filters
    );

    return response.documents; // Return the fetched documents
  } catch (error) {
    console.error("Error fetching property posts:", error);
    throw new Error("Failed to fetch property posts");
  }
}
