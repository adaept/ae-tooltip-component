class TooltipComponent extends HTMLElement {
    constructor() {
        super();
        this._tooltipContainer;
    }

    connectedCallback() {
        const tooltipHint = document.createElement('span');
        tooltipHint.textContent = ' (?)';
        tooltipHint.addEventListener('mouseenter', this._showTooltipHint.bind(this));
        tooltipHint.addEventListener('mouseleave', this._showTooltipHint.bind(this));
        this.appendChild(tooltipHint);
    }

    _showTooltipHint() {
        const _tooltipContainer = document.createElement('div');
        _tooltipContainer.textContent = 'ae-tooltip details...';
        this.appendChild(_tooltipContainer);
    }

}

customElements.define('ae-tooltip-component', TooltipComponent);