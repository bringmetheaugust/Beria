# Beria 🦅

Витя, получишь пизды, если будешь использовать `margin-top`.    

**npm** package for scanning files and searching content by strings/substrings/chars/regExp.

## Intro

The most relevant usage is looking for "forbidden" text/code in Your project.    
For example, Your team agreed don't use `padding` or `margin` in Your *CSS*/*Scss*/*Sass* files, but someone still uses it. *Beria* will scan Your project and find this "forbidden" content.    
The most practical use with pre-commit *git hooks*.

## Quick start

 * install package using `npm i beria --save-dev` or `yarn beria -D`
 * create `beria.config.json` config file inside root directory
 * run `npx beria`

## Config file examples

<details>
    <summary>Simple config</summary>
    <ul>
        <li>
            Looking for <code>margin-top</code> and <code>margin-right</code> strings in <b>.scss</b> files inside <b>styles</b> folder
        </li>
        <li>
            Package exits with the error if one of these strings was detected
        </li>
    </ul>
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
    <summary>Advanced config</summary>
    <ul>
        <li>
            <div>
                Looking for <code>margin-top</code> and <code>margin-right</code> strings in <b>.scss</b> files inside <b>styles</b> folder.
            <div>
            <div>
                <code>Margin-Top</code> or <code>margiN-Right</code> will'nt be founded cause <code>withRegister</code> option is <b>on</b>.
            </div>
        </li>
        <li>
            <div>
                Also looking for <code>zalupa</code> string in <b>.ts</b> files inside <b>types</b> folder.
            <div>
            <div>
                <code>Zalupa</code> or <code>zAlupA</code> strings will be detected cause <code>withRegister</code> option is <b>off</b>.
            </div>
        </li>
        <li>
            package show all founded cases but doesn't exit with the error cause <code>onlyWarning</code> option is <b>on</b>.
        </li>
    </ul>
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
                "folder": "types",
                "fileExtention": "ts",
                "targets": [ "zalupa" ],
                "withRegister": false
            },
        ],
        "onlyWarning": true
    }
    </pre>
</details>

<!-- ## Config options

* **include** (type: `object`, required)

  Array of objects for searching forbidden substrings/patterns.    

    * 

* **onlyWarning** (type: `boolean`, default: `false`)

  By default, process exits with error status code if forbidden targets were founded. `onlyWarning: true` will disable this behavior. -->

## Options

 ##### You should know that CLI options have higher priority than options from the config file.

 * `--config`    

    By default package looks for default `beria.config.json` config file inside project folder. You can set another path to Your config file. Example: `--config=myfolder/conf.json`

 * `--onlyWarning`

    By default, programm exist with error status if search was successful.
    The option disable this behavior.
