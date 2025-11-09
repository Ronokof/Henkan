[**henkan**](../README.md)

***

[henkan](../README.md) / synthesizeSpeech

# Function: synthesizeSpeech()

> **synthesizeSpeech**(`client`, `ssmlText`, `options`): `Promise`\<`Buffer`\<`ArrayBuffer`\> \| `null`\>

Defined in: [utils.ts:1556](https://github.com/Ronokof/Henkan/blob/a0628d36c81810a27b826ff1126891d82f33661f/src/utils.ts#L1556)

Synthesizes text to speech audio using \[Amazon Polly\](https://aws.amazon.com/polly/).

## Parameters

### client

`PollyClient`

An Amazon Polly Client instance

### ssmlText

`string`

The text to be spoken, in SSML format

### options

`Omit`\<`SynthesizeSpeechCommandInput`, `"Text"` \| `"TextType"`\>

Other speech generation settings

## Returns

`Promise`\<`Buffer`\<`ArrayBuffer`\> \| `null`\>

A promise resolving with an audio stream buffer or with `null` if the generation failed
