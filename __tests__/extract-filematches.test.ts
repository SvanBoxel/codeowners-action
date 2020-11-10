import extractFileMatches from '../src/extract-filematches'

const codeOwnersInfo = {
  'dist/index.js': ['@foo-bot'],
  'lib/*': ['@hubot'],
  'src/main.ts': ['@hubot', '@svanboxel', '@foo-bot']
}

const files = ['./lib/foo/bar.whop', './src/main.ts', './bar/foo.cp']

test('should return which rules match a file', async () => {
  expect(await extractFileMatches(files, codeOwnersInfo)).toMatchObject({
    './lib/foo/bar.whop': {
      rule_match: 'lib/*',
      owners: ['@hubot']
    },
    './src/main.ts': {
      rule_match: 'src/main.ts',
      owners: ['@hubot', '@svanboxel', '@foo-bot']
    }
  })
})

test('should give most precendence to last matching pattern', async () => {
  const codeOwnersInfoTwo = {
    '*': ['@test'],
    ...codeOwnersInfo,
    'lib/foo/': ['@not-hubot']
  }

  expect(await extractFileMatches(files, codeOwnersInfoTwo)).toMatchObject({
    './bar/foo.cp': {
      rule_match: '*',
      owners: ['@test']
    },
    './lib/foo/bar.whop': {
      rule_match: 'lib/foo/',
      owners: ['@not-hubot']
    },
    './src/main.ts': {
      rule_match: 'src/main.ts',
      owners: ['@hubot', '@svanboxel', '@foo-bot']
    }
  })
})
