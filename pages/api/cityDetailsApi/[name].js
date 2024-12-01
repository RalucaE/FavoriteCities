export default async function handler(req, res) {
  const name = req.query.name;
  if (req.method === "GET") {
    const fetch = require('node-fetch');
    const api_key = '6b353ebe427e03c2684f11869c0076d5ed899f00b12f88e44ce7558d473341e1';
    const url1 = `https://serpapi.com/search.json?engine=google&q=Top+sights+in+${name}_landscape&api_key=${api_key}`;
    const url2 = `https://serpapi.com/search.json?q=${name}&engine=google_images&ijn=0&tbs=itp:photos,isz:l,sur:f&api_key=${api_key}`;

    try {
      // Fetch data from both APIs in parallel
      const [response1, response2] = await Promise.all([fetch(url1), fetch(url2)]);
      const [data1, data2] = await Promise.all([response1.json(), response2.json()]);          
      // Combine the results
      const combinedResults = [data1.knowledge_graph, data1.top_sights.sights, data2.images_results?.[0].original];
      res.status(200).json(combinedResults);  
    } 
    catch (error) {
      console.error("Failed to fetch city data:", error);
      return null;
    } 
  }
}