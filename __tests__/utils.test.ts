import {getVersionControlledFiles} from '../src/utils'

test('getVersionControlledFiles should return an array of strings', async () => {
  let versionControlledFiles = await getVersionControlledFiles()
  expect(Array.isArray(versionControlledFiles)).toBe(true)
  expect(versionControlledFiles.every(entry => typeof entry === 'string')).toBe(
    true
  )
})
