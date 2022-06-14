import fetch from 'node-fetch'
import Base64 from 'crypto-js/enc-base64';
import HmacMD5 from 'crypto-js/hmac-md5';
import { v4 as uuidv4 } from 'uuid';
import { voiceReader } from '../../constant/translators';
import { read } from 'fs';

export const getAudioLink = async (wordInput: string, lang: string): Promise<string> => {
    const reader = voiceReader[lang as keyof typeof voiceReader]
    if(!reader) return ''
    const uuid = uuidv4()
    const timestamp = new Date().getTime().toString()
    const header = {
        'authority': 'papago.naver.com',
        'accept': 'application/json',
        'accept-language': 'en',
        'authorization': `${getAuthorization(uuid, timestamp)}`,
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'device-type': 'pc',
        'origin': 'https://papago.naver.com',
        'referer': 'https://papago.naver.com/',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'timestamp': timestamp,
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
        'x-apigw-partnerid': 'papago'
    }

    const response = await fetch("https://papago.naver.com/apis/tts/makeID", {
        method: "POST",
        headers: header,
        body: `alpha=0&pitch=0&speaker=${reader}&speed=0&text=${encodeURIComponent(wordInput)}`
    })

    const rawResult = await response.json();
    return 'https://papago.naver.com/apis/tts/' + rawResult['id']
}

const getAuthorization = (uuid: string, timestamp: string) => {
    return "PPG " + uuid + ":" + Base64.stringify(HmacMD5(uuid + "\n" + "https://papago.naver.com/apis/tts/makeID" + "\n" + timestamp, "v1.6.8_ce8d6d6570"))
}