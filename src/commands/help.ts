const help = (msg, embed) => {
  embed.setTitle('Kaori')
    .addField('내가 필요하면 \'Kaori\'라고 불러줘', '음악을 재생하려면 \'!play YoutubeURL\'처럼 부탁해줘!\n스킵하려면 \'!skip\' 대기열은 \'!queue\'로 확인할 수 있어!\n봇과 관련한 질문은 [이곳에서](https://discord.com/invite/RxRSgav) 할 수 있어!')
  msg.channel.send(embed)
  msg.channel.send('https://discord.com/invite/RxRSgav')
}

export default help
