import { useEffect } from "react";

export const useImageResult = (searchQuery) => {
  let page = 1;
  let keyword = searchQuery;
  const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  console.log(ACCESS_KEY);
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${ACCESS_KEY}&per_page=12`;
  const fetchingImages = async () => {
    try {
      const res = await fetch(url);
      const json = await res.json();
      console.log(json);
      return json;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  useEffect(() => {
    fetchingImages();
  }, []);
};
