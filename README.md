# Beria 🦅

Витя, получишь пизды, если будешь юзать `margin-top`.    

<!-- **npm** package for scanning files and searching content by strings/substrings/chars/regExp.    

## Intro

The most relevant usage is looking for "forbidden" code in Your project. For example, Your team agreed don't use `padding` or `margin` in Your *CSS*/*Scss* files, but someone still use it. Beria will scan Your project and will find this "forbidden" content. The most usefull usage with a pre-commit *git* hooks.

## Quick start

 * install package using `npm i @beria` or `yarn @beria -D`
 * create `beria.conf.json` config file inside root directory

## Config file examples

<details>
    <summary>Simple config example</summary>
    <pre>
    {
        "include": [
            {
                "folder": "styles",
                "fileExtention": "scss",
                "targets": [
                    "margin-top",
                    "margin-right"
                ],
            }
        ]
    }
    </pre>
</details>

<details>
    <summary>Advanced config example</summary>
    <pre>
    {
        "include": [
            {
                "folder": "styles",
                "fileExtention": "scss",
                "targets": [
                    "margin-top",
                    "margin-right"
                ],
                "withRegister": true
            },
            {
                "folder": "src",
                "fileExtention": "ts",
                "targets": [ "zalupa" ],
                "withRegister": true
            },
        ],
        "onlyWarning": true
    }
    </pre>
</details>

## Config options

* **include** (type: `object`, required)

  Array of objects for searching forbidden substrings/patterns.    

    * 

* **onlyWarning** (type: `boolean`, default: `false`)

  By default, process exits with error status code if forbidden targets were founded. `onlyWarning: true` will disable this behavior. -->
