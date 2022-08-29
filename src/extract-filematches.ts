import ignore from 'ignore'
import {CodeOwnersInfo} from '../types/codeowners'
import {FileMatchInfo} from '../types/filematches'

function extractFileMatches(
  files: string[],
  owners_info: CodeOwnersInfo,
  includeNoOwners: boolean
): FileMatchInfo {
  return files.reduce((acc: FileMatchInfo, cur: string) => {
    const clean_path = cur.replace('./', '')
    const rule_match =
      Object.keys(owners_info)
        .reverse()
        .find(owner => ignore().add(owner).ignores(clean_path)) || null
    if (!rule_match && !includeNoOwners) return acc
    const owners = rule_match ? owners_info[rule_match] : []
    acc[cur] = {rule_match, owners}
    return acc
  }, {})
}

export default extractFileMatches
