class Handler {
  constructor() {}

  requestSuccessed(detail, data) {
    return {
      success: true,
      message: `Request successed ! ${detail ? detail : ""}`,
      data: data ? data : "Data not filed",
    };
  }

  loggedRequestSuccessed(detail, data) {
    console.log({
      success: true,
      message: `Request successed ! ${detail ? detail : ""}`,
      data: data ? data : "Data not filed",
    });
  }

  requestFailed(error, detail) {
    const errorMessage = error.message
      ? error.message
      : error
      ? error
      : "An error occurred";
    const stackMessage = error.stack ? error.stack : undefined;

    return {
      success: false,
      message: `Request failed ! ${detail ? detail : ""}`,
      error: errorMessage,
      stack: stackMessage,
    };
  }

  loggedRequestFailed(error, detail) {
    const errorMessage = error.message ? error.message : "An error occurred";
    const stackMessage = error.stack ? error.stack : undefined;

    console.log({
      success: false,
      message: `Request failed ! ${detail ? detail : ""}`,
      error: errorMessage,
      stack: stackMessage,
    });
  }
}

module.exports = { Handler };
