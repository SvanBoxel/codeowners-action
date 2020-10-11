import path from 'path'
import * as core from '@actions/core'
import extractCodeOwners from './extract-codeowners'
import extractFileMatches from './extract-filematches'
import {getVersionControlledFiles} from './utils'

async function extractCodeOwnerInfo(
  codeownerPath: string,
  fileMatchInfo: boolean
): Promise<void> {
  try {
    const filePath: string = path.join(
      process.env.GITHUB_WORKSPACE || './',
      codeownerPath
    )
    const codeownerInfo = await extractCodeOwners(filePath)
    core.setOutput('codeowners', JSON.stringify(codeownerInfo))

    if (fileMatchInfo) {
      const versionControlledFiles = await getVersionControlledFiles()
      const fileMatches = extractFileMatches(
        versionControlledFiles,
        codeownerInfo
      )
      core.setOutput('filematches', JSON.stringify(fileMatches))
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

const codeownerPath = core.getInput('path') || './CODEOWNERS'
const fileMatchInfo = core.getInput('file_match_info').toLowerCase() === 'true'

extractCodeOwnerInfo(codeownerPath, fileMatchInfo)
