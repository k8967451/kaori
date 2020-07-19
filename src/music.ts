import embed from './embed'
import { leave, play, queue, remove, skip, volume } from './commands'

const data = {}

const commands = {
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
