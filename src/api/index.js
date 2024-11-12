/**
 * Fetches a list of users from the Random User Generator API.
 *
 * @async
 * @function fetchUsers
 * @param {number} page - The page number to fetch users from.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of user objects.
 * @throws {Error} Throws an error if the HTTP request fails or if the response is not ok.
 */
export const fetchUsers = async (page) => {
  return fetch(`https://randomuser.me/api/?results=20&page=${page}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => data.results)
    .catch((err) => console.error(err));
};
