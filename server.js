// Co-authored-by: gpt-oss:20b
// With inspiration from https://secustor.dev/blog/renovate_custom_datasources/ and https://docs.renovatebot.com/modules/datasource/custom/#usage

const http = require('http');

const now = new Date();

const ONE_DAY_MILLIS = 24 * 60 * 60 * 1000;
const ONE_HOUR_MILLIS = 60 * 60 * 1000;
const MINIMUM_RELEASE_AGE = ONE_DAY_MILLIS;

const farBeforeMinimumReleaseAge = new Date(now - 10 * ONE_DAY_MILLIS);

const justBeforeMinimumReleaseAge = new Date(now - ONE_DAY_MILLIS - ONE_HOUR_MILLIS);

const justInMinimumReleaseAge = new Date(now - ONE_DAY_MILLIS);

const notYetInMinimumReleaseAge = new Date(now + 12 * ONE_HOUR_MILLIS);

// SCENARIO 1: `minimumReleaseAge` has not been met for v0.1.1
// const v010 = {
//   version: '0.1.0',
//   releaseTimestamp: farBeforeMinimumReleaseAge.toISOString(),
// }
// const v011 = {
//   version: '0.1.1',
//   releaseTimestamp: notYetInMinimumReleaseAge.toISOString(),
// }
// const v012 = undefined;

// SCENARIO 2: `minimumReleaseAge` has been met for v0.1.1
// const v010 = {
//   version: '0.1.0',
//   releaseTimestamp: farBeforeMinimumReleaseAge.toISOString(),
// }
// const v011 = {
//   version: '0.1.1',
//   releaseTimestamp: justInMinimumReleaseAge.toISOString(),
// }
// const v012 = undefined;

// SCENARIO 3: `minimumReleaseAge` has been met for v0.1.1 and has NOT been met for v0.2.0
// const v010 = {
//   version: '0.1.0',
//   releaseTimestamp: farBeforeMinimumReleaseAge.toISOString(),
// }
// const v011 = {
//   version: '0.1.1',
//   releaseTimestamp: farBeforeMinimumReleaseAge.toISOString(),
// }
// const v012 = {
//   version: '0.1.2',
//   releaseTimestamp: notYetInMinimumReleaseAge.toISOString(),
// }

// SCENARIO 4: `minimumReleaseAge` has been met for v0.1.1 and has been met for v0.2.0
// const v010 = {
//   version: '0.1.0',
//   releaseTimestamp: farBeforeMinimumReleaseAge.toISOString(),
// }
// const v011 = {
//   version: '0.1.1',
//   releaseTimestamp: farBeforeMinimumReleaseAge.toISOString(),
// }
// const v012 = {
//   version: '0.1.2',
//   releaseTimestamp: justInMinimumReleaseAge.toISOString(),
// }

// SCENARIO 5: v0.1.2 has no `releaseTimestamp`
const v010 = {
  version: '0.1.0',
  releaseTimestamp: farBeforeMinimumReleaseAge.toISOString(),
}
const v011 = {
  version: '0.1.1',
  releaseTimestamp: farBeforeMinimumReleaseAge.toISOString(),
}
const v012 = {
  version: '0.1.2',
  // no releaseTimestamp
}

// Create the server
const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json',   // tell the client we’re sending JSON
    'Cache-Control': 'no-store'           // optional – don’t cache the response
  });

  const releases = [
    v010,
    v011,
    v012,
  ].filter(v => v !== undefined);

  // Convert the payload object to a JSON string
  res.end(JSON.stringify({
    releases,
  }));
});

// Pick a port (you can change this if you like)
const PORT = process.env.PORT || 3000;

// Start listening
server.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});

