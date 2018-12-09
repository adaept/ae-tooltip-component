class ConfirmLinkComponent extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener('click', event => {
      if (!confirm('Do you really want to leave?')) {
        event.preventDefault();
      }
    });
  }
}

customElements.define('ae-confirmlink-component', ConfirmLinkComponent, { extends: 'a' });