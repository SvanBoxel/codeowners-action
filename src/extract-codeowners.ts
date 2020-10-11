import {CodeOwnersInfo} from '../types/codeowners'
import {getFileContents} from './utils'

const codeowners_re = new RegExp('^[^#](.*)$', 'mg')

async function extractCodeOwners(path: string): Promise<CodeOwnersInfo> {
  const contents = await getFileContents(path)
  const lines: RegExpMatchArray | null = contents.match(codeowners_re)
  if (!lines) return {}
  return lines.reduce((acc: CodeOwnersInfo, cur: string) => {
    const [key, value] = cur.split(/(?<=^\S+)\s/)
    if (!key || !value) return acc
    acc[key] = value.split(/ /).filter(Boolean)
    return acc
  }, {})
}

export default extractCodeOwners
