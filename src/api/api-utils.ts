const ApiUtils = {
  authTokenHeader(authToken: string): { headers: { Authorization: string } } {
    return {
      headers: {
        Authorization: authToken,
      },
    };
  },
};

export default ApiUtils;
