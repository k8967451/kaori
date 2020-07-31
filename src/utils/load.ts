import fs from 'fs'

const load = () => {
  try {
    return JSON.parse(fs.readFileSync(`./data/servers.json`).toString())
  } catch (err) {
    if (err.code === 'ENOENT') {
      return {}
    }
  }
}

export default load
