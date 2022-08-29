import path from 'path'
import fs from 'fs'
import * as core from '@actions/core'
import extractCodeOwners from './extract-codeowners'
import extractFileMatches from './extract-filematches'
import {getVersionControlledFiles} from './utils'

const filepath = './codeowner-information.json'

async function extractCodeOwnerInfo(
  codeownerPath: string,
  fileMatchInfo: boolean,
  includeNoOwners: boolean
): Promise<void> {
  try {
    let results = {}
    const filePath: string = path.join(
      process.env.GITHUB_WORKSPACE || './',
      codeownerPath
    )
    const codeownerInfo = await extractCodeOwners(filePath)
    core.setOutput('codeowners', JSON.stringify(codeownerInfo))
    results = {codeownerInfo}

    if (fileMatchInfo) {
      const versionControlledFiles = await getVersionControlledFiles()
      const fileMatches = extractFileMatches(
        versionControlledFiles,
        codeownerInfo,
        includeNoOwners
      )

      core.setOutput('filematches', JSON.stringify(fileMatches))
      results = {codeownerInfo, fileMatches}
    }

    fs.writeFile(filepath, JSON.stringify(results), err => {
      if (err)
        core.warning(
          `error writing results to file: ${err}. Action output is still available`
        )
    })
  } catch (error) {
    core.setFailed(error.message)
  }
}

const codeownerPath = core.getInput('path') || './CODEOWNERS'
const fileMatchInfo = core.getBooleanInput('file_match_info')
const includeNoOwners = core.getBooleanInput('include_no_owners')

extractCodeOwnerInfo(codeownerPath, fileMatchInfo, includeNoOwners)
