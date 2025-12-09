[**henkan**](../README.md)

***

[henkan](../README.md) / synthesizeSpeech

# Function: synthesizeSpeech()

> **synthesizeSpeech**(`client`, `input`, `options`): `Promise`\<`Buffer`\<`ArrayBuffer`\> \| `null`\>

Defined in: [utils.ts:1992](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/utils.ts#L1992)

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
