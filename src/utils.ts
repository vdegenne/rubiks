export enum Rotation {
	U = 'U',
	Uprime = 'Up',
	Uw = 'Uw',
	D = 'D',
	Dprime = 'Dp',
	Dw = 'Dw',
	R = 'R',
	Rprime = 'Rp',
	Rw = 'Rw',
	L = 'L',
	Lprime = 'Lp',
	Lw = 'Lw',
	F = 'F',
	Fprime = 'Fp',
	Fw = 'Fw',
	B = 'B',
	Bprime = 'Bp',
	Bw = 'Bw',
	M = 'M',
	Mprime = 'Mp',
	E = 'E',
	Eprime = 'Ep',
	S = 'S',
	Sprime = 'Sp',
	x = 'x',
	xprime = 'xp',
	y = 'y',
	yprime = 'yp',
	z = 'z',
	zprime = 'zp',
}

export const rotationsMap = {
	U: Rotation.U,
	"U'": Rotation.Uprime,
	Uw: Rotation.Uw,
	u: Rotation.Uw,

	D: Rotation.D,
	"D'": Rotation.Dprime,
	Dw: Rotation.Dw,
	d: Rotation.Dw,

	R: Rotation.R,
	"R'": Rotation.Rprime,
	Rw: Rotation.Rw,
	r: Rotation.Rw,

	L: Rotation.L,
	"L'": Rotation.Lprime,
	Lw: Rotation.Lw,
	l: Rotation.Lw,

	F: Rotation.F,
	"F'": Rotation.Fprime,
	Fw: Rotation.Fw,
	f: Rotation.Fw,

	B: Rotation.B,
	"B'": Rotation.Bprime,
	Bw: Rotation.Bw,
	b: Rotation.Bw,

	M: Rotation.M,
	"M'": Rotation.Mprime,

	E: Rotation.E,
	"E'": Rotation.Eprime,

	S: Rotation.S,
	"S'": Rotation.Sprime,

	x: Rotation.x,
	"x'": Rotation.xprime,

	y: Rotation.y,
	"y'": Rotation.yprime,

	z: Rotation.z,
	"z'": Rotation.zprime,
}

/**
 * Convert a moves line to enum values array, e.g.
 * U' R2 -> [Rotation.Uprime, Rotation.R, Rotation.R]
 */
export function movesLineToEnumValues(movesLine: string): Rotation[] {
	const moves = movesLine.trim().replace(/\(|\)/g, '').split(/\s+/)
	const result: Rotation[] = []

	for (const move of moves) {
		const normalized = move.replace(/’/g, "'") // handle curly quotes

		// Match forms like R2, R2', R', R, etc.
		const match = normalized.match(/^([A-Za-z]+)(2)?('?)/)
		if (!match) {
			throw new Error(`Invalid move: ${move}`)
		}

		let [_, base, double, prime] = match
		if (base === undefined) {
			throw new Error(`Invalid move base: ${move}`)
		}

		let key = base
		if (prime) key += "'"

		const rotation = rotationsMap[key as keyof typeof rotationsMap]
		if (!rotation) {
			throw new Error(`Unknown rotation: ${key}`)
		}

		const count = double ? 2 : 1
		for (let i = 0; i < count; i++) {
			result.push(rotation)
		}
	}

	return result
}

const rotationToKeyMap: Partial<Record<Rotation, string>> = (() => {
	const map: Partial<Record<Rotation, string>> = {}
	for (const key in rotationsMap) {
		const val = rotationsMap[key as keyof typeof rotationsMap]
		if (!(val in map)) map[val] = key // keep first occurrence
	}
	return map
})()

/**
 * Convert enum values array to moves line, e.g.
 * [Rotation.Uprime, Rotation.R] -> U' R
 */
export function enumValuesToMovesLine(values: Rotation[]): string {
	return values
		.map((val) => {
			const key = rotationToKeyMap[val]
			if (!key) throw new Error(`Unknown Rotation value: ${val}`)
			return key
		})
		.join(' ')
}

/**
 * e.g. "R' U L" -> "R U' L'"
 */
export function invertMovesLine(movesLine: string): string {
	const chunks = movesLine.match(/\(.*?\)|\S+/g)
	if (!chunks) return ''

	return chunks
		.reverse()
		.map((chunk) => {
			if (chunk.startsWith('(') && chunk.endsWith(')')) {
				const inner = chunk.slice(1, -1).trim()
				const inverted = inner
					.split(/\s+/)
					.reverse()
					.map((move) => (move.endsWith("'") ? move.slice(0, -1) : move + "'"))
					.join(' ')
				return `(${inverted})`
			}
			return chunk.endsWith("'") ? chunk.slice(0, -1) : chunk + "'"
		})
		.join(' ')
}
