class TooltipComponent extends HTMLElement {
    constructor() {
        super();
        this._tooltipContainer;
    }

    connectedCallback() {
        const tooltipHint = document.createElement('span');
        tooltipHint.textContent = ' (hoverme)';
        tooltipHint.addEventListener('mouseenter', this._showTooltipHint.bind(this));
        tooltipHint.addEventListener('mouseleave', this._hideTooltipHint.bind(this));
        this.appendChild(tooltipHint);
    }

    _showTooltipHint() {
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = 'ae-tooltip details...';
        this.appendChild(this._tooltipContainer);
    }

    _hideTooltipHint() {
        console.log('_hideTooltipHint')
        this.removeChild(this._tooltipContainer);
    }
}

customElements.define('ae-tooltip-component', TooltipComponent);