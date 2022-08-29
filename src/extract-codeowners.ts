import {CodeOwnersInfo} from '../types/codeowners'
import {getFileContents} from './utils'

async function extractCodeOwners(path: string): Promise<CodeOwnersInfo> {
  const contents = await getFileContents(path)
  if (!contents) return {}
  return contents
    .split(/\s*$\s*/m)
    .filter(line => !line.startsWith('#'))
    .reduce((acc: CodeOwnersInfo, cur: string) => {
      const values = cur.split(/\s+/)
      const key = values.shift()

      if (key) {
        acc[key] = values
      }
      return acc
    }, {})
}

export default extractCodeOwners
