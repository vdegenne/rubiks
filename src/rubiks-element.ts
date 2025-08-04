import {define as defineWebCubeElement} from '@web-cube/web-cube'
import {css, html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'

defineWebCubeElement()

@customElement('rubiks-element')
export class RubiksElement extends LitElement {
	static styles = css`
		:host {
			display: block;
			width: 500px;
			height: 500px;
		}
	`
	render() {
		return html`<!-- -->
			<web-cube></web-cube>
			<!-- -->`
	}
}
