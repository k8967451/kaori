const ytsr = require('ytsr')
const searchData = {}

const search = (msg, embed) => {
  if (!msg.content.replace(/kaori|search| /gi, '')) {
    embed.setDescription('검색 키워드를 입력해줘!')
    msg.channel.send(embed)
    return
  }

  ytsr.getFilters(msg.content.replace(/kaori|search/gi, ''), (err, filters) => {
    if (err) throw err
    let filter = filters.get('Type').find(o => o.name === 'Video')
    ytsr(null, {
      limit: 5,
      nextpageRef: filter.ref,
    }, (err, res) => {
      if (err) throw err
      embed.setTitle('Search!')
        .setDescription(res.query + '에 대한 검색 결과')
      for (const key in res.items) {
        const element = res.items[key]
        embed.addField(`${Number(key) + 1}. ${element.title}`, element.live ? 'Live' : element.duration)
      }

      searchData[msg.channel.id] = res.items
      const iconList = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣']

      const filter = (reaction, user) => {
        return iconList.includes(reaction.emoji.name) && user.id === msg.author.id
      }

      msg.channel.send(embed).then(reply => {
        iconList.forEach(element => {
          reply.react(element)
        })
        reply.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
          .then(collected => {
            const reaction = collected.first()

            for (const key in iconList) {
              const element = iconList[key]
              if (reaction.emoji.name === element) {
                console.log(searchData[msg.channel.id][key])
              }
            }
          })
          .catch(collected => {
            msg.reply('검색 결과를 선택하지 않아 취소했어!')
          })
      })
    })
  })
}

export default search
