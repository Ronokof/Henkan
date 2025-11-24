[**henkan**](../README.md)

***

[henkan](../README.md) / synthesizeSpeech

# Function: synthesizeSpeech()

> **synthesizeSpeech**(`textOrSSML`, `apiKey`, `options`): `Promise`\<`Buffer`\<`ArrayBuffer`\>\>

Defined in: [utils.ts:1449](https://github.com/Ronokof/Henkan/blob/509701feced30c3685817fc5852353b86cc93a16/src/utils.ts#L1449)

Synthesizes text to speech audio using \[TTSFree.com\](https://ttsfree.com/).

## Parameters

### textOrSSML

`string`

The text to be spoken or a SSML string

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
