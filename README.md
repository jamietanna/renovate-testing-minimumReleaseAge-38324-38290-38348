# https://github.com/renovatebot/renovate/discussions/38324

Being run with:

```sh
# in one terminal
env PORT=12345 node server.js

# and in another terminal
env LOG_LEVEL=debug npx renovate@41.132.5 --platform local --dry-run=lookup
```

## SCENARIO 1: `minimumReleaseAge` has not been met for v0.1.1

Note the `pendingChecks`:

```
DEBUG: packageFiles with updates (repository=local)
       "config": {
         "regex": [
           {
             "deps": [
               {
                 "depName": "some-package",
                 "currentValue": "v0.1.0",
                 "datasource": "custom.localExample",
                 "versioning": "semver-coerced",
                 "replaceString": "v0.1.0",
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "0.1.1",
                     "newValue": "0.1.1",
                     "releaseTimestamp": "2025-10-03T09:49:59.000Z",
                     "newVersionAgeInDays": 0,
                     "newMajor": 0,
                     "newMinor": 1,
                     "newPatch": 1,
                     "updateType": "patch",
                     "isBreaking": true,
                     "pendingChecks": true,
                     "libYears": 0.027397238711314054,
                     "branchName": "renovate/some-package-0.x"
                   }
                 ],
                 "packageName": "some-package",
                 "warnings": [],
                 "mostRecentTimestamp": "2025-10-03T09:49:59.000Z",
                 "currentVersion": "0.1.0",
                 "currentVersionTimestamp": "2025-09-23T09:49:59.680Z",
                 "currentVersionAgeInDays": 10,
                 "isSingleVersion": true,
                 "fixedVersion": "v0.1.0"
               }
             ],
             "matchStrings": ["(?<currentValue>\\S+)"],
             "depNameTemplate": "some-package",
             "datasourceTemplate": "custom.localExample",
             "versioningTemplate": "semver-coerced",
             "packageFile": "packagefile.txt"
           }
         ]
       }
```

See also: `debug-1.jsonl`

See also: `debug-1.jsonl`

## SCENARIO 2: `minimumReleaseAge` has been met for v0.1.1

Note lack of `isPending`

```
DEBUG: packageFiles with updates (repository=local)
       "config": {
         "regex": [
           {
             "deps": [
               {
                 "depName": "some-package",
                 "currentValue": "v0.1.0",
                 "datasource": "custom.localExample",
                 "versioning": "semver-coerced",
                 "replaceString": "v0.1.0",
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "0.1.1",
                     "newValue": "0.1.1",
                     "releaseTimestamp": "2025-10-02T09:50:46.297Z",
                     "newVersionAgeInDays": 1,
                     "newMajor": 0,
                     "newMinor": 1,
                     "newPatch": 1,
                     "updateType": "patch",
                     "isBreaking": true,
                     "libYears": 0.024657534246575342,
                     "branchName": "renovate/some-package-0.x"
                   }
                 ],
                 "packageName": "some-package",
                 "warnings": [],
                 "mostRecentTimestamp": "2025-10-02T09:50:46.297Z",
                 "currentVersion": "0.1.0",
                 "currentVersionTimestamp": "2025-09-23T09:50:46.297Z",
                 "currentVersionAgeInDays": 10,
                 "isSingleVersion": true,
                 "fixedVersion": "v0.1.0"
               }
             ],
             "matchStrings": ["(?<currentValue>\\S+)"],
             "depNameTemplate": "some-package",
             "datasourceTemplate": "custom.localExample",
             "versioningTemplate": "semver-coerced",
             "packageFile": "packagefile.txt"
           }
         ]
       }
```


See also: `debug-2.jsonl`

## SCENARIO 3: `minimumReleaseAge` has been met for v0.1.1 and has NOT been met for v0.2.0

Note the `pendingVersions`

