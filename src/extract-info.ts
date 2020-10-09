import fs from 'fs'

export type CodeOwnersInfo = {
  [key: string]: string[]
}

const codeowners_re = new RegExp('^[^#](.*)$', 'mg')

async function getFileContents(file: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(file, {encoding: 'utf-8'}, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

async function extractCodeOwnerInfo(path: string): Promise<CodeOwnersInfo> {
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

export default extractCodeOwnerInfo
