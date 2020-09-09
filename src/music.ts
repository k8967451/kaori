import { help, leave, ping, play, prefix, queue, remove, search, skip, uptime, volume } from './commands'
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
  'uptime': uptime,
  'volume': volume
}

const index = async (msg, client) => {
  for (const [regexp, command] of Object.entries(commands)) {
    if (msg.content.match(RegExp(regexp, 'i'))) {
      await command(msg, embed(msg), data, client)
      return
    }
  }
  if (msg.content.match(/(http(s)?:\/\/)?(www.)?youtu(be|.be)?(\.com)?\/.+/gi)) play(msg, embed(msg), data)
  else search(msg, embed(msg), data)
}

export default index
