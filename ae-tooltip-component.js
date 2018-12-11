class TooltipComponent extends HTMLElement {
    constructor() {
        super();
        this._tooltipContainer;
        this._tooltipText = "Default value for tooltipText"
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                div {
                    background-color: black;
                    color: white;
                    position: absolute;
                    z-index: 10;
                }

                :host(.aebackground) {
                    background: lightgrey;
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
        const tooltipHint = this.shadowRoot.querySelector('span');
        tooltipHint.addEventListener('mouseenter', this._showTooltipHint.bind(this));
        tooltipHint.addEventListener('mouseleave', this._hideTooltipHint.bind(this));
        this.shadowRoot.appendChild(tooltipHint);
        this.style.position = 'relative';
    }

    _showTooltipHint() {
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = this._tooltipText;
        this.shadowRoot.appendChild(this._tooltipContainer);
    }

    _hideTooltipHint() {
        this.shadowRoot.removeChild(this._tooltipContainer);
    }
}

customElements.define('ae-tooltip-component', TooltipComponent);