

function Page() {
  const apiUrl = process.env.REACT_APP_API_URL

  console.log(apiUrl)

  fetch(`${apiUrl}/health`)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error));


  return <div className="">template</div>;
}

export default Page;
