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
* [Debugging your plugin](#debugging-your-plugin)
<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g bbmutation
$ sfdx COMMAND
running command...
$ sfdx (--version)
bbmutation/0.0.1 darwin-arm64 node-v16.16.0
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx bbmutants:execute [-d <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-bbmutantsexecute--d-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx bbmutants:mutate [-d <string>] [-t <string>] [-m <string>] [-s <string>] [-v <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-bbmutantsmutate--d-string--t-string--m-string--s-string--v-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx hello:org [-n <string>] [-f] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-helloorg--n-string--f--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

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
  $ sfdx hello:org --targetusername myOrg@example.com --targetdevhubusername devhub@org.com

  $ sfdx hello:org --name myname --targetusername myOrg@example.com
```

_See code: [src/commands/bbmutants/execute.ts](https://github.com/keirbowden/bbmutation/blob/v0.0.1/src/commands/bbmutants/execute.ts)_

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
  $ sfdx hello:org --targetusername myOrg@example.com --targetdevhubusername devhub@org.com

  $ sfdx hello:org --name myname --targetusername myOrg@example.com
```

_See code: [src/commands/bbmutants/mutate.ts](https://github.com/keirbowden/bbmutation/blob/v0.0.1/src/commands/bbmutants/mutate.ts)_

## `sfdx hello:org [-n <string>] [-f] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

print a greeting and your org IDs

```
USAGE
  $ sfdx hello:org [-n <string>] [-f] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -f, --force                                                                       example boolean flag
  -n, --name=<value>                                                                name to print
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  -v, --targetdevhubusername=<value>                                                username or alias for the dev hub
                                                                                    org; overrides default dev hub org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  print a greeting and your org IDs

EXAMPLES
  $ sfdx hello:org --targetusername myOrg@example.com --targetdevhubusername devhub@org.com

  $ sfdx hello:org --name myname --targetusername myOrg@example.com
```

_See code: [src/commands/hello/org.ts](https://github.com/keirbowden/bbmutation/blob/v0.0.1/src/commands/hello/org.ts)_
<!-- commandsstop -->
<!-- debugging-your-plugin -->
# Debugging your plugin
We recommend using the Visual Studio Code (VS Code) IDE for your plugin development. Included in the `.vscode` directory of this plugin is a `launch.json` config file, which allows you to attach a debugger to the node process when running your commands.

To debug the `hello:org` command: 
1. Start the inspector
  
If you linked your plugin to the sfdx cli, call your command with the `dev-suspend` switch: 
```sh-session
$ sfdx hello:org -u myOrg@example.com --dev-suspend
```
  
Alternatively, to call your command using the `bin/run` script, set the `NODE_OPTIONS` environment variable to `--inspect-brk` when starting the debugger:
```sh-session
$ NODE_OPTIONS=--inspect-brk bin/run hello:org -u myOrg@example.com
```

2. Set some breakpoints in your command code
3. Click on the Debug icon in the Activity Bar on the side of VS Code to open up the Debug view.
4. In the upper left hand corner of VS Code, verify that the "Attach to Remote" launch configuration has been chosen.
5. Hit the green play button to the left of the "Attach to Remote" launch configuration window. The debugger should now be suspended on the first line of the program. 
6. Hit the green play button at the top middle of VS Code (this play button will be to the right of the play button that you clicked in step #5).
<br><img src=".images/vscodeScreenshot.png" width="480" height="278"><br>
Congrats, you are debugging!
