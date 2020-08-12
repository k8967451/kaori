const ytsr = require('ytsr')

const search = (msg, embed, data) => {
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
      msg.channel.send(embed)
    })
  })
}

export default search
