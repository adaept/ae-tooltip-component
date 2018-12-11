class TooltipComponent extends HTMLElement {
    constructor() {
        super();
        this._tooltipHint;
        this._tooltipVisible = false;
        this._tooltipText = "Default value for tooltipText"
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                div {
                    font-weight: normal;
                    background-color: black;
                    color: white;
                    position: absolute;
                    top: 1.5rem;
                    left: 0.75rem;
                    z-index: 10;
                    padding: 0.15rem;
                    border-radius: 3px;
                    box-shadow: 1px 1px 6px rgba(0,0,0,0.26);
                }

                :host {
                    position: relative;
                }

                :host(.aebackground) {
                    background: var(--color-primary, lightgray);
                    padding: 0.15rem;
                }

                :host-context(p) {
                    font-weight: bold;
                }

                .highlight {
                    background-color: red;
                }

                ::slotted(.highlight) {
                    border-bottom: 1px dotted red;
                }

                .aeicon {
                    background: black;
                    color: white;
                    padding: 0.15rem 0.5rem;
                    text-align: center;
                    border-radius: 50%
                }
            </style>
            <slot>Default for icon</slot>
            <span class="aeicon">?</span>
        `;
    }

    connectedCallback() {
        if (this.hasAttribute('aetext')) {
            this._tooltipText = this.getAttribute('aetext');
        }
        this._tooltipHint = this.shadowRoot.querySelector('span');
        this._tooltipHint.addEventListener('mouseenter', this._showTooltipHint.bind(this));
        this._tooltipHint.addEventListener('mouseleave', this._hideTooltipHint.bind(this));
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        if (name === 'aetext') {
            this._tooltipText = newValue;
        }
    }

    static get observedAttributes() {
        return ['aetext'];
    }

    disconnectedCallback() {
        this._tooltipHint.removeEventListener('mouseenter', this._showTooltipHint);
        this._tooltipHint.removeEventListener('mouseleave', this._hideTooltipHint);
    }

    _render() {
        let tooltipContainer = this.shadowRoot.querySelector('div');
        if (this._tooltipVisible) {
            tooltipContainer = document.createElement('div');
            tooltipContainer.textContent = this._tooltipText;
            this.shadowRoot.appendChild(tooltipContainer);
        } else {
            if (tooltipContainer) {
                this.shadowRoot.removeChild(tooltipContainer);
            }
        }
    }

    _showTooltipHint() {
        this._tooltipVisible = true;
        this._render();
    }

    _hideTooltipHint() {
        this._tooltipVisible = false;
        this._render();
    }
}

customElements.define('ae-tooltip-component', TooltipComponent);