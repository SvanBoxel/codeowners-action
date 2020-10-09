import path from 'path'
import * as core from '@actions/core'
import extractInfo from './extract-info'

async function extractCodeOwnerInfo(): Promise<void> {
  try {
    const filePath: string = path.join(
      process.env.GITHUB_WORKSPACE || './',
      core.getInput('path') || './CODEOWNERS'
    )
    const result = await extractInfo(filePath)
    core.setOutput('codeowners', JSON.stringify(result))
  } catch (error) {
    core.setFailed(error.message)
  }
}

extractCodeOwnerInfo()
