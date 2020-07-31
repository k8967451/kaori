import fs from 'fs'

const save = (info) => {
  try {
    fs.writeFileSync(`./data/servers.json`, JSON.stringify(info))
  } catch (err) {
    if (err.code === 'ENOENT') {
      fs.mkdirSync('./data')
      fs.writeFileSync(`./data/servers.json`, JSON.stringify(info))
    }
  }
}

export default save
