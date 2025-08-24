import './rubiks-element.ts'

setTimeout(async () => {
	// @ts-ignore
	const cube = window.cube as RubiksElement
	// await cube.sequence(
	// 	[Rotation.R, Rotation.U, Rotation.Rprime, Rotation.Uprime],
	// 	{speed: 1},
	// )
	console.log('finished')
}, 500)
