# CODEOWNERS Action
Use this action to extract your CODEOWNER file information. It parses all the information and exports it as JSON. This output is available via the `steps` output context. The output key is `codeowners`

## Usage
Use this Action in your Actions workflow:

```yml
- id: codeowner
  uses: SvanBoxel/codeowners-action@v1
- run: |
    echo ${{ steps.codeowners.outputs.codeowners }};
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
