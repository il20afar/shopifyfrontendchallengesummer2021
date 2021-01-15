import queryString from "query-string";

export const getOmdbResults = async (
  searchTerm: string,
  type: "search" | "id"
) => {
  const params = queryString.stringify({
    ...(type === "search" && { s: searchTerm }),
    ...(type === "id" && { i: searchTerm }),
    type: "movie",
  });
  try {
    const req = await fetch(
      `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&${params}`
    );
    return await req.json();
  } catch (error) {
    return error.toString();
  }
};
