interface IInput {
  error: string;
  function: string;
  platform: string;
  screen: string;
  version: string;
}
const sendCrushlytic = async (input: IInput) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var graphql = JSON.stringify({
    query: `mutation Mutation($input: CrashLyticsInput!) {
        createCrashLytics(input: $input) {
          id
        }
      }`,
    variables: {
      input: input,
    },
  });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: graphql,
    redirect: "follow",
  };

  fetch(
    "https://blog-pantofit-zdxdf.ondigitalocean.app/pantofit",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

export { sendCrushlytic };
