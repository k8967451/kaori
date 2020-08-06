import { help, leave, play, prefix, queue, remove, skip, volume } from './commands'
import { embed, load, save } from './utils'

const data = load('data/servers.json')

const commands = {
  'help': help,
  'leave': leave,
  'play': play,
  'prefix': prefix,
  'queue': queue,
  'remove': remove,
  'skip': skip,
  'volume': volume
}

const index = async msg => {
  for (const [regexp, command] of Object.entries(commands)) {
    if (msg.content.match(RegExp(regexp, 'i'))) {
      await command(msg, embed(msg), data)
      save('data/servers.json', data)
    }
  }
}

export default index
