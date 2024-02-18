import axios from 'axios';

export async function fetchBreeds() {
  const breeds = await axios.get('https://api.thecatapi.com/v1/breeds');

  return breeds.data;
}

export async function fetchCatByBreed(breedID) {
  const breedSelected = await axios.get(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedID}`
  );

  return breedSelected.data;
}
