[**henkan**](../README.md)

***

[henkan](../README.md) / synthesizeSpeech

# Function: synthesizeSpeech()

> **synthesizeSpeech**(`client`, `ssmlText`, `options`): `Promise`\<`null` \| `Buffer`\<`ArrayBuffer`\>\>

Defined in: utils.ts:1331

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

`Promise`\<`null` \| `Buffer`\<`ArrayBuffer`\>\>

A promise resolving with an audio stream buffer or with `null` if the generation failed
