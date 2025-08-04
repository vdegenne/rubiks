import {
	define as defineWebCubeElement,
	type LayerRotationOptions,
	type WebCube,
} from '@web-cube/web-cube'
import {css, html, LitElement, PropertyValues} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import {type Rotation} from './objects.js'

defineWebCubeElement()

interface GlobalMotionOptions {
	speed: number
}

interface MotionOptions extends GlobalMotionOptions {
	prime: boolean
}

const DEFAULT_GLOBAL_MOTION_OPTIONS: GlobalMotionOptions = {
	speed: 500,
}
const DEFAULT_MOTION_OPTIONS: MotionOptions = {
	...DEFAULT_GLOBAL_MOTION_OPTIONS,
	prime: false,
}

@customElement('rubiks-element')
export class RubiksElement extends LitElement {
	/**
	 * Use this property to disable keyboard listeners
	 *
	 * @default true
	 */
	@property({type: Boolean}) listening = true

	get #cube() {
		return this.shadowRoot?.querySelector('web-cube') as WebCube
	}

	render() {
		return html`<!-- -->
			<web-cube speed="100"></web-cube>
			<!-- -->`
	}

	protected updated(_changedProperties: PropertyValues<this>): void {
		if (_changedProperties.has('listening')) {
			if (this.listening === true) {
				this.#registerListeners()
			} else if (this.listening === false) {
				this.#unregisterListeners()
			}
		}
	}

	#listenersRegistered = false
	#pressedKeys = new Set()
	#registerListeners() {
		if (this.#listenersRegistered) {
			return
		}
		window.addEventListener('keydown', this.#handleKeyboardEvents)
		window.addEventListener('keyup', this.#onKeyUp)
		this.#listenersRegistered = true
	}
	#unregisterListeners() {
		if (!this.#listenersRegistered) {
			return
		}
		window.removeEventListener('keydown', this.#handleKeyboardEvents)
		window.removeEventListener('keyup', this.#onKeyUp)
		this.#listenersRegistered = false
	}

	#onKeyUp = (event: KeyboardEvent) => {
		this.#pressedKeys.delete(event.code)
	}
	#handleKeyboardEvents = (event: KeyboardEvent) => {
		if (!this.isConnected || this.#pressedKeys.has(event.code)) {
			return
		}
		this.#pressedKeys.add(event.code)
		switch (event.key) {
			case 'u':
			case 'U':
				this.U({prime: event.shiftKey})
				break
			case 'd':
			case 'D':
				this.D({prime: event.shiftKey})
				break
			case 'r':
			case 'R':
				this.R({prime: event.shiftKey})
				break
			case 'l':
			case 'L':
				this.L({prime: event.shiftKey})
				break
			case 'f':
			case 'F':
				this.F({prime: event.shiftKey})
				break
			case 'b':
			case 'B':
				this.B({prime: event.shiftKey})
				break
			case 'x':
			case 'X':
				this.x({prime: event.shiftKey})
				break
			case 'y':
			case 'Y':
				this.y({prime: event.shiftKey})
				break
			case 'z':
			case 'Z':
				this.z({prime: event.shiftKey})
				break
			case 'm':
			case 'M':
				this.M({prime: event.shiftKey})
				break
			case 'e':
			case 'E':
				this.E({prime: event.shiftKey})
				break
			case 's':
			case 'S':
				this.S({prime: event.shiftKey})
				break
		}
	}

	#intersectMotionOptions(options?: Partial<MotionOptions>): MotionOptions {
		return {...DEFAULT_MOTION_OPTIONS, ...(options ?? {})}
	}
	#enqueueMethod(method: () => Promise<void>) {
		return new Promise<void>((resolve, reject) => {
			this.#enqueueMove(() => method().then(resolve).catch(reject))
		})
	}

	U(options?: Partial<MotionOptions>): Promise<void> {
		const _o = this.#intersectMotionOptions(options)
		return this.#enqueueMethod(() =>
			this.#cube.rotateLayer({
				axis: 'y',
				layer: 0,
				angle: 90,
				backwards: !_o.prime,
				..._o,
			}),
		)
	}

	D(options?: Partial<MotionOptions>): Promise<void> {
		const _o = this.#intersectMotionOptions(options)
		return this.#enqueueMethod(() =>
			this.#cube.rotateLayer({
				axis: 'y',
				layer: 2,
				angle: 90,
				backwards: _o.prime,
				..._o,
			}),
		)
	}

	R(options?: Partial<MotionOptions>): Promise<void> {
		const _o = this.#intersectMotionOptions(options)
		return this.#enqueueMethod(() =>
			this.#cube.rotateLayer({
				axis: 'z',
				layer: 2,
				angle: 90,
				backwards: _o.prime,
				..._o,
			}),
		)
	}

	L(options?: Partial<MotionOptions>): Promise<void> {
		const _o = this.#intersectMotionOptions(options)
		return this.#enqueueMethod(() =>
			this.#cube.rotateLayer({
				axis: 'z',
				layer: 0,
				angle: 90,
				backwards: !_o.prime,
				..._o,
			}),
		)
	}

	F(options?: Partial<MotionOptions>): Promise<void> {
		const _o = this.#intersectMotionOptions(options)
		return this.#enqueueMethod(() =>
			this.#cube.rotateLayer({
				axis: 'x',
				layer: 0,
				angle: 90,
				backwards: !_o.prime,
				..._o,
			}),
		)
	}

	B(options?: Partial<MotionOptions>): Promise<void> {
		const _o = this.#intersectMotionOptions(options)
		return this.#enqueueMethod(() =>
			this.#cube.rotateLayer({
				axis: 'x',
				layer: 2,
				angle: 90,
				backwards: _o.prime,
				..._o,
			}),
		)
	}

	M(options?: Partial<MotionOptions>): Promise<void> {
		const _o = this.#intersectMotionOptions(options)
		return this.#enqueueMethod(() =>
			this.#cube.rotateLayer({
				axis: 'z',
				layer: 1,
				angle: 90,
				backwards: !_o.prime,
				..._o,
			}),
		)
	}

	E(options?: Partial<MotionOptions>): Promise<void> {
		const _o = this.#intersectMotionOptions(options)
		return this.#enqueueMethod(() =>
			this.#cube.rotateLayer({
				axis: 'y',
				layer: 1,
				angle: 90,
				backwards: _o.prime,
				..._o,
			}),
		)
	}

	S(options?: Partial<MotionOptions>): Promise<void> {
		const _o = this.#intersectMotionOptions(options)
		return this.#enqueueMethod(() =>
			this.#cube.rotateLayer({
				axis: 'x',
				layer: 1,
				angle: 90,
				backwards: !_o.prime,
				..._o,
			}),
		)
	}

	x(options?: Partial<MotionOptions>): Promise<void> {
		const _o = this.#intersectMotionOptions(options)
		return this.#enqueueMethod(() =>
			this.#cube.rotateCube({
				axis: 'z',
				angle: 90,
				backwards: _o.prime,
				..._o,
			}),
		)
	}

	y(options?: Partial<MotionOptions>): Promise<void> {
		const _o = this.#intersectMotionOptions(options)
		return this.#enqueueMethod(() =>
			this.#cube.rotateCube({
				axis: 'y',
				angle: 90,
				backwards: !_o.prime,
				..._o,
			}),
		)
	}

	z(options?: Partial<MotionOptions>): Promise<void> {
		const _o = this.#intersectMotionOptions(options)
		return this.#enqueueMethod(() =>
			this.#cube.rotateCube({
				axis: 'x',
				angle: 90,
				backwards: !_o.prime,
				..._o,
			}),
		)
	}

	Up(options?: Partial<MotionOptions>) {
		return this.U({...options, prime: true})
	}
	Dp(options?: Partial<MotionOptions>) {
		return this.D({...options, prime: true})
	}
	Rp(options?: Partial<MotionOptions>) {
		return this.R({...options, prime: true})
	}
	Lp(options?: Partial<MotionOptions>) {
		return this.L({...options, prime: true})
	}
	Fp(options?: Partial<MotionOptions>) {
		return this.F({...options, prime: true})
	}
	Bp(options?: Partial<MotionOptions>) {
		return this.B({...options, prime: true})
	}
	Mp(options?: Partial<MotionOptions>) {
		return this.M({...options, prime: true})
	}
	Ep(options?: Partial<MotionOptions>) {
		return this.E({...options, prime: true})
	}
	Sp(options?: Partial<MotionOptions>) {
		return this.S({...options, prime: true})
	}
	xp(options?: Partial<MotionOptions>) {
		return this.x({...options, prime: true})
	}
	yp(options?: Partial<MotionOptions>) {
		return this.y({...options, prime: true})
	}
	zp(options?: Partial<MotionOptions>) {
		return this.z({...options, prime: true})
	}

	#queue: (() => Promise<void>)[] = []
	#processing = false

	#enqueueMove(moveFn: () => Promise<void>) {
		this.#queue.push(moveFn)
		if (!this.#processing) this.#processQueue()
	}

	async #processQueue() {
		this.#processing = true
		while (this.#queue.length > 0) {
			const task = this.#queue.shift()
			if (task) {
				try {
					await task()
				} catch (e) {
					console.error('Move failed:', e)
				}
			}
		}
		this.#processing = false
	}

	async sequence(
		rotations: Rotation[],
		options?: GlobalMotionOptions,
	): Promise<void> {
		for (const rotation of rotations) {
			await this[rotation](options)
		}
	}

	static styles = css`
		:host {
			display: block;
			width: 100%;
			height: 100%;
		}
	`
}
