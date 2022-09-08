bbmutation
==========

Salesforce CLI plug-in to generate mutant Apex code and execute test suites against it.

[![Version](https://img.shields.io/npm/v/bbmutation.svg)](https://npmjs.org/package/bbmutation)
[![CircleCI](https://circleci.com/gh/keirbowden/bbmutation/tree/master.svg?style=shield)](https://circleci.com/gh/keirbowden/bbmutation/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/keirbowden/bbmutation?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/bbmutation/branch/master)
[![Greenkeeper](https://badges.greenkeeper.io/keirbowden/bbmutation.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/keirbowden/bbmutation/badge.svg)](https://snyk.io/test/github/keirbowden/bbmutation)
[![Downloads/week](https://img.shields.io/npm/dw/bbmutation.svg)](https://npmjs.org/package/bbmutation)
[![License](https://img.shields.io/npm/l/bbmutation.svg)](https://github.com/keirbowden/bbmutation/blob/master/package.json)

<!-- toc -->

<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g bbmutation
$ sfdx COMMAND
running command...
$ sfdx (--version)
bbmutation/1.0.0 darwin-arm64 node-v16.16.0
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx bbmutants:execute [-d <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-bbmutantsexecute--d-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx bbmutants:mutate [-d <string>] [-t <string>] [-m <string>] [-s <string>] [-v <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-bbmutantsmutate--d-string--t-string--m-string--s-string--v-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx bbmutants:execute [-d <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

deploy mutants and run tests

```
USAGE
  $ sfdx bbmutants:execute [-d <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -d, --dir=<value>                                                                 directory containing classes
                                                                                    (defaults to package directory)
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  deploy mutants and run tests

EXAMPLES
  $ sfdx bbmutants:execute --targetusername myOrg@example.com
```

_See code: [src/commands/bbmutants/execute.ts](https://github.com/keirbowden/bbmutation/blob/v1.0.0/src/commands/bbmutants/execute.ts)_

## `sfdx bbmutants:mutate [-d <string>] [-t <string>] [-m <string>] [-s <string>] [-v <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

generate mutant Apex classes from your existing codebase

```
USAGE
  $ sfdx bbmutants:mutate [-d <string>] [-t <string>] [-m <string>] [-s <string>] [-v <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -d, --dir=<value>                                                                 directory containing classes
                                                                                    (defaults to package directory)
  -m, --maxmutantsperfile=<value>                                                   maximum number of mutants per file
                                                                                    (default unlimited)
  -s, --strings=<value>                                                             list of strings to consider
                                                                                    replacing
  -t, --targetfiles=<value>                                                         list of filenames to target for
                                                                                    mutation
  -v, --values=<value>                                                              list of numeric values to consider
                                                                                    replacing
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  generate mutant Apex classes from your existing codebase

EXAMPLES
  $ sfdx bbmutants:mutate -t directorycontroller

  $ sfdx bbmutants:mutate -m 5
```

_See code: [src/commands/bbmutants/mutate.ts](https://github.com/keirbowden/bbmutation/blob/v1.0.0/src/commands/bbmutants/mutate.ts)_
<!-- commandsstop -->
