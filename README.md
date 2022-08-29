# CODEOWNERS Action
Use this action to extract your CODEOWNER file information and check how individual files match CODEOWNER rules. It parses all the information and exports it as JSON. This output is available via the `steps` output context. 

## Usage
This Actions outputs CODEOWNER file information, and optionally how individual files match specific rules.

### Basic mode 
In basic mode (default) it will only extract the information that can be found in the CODEOWNERS file and returns this information as an object. Use this Action in basic mode in your Actions workflow as follows:

```yml
- id: codeowner
  uses: SvanBoxel/codeowners-action@v1
- run: |
    echo ${{ steps.codeowners.outputs.codeowners }};
```

Example `codeowners` object:
```json
{
  "dist/index.js": ["@foo-bot"],
  "lib/*": ["@hubot"],
  "src/main.ts": ["@hubot", "@svanboxel", "@foo-bot"]
}
```

### File match option
When enabled, this Action checks how every file in your repository matches a specific CODEOWNER rule. The order of the CODEOWNERS rules defines (last matching pattern takes the most precedence), which rule matches which file.

```yml
- id: codeowner
  uses: SvanBoxel/codeowners-action@v1
  with: 
    file_match_info: 'true'
```

This will output the following (example) JSON format to the `filematches` output variable:

```json
{
  "./bar/foo.cp": { 
    "rule_match": "*", 
    "owners": [ "@test" ] 
  },
  "./lib/foo/bar.whop": { 
    "rule_match": "lib/foo/", 
    "owners": [ "@not-hubot" ] 
  },
  "./src/main.ts": { 
    "rule_match": "src/main.ts",
    "owners": [ "@hubot", "@svanboxel", "@foo-bot" ] 
  } 
}
```

In the situation you want consume the above results directly from a file you can read `./codeowner-information.json` from the root of the repository. The format of this file follows the following format:

```json
{
  "codeownerInfo": {
    "dist/index.js": ["@foo-bot"],
    ...
  },
  "fileMatches": {
    "./bar/foo.cp": { 
      "rule_match": "*", 
      "owners": [ "@test" ] 
    },
    ...
  }
}
```

#### Include non-owned files
By default, files without an owner will be ignored. Add the `include_no_owners` option to include them in the report

```yml
- id: codeowner
  uses: SvanBoxel/codeowners-action@v1
  with: 
    file_match_info: 'true'
    include_no_owners: 'true'
```

Will produce
```json
{
  "codeownerInfo": {
    "dist/index.js": ["@foo-bot"],
    ...
  },
  "fileMatches": {
    "./bar/foo.cp": { 
      "rule_match": "*", 
      "owners": [ "@test" ] 
    },
    "./orphan-file.txt": {
      "rule_match": null,
      "owners": [ ]
    },
    ...
  }
}
```

### Custom path
If your CODEOWNERS file isn't in the root of your repository, but for instead in the `.github` directory, you can change the path by using the path parameter:

```yml
- id: codeowner
  uses: SvanBoxel/codeowners-action@v1
  with: 
    path: './.github/CODEOWNERS'
```


## Development

Install the dependencies  
```bash
$ npm install
```

Build the typescript and package it for distribution
```bash
$ npm run build && npm run package
```

Run the tests :heavy_check_mark:  
```bash
$ npm test

 PASS  ./index.test.js
  ✓ throws invalid number (3ms)
  ✓ wait 500 ms (504ms)
  ✓ test runs (95ms)

...
```

## Contributing

If you have suggestions for how this GitHub Action could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

## License

[MIT](LICENSE) © 2020 Sebass van Boxel <hello@svboxel.com>
