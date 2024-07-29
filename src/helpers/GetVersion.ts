const getVersion = async () => {
  let loading = false;
  let version = "";
  let versionCritique = "";
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var graphql = JSON.stringify({
    query:
      "query Query {\r\n  getVersion {\r\n    version\r\n    versionCritique\r\n  }\r\n}",
    variables: {},
  });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: graphql,
    redirect: "follow",
  };

  try {
    loading = true;
    const res = await fetch(
      "https://blog-pantofit-zdxdf.ondigitalocean.app/pantofit",
      requestOptions
    );
    const json = await res.json();
    version = json?.data?.getVersion?.version || "0.0.0";
    versionCritique = json?.data?.getVersion?.versionCritique || "0.0.0";
    loading = false;
  } catch (err) {
    console.log(err);
  }
  return {
    loading,
    version,
    versionCritique
  }
};

export { getVersion };
