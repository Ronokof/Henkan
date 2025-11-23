[**henkan**](../README.md)

***

[henkan](../README.md) / synthesizeSpeech

# Function: synthesizeSpeech()

> **synthesizeSpeech**(`ssmlText`, `apiKey`, `options`): `Promise`\<`Buffer`\<`ArrayBuffer`\>\>

Defined in: [utils.ts:1570](https://github.com/Ronokof/Henkan/blob/6facaf3dde9a0beaafc6e67b84cf19815a6bcea6/src/utils.ts#L1570)

Synthesizes text to speech audio using \[TTSFree.com\](https://ttsfree.com/).

## Parameters

### ssmlText

`string`

The text to be spoken, in SSML format

### apiKey

`string`

### options

Other speech generation settings

#### voiceID

`string`

#### voicePitch?

`number` \| `"x-high"` \| `"high"` \| `"default"` \| `"low"` \| `"x-low"`

#### voiceService

`"servicebin"` \| `"servicegoo"`

#### voiceSpeed?

`"0"` \| `"1"` \| `"2"` \| `"3"` \| `"-3"` \| `"-2"` \| `"-1"`

## Returns

`Promise`\<`Buffer`\<`ArrayBuffer`\>\>

A promise resolving with a MP3 audio stream buffer
