import { help, leave, play, queue, remove, skip, volume } from './commands'
import { embed } from './utils'

const data = {}

const commands = {
  'help': help,
  'leave': leave,
  'play': play,
  'queue': queue,
  'remove': remove,
  'skip': skip,
  'volume': volume
}

const index = async msg => {
  for (const [regexp, command] of Object.entries(commands)) {
    if (msg.content.match(RegExp(regexp, 'i'))) {
      command(msg, embed(msg), data)
    }
  }
}

export default index
