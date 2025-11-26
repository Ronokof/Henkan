[**henkan**](../README.md)

***

[henkan](../README.md) / synthesizeSpeech

# Function: synthesizeSpeech()

> **synthesizeSpeech**(`client`, `input`, `options`): `Promise`\<`Buffer`\<`ArrayBuffer`\> \| `null`\>

Defined in: [utils.ts:1485](https://github.com/Ronokof/Henkan/blob/023926521f50f475b03a207d5b9f30d7c4f14c62/src/utils.ts#L1485)

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
