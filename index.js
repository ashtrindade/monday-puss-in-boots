const rwClient = require('./twitterClient.js')
const CronJob = require('cron').CronJob

const tweet = async () => {
    try {

        // A video which is more than 15MB must be uploaded with 'longmp4'
        const mediaIdVideo = await rwClient.v1.uploadMedia('./media/gato.mp4')
        const mediaIdSubtitles = await rwClient.v1.uploadMedia('./media/gato.srt')

        // Associate subtitles and video
        await rwClient.v1.createMediaSubtitles(mediaIdVideo, [{ language_code: 'pt', display_name: 'Portugues', media_id: mediaIdSubtitles }])

        // Send
        await rwClient.v1.tweet(' ', { media_ids: mediaIdVideo })

    } catch (error) {
        console.log(error)
    }
}

// Cron Job
const job = new CronJob('00 01 10 * * 1', () => {
    try {
        tweet()
        console.log('Tweet sent')
    } catch (err) {
        console.log(err)
    }
   
},null, true,'America/Sao_Paulo')

job.start() 