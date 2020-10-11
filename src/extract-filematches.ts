import ignore from 'ignore'
import {CodeOwnersInfo} from '../types/codeowners'
import {FileMatchInfo} from '../types/filematches'

function extractFileMatches(
  files: string[],
  owners_info: CodeOwnersInfo
): FileMatchInfo {
  return files.reduce((acc: FileMatchInfo, cur: string) => {
    const clean_path = cur.replace('./', '')
    const rule_match = Object.keys(owners_info)
      .reverse()
      .find(owner => ignore().add(owner).ignores(clean_path))
    if (!rule_match) return acc
    const owners = owners_info[rule_match]
    acc[cur] = {rule_match, owners}
    return acc
  }, {})
}

export default extractFileMatches
