import fetch from 'node-fetch'
import Base64 from 'crypto-js/enc-base64';
import HmacMD5 from 'crypto-js/hmac-md5';
import { v4 as uuidv4 } from 'uuid';
import { TranslateResult } from './translate-result';

export const translate = async (wordInput: string, targetLang: string): Promise<TranslateResult> => {
    const langCode = await detectLang(wordInput)
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
    const translateResponse = await fetch("https://papago.naver.com/apis/n2mt/translate", {
        method: "POST",
        headers: header,
        body: `deviceId=${uuid}&locale=en&dict=true&dictDisplay=30&honorific=false&instant=false&paging=false&source=${langCode}&target=${targetLang}&text=${encodeURIComponent(wordInput)}`
    })

    const rawResult = await translateResponse.json();
    console.log(rawResult)
    return {
        raw: rawResult,
        formattedText: formatResult(wordInput, rawResult)
    }
}

export const formatResult = (wordInput: string, result: any): string => {
    const dicts: Array<string> = []
    dicts.push(`<b><u>In:</u></b> ${wordInput}`)
    dicts.push(`<b><u>Out:</u>${result.translatedText}</b>\n`)
    dicts.push(...formatMeaningPart(result.dict))
    return dicts.join('\n')
}

export const formatMeaningPart = (input: any): Array<string> => {
    const dicts: Array<string> = []
    input?.items.forEach((item: any) => {
        let title = `\n${'\u{270D}'} <a href="${item.url}">${item.entry}</a>`
        item.phoneticSigns?.forEach((phoneticSign: any) => {
            title = title + ` <b>|</b> ${phoneticSign.type} <i>[${phoneticSign.sign}]</i>`
        })
        dicts.push(title)
        item.pos?.forEach((pos: any) => {
            if (pos.type) dicts.push(`<u>${pos.type}</u>`)
            pos.meanings?.forEach((meaning: any, index: number) => {
                const posMeaning = index + 1
                dicts.push(posMeaning + '. ' + meaning.meaning)
                meaning.examples.forEach((example: any) => {
                    dicts.push(example.text)
                    dicts.push(example.translatedText)
                })
            })
        })
    });
    return dicts
}

const detectLang = async (wordInput: string): Promise<string> => {
    const detectLangResponse = await fetch("https://openapi.naver.com/v1/papago/detectLangs", {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Naver-Client-Id': process.env['PAPAGO_CLIENT_ID'] ?? '',
            'X-Naver-Client-Secret': process.env['PAPAGO_CLIENT_SECRET'] ?? '',
        },
        body: "query=" + wordInput
    })
    const detectLangResult = await detectLangResponse.json() as any
    return detectLangResult.langCode
}

const getAuthorization = (uuid: string, timestamp: string) => {
    return "PPG " + uuid + ":" + Base64.stringify(HmacMD5(uuid + "\n" + "https://papago.naver.com/apis/n2mt/translate" + "\n" + timestamp, process.env['PAPAGO_SITE_CLIENT_SECRET']??''))
}