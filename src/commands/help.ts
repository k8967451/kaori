const help = (msg, embed) => {
  embed.setTitle('Help!')
    .setDescription('Developer <@457459470424080384>')
    .addField('kaori <URL or 검색어>', '유튜브 URL 재생 또는 콘텐츠 검색', true)
    .addField('kaori play <URL>', '유튜브 URL 재생', true)
    .addField('kaori search <검색어>', '유튜브 콘텐츠 검색', true)
    .addField('kaori skip', '재생중인 콘텐츠 넘기기', true)
    .addField('kaori queue', '재생 대기열 확인', true)
    .addField('kaori remove <숫자>', '대기열에서 삭제', true)
    .addField('kaori volume <1~100>', '음량을 변경', true)
    .addField('kaori leave', '음성채널에서 내보내기', true)
    .addField('kaori help', '명령어 목록 확인', true)
    .addField('kaori ping', '네트워크 속도 확인', true)
    .addField('kaori prefix <접두사>', '접두사 변경', true)
    .addField('\u200B', '\u200B', true)
  msg.channel.send(embed)
  msg.channel.send('https://discord.com/invite/RxRSgav')
}

export default help
