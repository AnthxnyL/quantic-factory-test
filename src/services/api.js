import axios from 'axios';

const BASE_URL = 'https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/';

export const fetchDataset = async (datasetId, options = {}) => {
  const { limit = 100, start = 0, where = ''} = options;

  const params = { limit, start };
  if (where) params.where = where;

  try {
    const response = await axios.get(
      `${BASE_URL}${datasetId}/records`,
      { params }
    );
    return response.data.results;
  } catch (error) {
    console.error(`Erreur fetch ${datasetId}:`, error);
    return [];
  }
};


export const fetchUniqueFieldValues = async (datasetId, fieldName, where = '') => {
  try {
    const params = {
      select: `${fieldName},count(*)`,
      group_by: fieldName,
      order_by: fieldName,
    };
    if (where) params.where = where;

    const response = await axios.get(`${BASE_URL}${datasetId}/records`, {
      params,
    });

    return response.data.results
      .map(item => item[fieldName])
      .filter(val => typeof val === 'string' && val.trim() !== '')
      .map(val => val.trim())
      .filter((val, index, self) => self.indexOf(val) === index)
      .sort();
  } catch (error) {
    console.error(`Erreur fetch valeurs uniques pour ${fieldName} :`, error);
    return [];
  }
};



