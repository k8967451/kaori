import fs from 'fs'

const load = () => {
  try {
    return JSON.parse(fs.readFileSync(`./data/servers.json`).toString())
  } catch {
    return {}
  }
}

export default load