```
DEBUG: packageFiles with updates (repository=local)
       "config": {
         "regex": [
           {
             "deps": [
               {
                 "depName": "some-package",
                 "currentValue": "v0.1.0",
                 "datasource": "custom.localExample",
                 "versioning": "semver-coerced",
                 "replaceString": "v0.1.0",
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "0.1.1",
                     "newValue": "0.1.1",
                     "releaseTimestamp": "2025-09-23T09:51:34.323Z",
                     "newVersionAgeInDays": 10,
                     "newMajor": 0,
                     "newMinor": 1,
                     "newPatch": 1,
                     "updateType": "patch",
                     "isBreaking": true,
                     "pendingVersions": ["0.1.2"],
                     "libYears": 0,
                     "branchName": "renovate/some-package-0.x"
                   }
                 ],
                 "packageName": "some-package",
                 "warnings": [],
                 "mostRecentTimestamp": "2025-10-03T09:51:34.000Z",
                 "currentVersion": "0.1.0",
                 "currentVersionTimestamp": "2025-09-23T09:51:34.323Z",
                 "currentVersionAgeInDays": 10,
                 "isSingleVersion": true,
                 "fixedVersion": "v0.1.0"
               }
             ],
             "matchStrings": ["(?<currentValue>\\S+)"],
             "depNameTemplate": "some-package",
             "datasourceTemplate": "custom.localExample",
             "versioningTemplate": "semver-coerced",
             "packageFile": "packagefile.txt"
           }
         ]
       }
```

See also: `debug-3.jsonl`

## SCENARIO 4: `minimumReleaseAge` has been met for v0.1.1 and has been met for v0.2.0

```
DEBUG: packageFiles with updates (repository=local)
       "config": {
         "regex": [
           {
             "deps": [
               {
                 "depName": "some-package",
                 "currentValue": "v0.1.0",
                 "datasource": "custom.localExample",
                 "versioning": "semver-coerced",
                 "replaceString": "v0.1.0",
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "0.1.2",
                     "newValue": "0.1.2",
                     "releaseTimestamp": "2025-10-02T09:52:18.379Z",
                     "newVersionAgeInDays": 1,
                     "newMajor": 0,
                     "newMinor": 1,
                     "newPatch": 2,
                     "updateType": "patch",
                     "isBreaking": true,
                     "libYears": 0.024657534246575342,
                     "branchName": "renovate/some-package-0.x"
                   }
                 ],
                 "packageName": "some-package",
                 "warnings": [],
                 "mostRecentTimestamp": "2025-10-02T09:52:18.379Z",
                 "currentVersion": "0.1.0",
                 "currentVersionTimestamp": "2025-09-23T09:52:18.379Z",
                 "currentVersionAgeInDays": 10,
                 "isSingleVersion": true,
                 "fixedVersion": "v0.1.0"
               }
             ],
             "matchStrings": ["(?<currentValue>\\S+)"],
             "depNameTemplate": "some-package",
             "datasourceTemplate": "custom.localExample",
             "versioningTemplate": "semver-coerced",
             "packageFile": "packagefile.txt"
           }
         ]
       }
```

See also: `debug-4.jsonl`

## SCENARIO 5: v0.1.2 has no `releaseTimestamp`

> [!CAUTION]
> This release is created immediately.
>
> Related: https://github.com/renovatebot/renovate/discussions/38290 / https://github.com/renovatebot/renovate/discussions/38348

```
DEBUG: packageFiles with updates (repository=local)
       "config": {
         "regex": [
           {
             "deps": [
               {
                 "depName": "some-package",
                 "currentValue": "v0.1.0",
                 "datasource": "custom.localExample",
                 "versioning": "semver-coerced",
                 "replaceString": "v0.1.0",
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "0.1.2",
                     "newValue": "0.1.2",
                     "newMajor": 0,
                     "newMinor": 1,
                     "newPatch": 2,
                     "updateType": "patch",
                     "isBreaking": true,
                     "branchName": "renovate/some-package-0.x"
                   }
                 ],
                 "packageName": "some-package",
                 "warnings": [],
                 "currentVersion": "0.1.0",
                 "currentVersionTimestamp": "2025-09-23T09:55:29.558Z",
                 "currentVersionAgeInDays": 10,
                 "isSingleVersion": true,
                 "fixedVersion": "v0.1.0"
               }
             ],
             "matchStrings": ["(?<currentValue>\\S+)"],
             "depNameTemplate": "some-package",
             "datasourceTemplate": "custom.localExample",
             "versioningTemplate": "semver-coerced",
             "packageFile": "packagefile.txt"
           }
         ]
       }
```

See also: `debug-5.jsonl`
