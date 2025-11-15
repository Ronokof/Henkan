[**henkan**](../README.md)

***

[henkan](../README.md) / synthesizeSpeech

# Function: synthesizeSpeech()

> **synthesizeSpeech**(`client`, `ssmlText`, `options`): `Promise`\<`Buffer`\<`ArrayBuffer`\> \| `null`\>

Defined in: [utils.ts:1585](https://github.com/Ronokof/Henkan/blob/be14eff8947ae967718945fe57bd90c10ebced4a/src/utils.ts#L1585)

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
