class TooltipComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const tooltipHint = document.createElement('span');
        tooltipHint.textContent = ' (?)';
        tooltipHint.addEventListener('mouseenter', this._showTooltipHint.bind(this));
        this.appendChild(tooltipHint);
    }

    _showTooltipHint() {
        console.log('_showTooltipHint');
        const tooltipContainer = document.createElement('div');
        tooltipContainer.textContent = 'ae-tooltip details...';
        this.appendChild(tooltipContainer);
    }

}

customElements.define('ae-tooltip-component', TooltipComponent);