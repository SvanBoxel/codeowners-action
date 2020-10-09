import * as core from '@actions/core'
import extractInfo from './extract-info'

async function extractCodeOwnerInfo(): Promise<void> {
  try {
    const path: string = core.getInput('path') || 'CODEOWNERS'
    const result = extractInfo(`${process.env.GITHUB_WORKSPACE}/${path}`)
    core.setOutput('codeowners', JSON.stringify(result))
  } catch (error) {
    core.setFailed(error.message)
  }
}

extractCodeOwnerInfo()
