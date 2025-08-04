import {Rotation} from './objects.js'
import {type RubiksElement} from './rubiks-element.js'
import './rubiks-element.ts'

setTimeout(async () => {
	// @ts-ignore
	const cube = window.cube as RubiksElement
	await cube.sequence([
		Rotation.R,
		Rotation.U,
		Rotation.Rprime,
		Rotation.Uprime,
	])
	console.log('finished')
}, 500)
