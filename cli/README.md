# About
This is an npm package to help build, run, and test case-studies.
It can be used as a command line tool (nice for development) and as an importable node module (nice for testing).

It is designed to streamline workflows for both candidates and reviewers.

Its primary purpose is to generate applications that depend on case-study services. Under the hood it uses docker-compose to stand up services along side the app/test containers.


# Benefits
There are several benefits to this approach:
- Candidates do not need to have an understanding of docker in order to complete a case study.
- Candidates can use any of the preconfigured tech stacks (through the `--base` option) and can even configure their own if they're docker-savvy.
- Minimal local environment configuration is necessary because of the use of docker.
- Any number of services can easily be stood up along side the generated application.
- Running unknown code on our host machines is dangerous. This offers a universal way to run code in a secure, sandboxed way.
- Reviewers can write automated E2E tests around the specifications of the case studies they build.

# Full Example
[Here's an example case study](https://git.target.com/csr/target-case-study/tree/master/examples/product-search) built on top of this tool 


# Installation

### Install Dependencies
Install node (8.11.0 or greater) <br>
[https://nodejs.org/en/download/](https://nodejs.org/en/download/)

Install docker <br>
[https://docs.docker.com/install/](https://docs.docker.com/install/)

### Install as CLI
:warning: Not yet available - for now see <a href="#local-development">Local Development</a>
```bash
npm install -g target-case-study
```

### Install as module
:warning: Not yet available - for now see <a href="#local-development">Local Development</a>
```bash
npm install --save target-case-study
```


# CLI Usage

## Example
```bash
# Write new spring boot app to ./my-spring-boot-app
case-study init --base=java-spring-boot --destination=my-spring-boot-app --services=product_info_api

# Change working directory
cd my-spring-boot-app

# Run the app
case-study run

# App now running on localhost:8000/ with product_info_api accessible at localhost:8001/product_info_api/
```

## Commands

```
Usage: case-study <command> [options]

Commands:
  case-study init    Generate an application
  case-study run     Run application
  case-study test    Run tests against application
  case-study stop    Stop any running services
  case-study pack    Pack application into single file
  case-study unpack  Unpack a packed application

Options:
  --version   Show version number                                      [boolean]
  -h, --help  Show help                                                [boolean]                                             [boolean]
```

## init
```
case-study init

Generate an application

Options:
  --version                  Show version number                       [boolean]
  -h, --help                 Show help                                 [boolean]
  --base                     Tech stack to use as the app's foundation
                      [string] [required] [choices: "react", "java-spring-boot"]
  --destination, --app-name  The path where the application should be written
                                                             [string] [required]
  --services                 List of http services to include
  [array] [choices: "version_api", "fake_api", "product_info_api"] [default: []]
```

## run
```
case-study run

Run application

Options:
  --version   Show version number                                      [boolean]
  -h, --help  Show help                                                [boolean]
```

## test
```
case-study test

Run tests against application

Options:
  --version   Show version number                                      [boolean]
  -h, --help  Show help                                                [boolean]
```

## stop
```
case-study stop

Stop any running services

Options:
  --version   Show version number                                      [boolean]
  -h, --help  Show help                                                [boolean]
```

## pack
```
case-study pack

Pack application into single file

Options:
  --version      Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]
  --source       Path of directory to pack                              [string]
  --destination  Path to write packed application                       [string]
```

## unpack
```
case-study unpack

Unpack a packed application

Options:
  --version      Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]
  --source       Path of file to unpack                      [string] [required]
  --destination  Path to write unpacked application          [string] [required]
```


# Module Usage

## Example
```javascript
const CaseStudy = require('target-case-study')
const waitOn = require('wait-on')

const run = async () => {
  const appPath = await CaseStudy.init('react', './my-react-app')
  
  CaseStudy.run(appPath)

  await waitOn({
      resources: ['http://localhost:8000/'],
      interval: 2000,
      timeout: 60000,
  })
  
  // Do something with app over http
}

run()
```

## Functions

<dl>
<dt><a href="#api-init">init(base, destinationPath, options)</a> ⇒ <code>Promise.&lt;string&gt;</code></dt>
<dd><p>Generates a new application at the destinationPath</p>
</dd>
<dt><a href="#api-run">run(appPath)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Runs application at appPath via docker-compose</p>
</dd>
<dt><a href="#api-test">test(appPath)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Tests application at appPath via docker-compose</p>
</dd>
<dt><a href="#api-stop">stop(appPath)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Stops services specified for application at appPath via docker-compose</p>
</dd>
<dt><a href="#api-pack">pack(sourcePath, destinationPath)</a> ⇒ <code>Promise.&lt;string&gt;</code></dt>
<dd><p>Packs application at sourcePath and writes it to the destinationPath</p>
</dd>
<dt><a href="#api-unpack">unpack(sourcePath, destinationPath)</a> ⇒ <code>Promise.&lt;string&gt;</code></dt>
<dd><p>Unpacks application at sourcePath and writes it to the destinationPath</p>
</dd>
</dl>


## Classes

<dl>
<dt><a href="#BaseError">BaseError</a> ⇐ <code>Error</code></dt>
<dd><p>A base error</p>
</dd>
<dt><a href="#MissingFileError">MissingFileError</a> ⇐ <code><a href="#BaseError">BaseError</a></code></dt>
<dd><p>Indicates that a required file could not be found</p>
</dd>
<dt><a href="#InvalidFileError">InvalidFileError</a> ⇐ <code><a href="#BaseError">BaseError</a></code></dt>
<dd><p>Indicates that a required file is invalid</p>
</dd>
<dt><a href="#WriteError">WriteError</a> ⇐ <code><a href="#BaseError">BaseError</a></code></dt>
<dd><p>Indicates that something went wrong while writing a file to the file system</p>
</dd>
<dt><a href="#OverwriteError">OverwriteError</a> ⇐ <code><a href="#WriteError">WriteError</a></code></dt>
<dd><p>Indicates that could not write to specified path because a file/folder already existed at that path</p>
</dd>
<dt><a href="#SubprocessError">SubprocessError</a> ⇐ <code><a href="#BaseError">BaseError</a></code></dt>
<dd><p>Indicates that a subprocess terminated with a non-zero exit code</p>
</dd>
<dt><a href="#BadArgumentError">BadArgumentError</a> ⇐ <code><a href="#BaseError">BaseError</a></code></dt>
<dd><p>Indicates that an argument did not match requirements</p>
</dd>
<dt><a href="#DependencyError">DependencyError</a> ⇐ <code><a href="#BaseError">BaseError</a></code></dt>
<dd><p>Indicates that a dependency could not be found</p>
</dd>
</dl>


<a name="api-init"></a>

## init(base, destinationPath, options) ⇒ <code>Promise.&lt;string&gt;</code>
Generates a new application at the destinationPath

**Kind**: global function  
**Returns**: <code>Promise.&lt;string&gt;</code> - path at which application was written  
**Throws**:

- [<code>BadArgumentError</code>](#BadArgumentError) 
- [<code>OverwriteError</code>](#OverwriteError) 
- [<code>WriteError</code>](#WriteError) 


| Param | Type | Description |
| --- | --- | --- |
| base | <code>string</code> | application stack ('react', 'java-spring-boot') |
| destinationPath | <code>string</code> | path to write application |
| options | <code>object</code> | method options |
| otpions.services | <code>Array.&lt;string&gt;</code> | list of services to stand up along side application |

<a name="api-run"></a>

## run(appPath) ⇒ <code>Promise.&lt;number&gt;</code>
Runs application at appPath via docker-compose

**Kind**: global function  
**Returns**: <code>Promise.&lt;number&gt;</code> - - exit code (0 when resolved)  
**Throws**:

- [<code>BadArgumentError</code>](#BadArgumentError) 
- [<code>MissingFileError</code>](#MissingFileError) 
- [<code>SubprocessError</code>](#SubprocessError) 
- [<code>DependencyError</code>](#DependencyError) 


| Param | Type | Description |
| --- | --- | --- |
| appPath | <code>string</code> | path of application to run |

<a name="api-test"></a>

## test(appPath) ⇒ <code>Promise.&lt;number&gt;</code>
Tests application at appPath via docker-compose

**Kind**: global function  
**Returns**: <code>Promise.&lt;number&gt;</code> - - exit code (0 when resolved)  
**Throws**:

- [<code>BadArgumentError</code>](#BadArgumentError) 
- [<code>MissingFileError</code>](#MissingFileError) 
- [<code>SubprocessError</code>](#SubprocessError) 
- [<code>DependencyError</code>](#DependencyError) 


| Param | Type | Description |
| --- | --- | --- |
| appPath | <code>string</code> | path of application to test |

<a name="api-stop"></a>

## stop(appPath) ⇒ <code>Promise.&lt;number&gt;</code>
Stops services specified for application at appPath via docker-compose

**Kind**: global function  
**Returns**: <code>Promise.&lt;number&gt;</code> - - exit code (0 when resolved)  
**Throws**:

- [<code>BadArgumentError</code>](#BadArgumentError) 
- [<code>MissingFileError</code>](#MissingFileError) 
- [<code>SubprocessError</code>](#SubprocessError) 
- [<code>DependencyError</code>](#DependencyError) 


| Param | Type | Description |
| --- | --- | --- |
| appPath | <code>string</code> | path of application to stop |

<a name="api-pack"></a>

## pack(sourcePath, destinationPath) ⇒ <code>Promise.&lt;string&gt;</code>
Packs application at sourcePath and writes it to the destinationPath

**Kind**: global function  
**Returns**: <code>Promise.&lt;string&gt;</code> - path at which packed application was written  
**Throws**:

- [<code>BadArgumentError</code>](#BadArgumentError) 
- [<code>OverwriteError</code>](#OverwriteError) 
- [<code>WriteError</code>](#WriteError) 
- [<code>MissingFileError</code>](#MissingFileError) 


| Param | Type | Description |
| --- | --- | --- |
| sourcePath | <code>string</code> | path of application to pack |
| destinationPath | <code>string</code> | path to write packed application |

<a name="api-unpack"></a>

## unpack(sourcePath, destinationPath) ⇒ <code>Promise.&lt;string&gt;</code>
Unpacks application at sourcePath and writes it to the destinationPath

**Kind**: global function  
**Returns**: <code>Promise.&lt;string&gt;</code> - path at which unpacked application was written  
**Throws**:

- [<code>BadArgumentError</code>](#BadArgumentError) 
- [<code>OverwriteError</code>](#OverwriteError) 
- [<code>WriteError</code>](#WriteError) 


| Param | Type | Description |
| --- | --- | --- |
| sourcePath | <code>string</code> | path of packed application to unpack |
| destinationPath | <code>string</code> | path to write unpacked application |



<a name="BaseError"></a>

## BaseError ⇐ <code>Error</code>
A base error

**Kind**: global class  
**Extends**: <code>Error</code>  
<a name="new_BaseError_new"></a>

### new BaseError(message)

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | error message |

<a name="MissingFileError"></a>

## MissingFileError ⇐ [<code>BaseError</code>](#BaseError)
Indicates that a required file could not be found

**Kind**: global class  
**Extends**: [<code>BaseError</code>](#BaseError)  
<a name="new_MissingFileError_new"></a>

### new MissingFileError(message, file)

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | error message |
| file | <code>string</code> | path to anticipated file |

<a name="InvalidFileError"></a>

## InvalidFileError ⇐ [<code>BaseError</code>](#BaseError)
Indicates that a required file is invalid

**Kind**: global class  
**Extends**: [<code>BaseError</code>](#BaseError)  
<a name="new_InvalidFileError_new"></a>

### new InvalidFileError(message, file)

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | error message |
| file | <code>string</code> | path to invalid file |

<a name="WriteError"></a>

## WriteError ⇐ [<code>BaseError</code>](#BaseError)
Indicates that something went wrong while writing a file to the file system

**Kind**: global class  
**Extends**: [<code>BaseError</code>](#BaseError)  
<a name="new_WriteError_new"></a>

### new WriteError(message, path)

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | error message |
| path | <code>string</code> | path to which write was attempted |

<a name="OverwriteError"></a>

## OverwriteError ⇐ [<code>WriteError</code>](#WriteError)
Indicates that could not write to specified path because a file/folder already existed at that path

**Kind**: global class  
**Extends**: [<code>WriteError</code>](#WriteError)  
<a name="new_OverwriteError_new"></a>

### new OverwriteError(message, path)

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | error message |
| path | <code>string</code> | path to which write was attempted |

<a name="SubprocessError"></a>

## SubprocessError ⇐ [<code>BaseError</code>](#BaseError)
Indicates that a subprocess terminated with a non-zero exit code

**Kind**: global class  
**Extends**: [<code>BaseError</code>](#BaseError)  
<a name="new_SubprocessError_new"></a>

### new SubprocessError(message, exitCode)

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | error message |
| exitCode | <code>number</code> | the exit code with which the subprocess terminated |

<a name="BadArgumentError"></a>

## BadArgumentError ⇐ [<code>BaseError</code>](#BaseError)
Indicates that an argument did not match requirements

**Kind**: global class  
**Extends**: [<code>BaseError</code>](#BaseError)  
<a name="new_BadArgumentError_new"></a>

### new BadArgumentError(message, parameter, type, value)

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | error message |
| parameter | <code>\*</code> | parameter name |
| type | <code>\*</code> | expected type of argument |
| value | <code>\*</code> | value received as argument |

<a name="DependencyError"></a>

## DependencyError ⇐ [<code>BaseError</code>](#BaseError)
Indicates that a dependency could not be found

**Kind**: global class  
**Extends**: [<code>BaseError</code>](#BaseError)  
<a name="new_DependencyError_new"></a>

### new DependencyError(message, dependency)

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | error message |
| dependency | <code>string</code> | name of dependency |

# Local Development
If you wish to contribute to this sdk.

### Install Dependencies
Install node (8.11.0 or greater) <br>
[https://nodejs.org/en/download/](https://nodejs.org/en/download/)

Install docker <br>
[https://docs.docker.com/install/](https://docs.docker.com/install/)

### Install from Source
Clone this repo and cd to the directory containing this README. <br>
Run: 
```bash
npm link
```

At this point you should be able to use the tool locally from the command line.

If you wish to require this library from another node project, cd to the other node project directory and run:
```bash
npm link target-case-study
```

### Running functional tests
This tool is tested with mocha/chai to ensure it generates proper, functioning applications.
To run tests against this package, you can run:
```bash
npm test
```
