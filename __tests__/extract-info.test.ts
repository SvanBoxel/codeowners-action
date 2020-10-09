import extractInfo from '../src/extract-info'

test('should return object if valid path is given', async () => {
  expect(await extractInfo(`${__dirname}/CODEOWNERS`)).toMatchObject({
    'dist/index.js': ['@foo-bot'],
    'lib/*': ['@hubot'],
    'src/main.ts': ['@hubot', '@svanboxel', '@foo-bot']
  })
})

test('should throw error if invalid path is given', async () => {
  try {
    await extractInfo(`invalid`)
  } catch (e) {
    expect(e.code).toEqual('ENOENT');
  }
})
