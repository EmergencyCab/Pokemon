import { useState, useEffect } from "react";
import CryptoJS from "crypto-js"; // You'll need: npm install crypto-js

const API_CONFIG = {
  publicKey: "768d91152877e49936207a9e0653e69c",
  privateKey: "9863a7bfca1bdc4acd002127ca0857debf337254", 
};

// Function to generate Marvel API authentication
const generateAuthParams = () => {
  const timestamp = Date.now().toString();
  const hash = CryptoJS.MD5(
    timestamp + API_CONFIG.privateKey + API_CONFIG.publicKey
  ).toString();

  return {
    ts: timestamp,
    apikey: API_CONFIG.publicKey,
    hash: hash,
  };
};

const useMarvelAPI = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);

        // Generate authentication parameters
        const authParams = generateAuthParams();

        // Build URL with authentication
        const url = new URL(`${API_CONFIG.baseURL}/characters`);
        url.searchParams.append("ts", authParams.ts);
        url.searchParams.append("apikey", authParams.apikey);
        url.searchParams.append("hash", authParams.hash);
        url.searchParams.append("limit", "50"); // Get more characters
        url.searchParams.append("offset", "0");

        const response = await fetch(url.toString());

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Marvel API returns data in data.data.results
        setCharacters(data.data.results);
        setLoading(false);
      } catch (err) {
        console.error("Marvel API Error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  return { characters, loading, error };
};

export default useMarvelAPI;
