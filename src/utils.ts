import {exec} from 'child_process'
import fs from 'fs'

const listVersionControlledFilesCommand = 'git ls-tree HEAD -r --name-only'

export async function getVersionControlledFiles(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    exec(listVersionControlledFilesCommand,  {maxBuffer: 1024 * 10000}, (err, stdout, stderr) => {
      if (err != null) reject(err)
      if (typeof stderr != 'string') reject(stderr)
      resolve(stdout.split(/\r?\n/).filter(Boolean))
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
