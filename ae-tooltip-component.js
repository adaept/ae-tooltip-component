class TooltipComponent extends HTMLElement {
    constructor() {
        super();
        this._tooltipContainer;
        this._tooltipText = "Default value for tooltipText"
    }

    connectedCallback() {
        if (this.hasAttribute('aetext')) {
            this._tooltipText = this.getAttribute('aetext');
        }
        const tooltipHint = document.createElement('span');
        tooltipHint.textContent = ' (hoverme)';
        tooltipHint.addEventListener('mouseenter', this._showTooltipHint.bind(this));
        tooltipHint.addEventListener('mouseleave', this._hideTooltipHint.bind(this));
        this.appendChild(tooltipHint);
        this.style.position = 'relative';
    }

    _showTooltipHint() {
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = this._tooltipText;
        this._tooltipContainer.style.backgroundColor = 'black';
        this._tooltipContainer.style.color = 'white';
        this.style.position = 'absolute';
        this.style.zIndex = '10';
        this.appendChild(this._tooltipContainer);
    }

    _hideTooltipHint() {
        this.removeChild(this._tooltipContainer);
    }
}

customElements.define('ae-tooltip-component', TooltipComponent);