const handleDeleteEntry = async () => {
  await axios.delete(`${BASE_URL}/get-list/entries`, {
    id: "6",
  });
};
