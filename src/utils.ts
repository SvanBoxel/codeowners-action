import {spawn} from 'child_process'
import fs from 'fs'

export async function getVersionControlledFiles(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const listVersionControlledFilesCommand = spawn('git', [
      'ls-tree',
      'HEAD',
      '-r',
      '--name-only'
    ])

    listVersionControlledFilesCommand.stdout.on('data', (data: Buffer) => {
      const stdout = data.toString()
      resolve(stdout.split(/\r?\n/).filter(Boolean))
    })

    listVersionControlledFilesCommand.stderr.on('data', (data: Buffer) => {
      if (data != null) reject(data)
      reject(new Error('Unknown error.'))
    })
  })
}

export async function getFileContents(file: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(file, {encoding: 'utf-8'}, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}
