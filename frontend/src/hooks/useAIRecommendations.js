import { useEffect, useState } from "react";

const useAIRecommendations = (userId) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchRecommendations = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulated API call (replace with real API endpoint)
        const response = await fetch(`/api/recommendations?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch recommendations.");
        }
        const data = await response.json();
        setRecommendations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [userId]);

  return { recommendations, loading, error };
};

export default useAIRecommendations;
