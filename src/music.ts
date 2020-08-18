import { help, leave, ping, play, prefix, queue, remove, search, skip, volume } from './commands'
import { embed } from './utils'

const data = {}

const commands = {
  'help': help,
  'leave': leave,
  'ping': ping,
  'play': play,
  'prefix': prefix,
  'queue': queue,
  'remove': remove,
  'search': search,
  'skip': skip,
  'volume': volume
}

const index = async (msg, client) => {
  for (const [regexp, command] of Object.entries(commands)) {
    if (msg.content.match(RegExp(regexp, 'i'))) {
      await command(msg, embed(msg), data, client)
    }
  }
}

export default index
