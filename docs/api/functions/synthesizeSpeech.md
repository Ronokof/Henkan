[**henkan**](../README.md)

***

[henkan](../README.md) / synthesizeSpeech

# Function: synthesizeSpeech()

> **synthesizeSpeech**(`client`, `input`, `options`): `Promise`\<`Buffer`\<`ArrayBuffer`\> \| `null`\>

Defined in: [utils.ts:1455](https://github.com/Ronokof/Henkan/blob/b6db5e7fec28444596a47dc5b282a83bd96b58ce/src/utils.ts#L1455)

Synthesizes text to speech audio using \[Amazon Polly\](https://aws.amazon.com/polly/).

## Parameters

### client

`PollyClient`

An Amazon Polly Client instance

### input

`string`

The input in SSML format or plain text (adjust `TextType` property in `options`)

### options

`Omit`\<`SynthesizeSpeechCommandInput`, `"Text"`\>

Speech generation settings

## Returns

`Promise`\<`Buffer`\<`ArrayBuffer`\> \| `null`\>

A promise resolving with an audio stream buffer or with `null` if the generation failed
