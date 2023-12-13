import axios from 'axios';
//<------------------------------------------------------------
async function fetchData(searchQuery, page = 1) {
  const MY_API_KEY = '40227453-3557d8d2139416ae0b447ea7a';
  const URL = 'https://pixabay.com/api/';
  const params = {
    q: searchQuery,
    key: MY_API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
    page,
  };

  try {
    const response = await axios(`${URL}`, { params });
    const data = await response.data;
    const fetchedImages = data.hits.map(el => ({
      id: el.id,
      webformatURL: el.webformatURL,
      largeImageURL: el.largeImageURL,
    }));

    return { fetchedImages, total: data.total };
  } catch (error) {
    throw error;
  }
}
export default fetchData;
// ----------------------------------------------->
