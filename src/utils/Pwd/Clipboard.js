import React, { PureComponent } from 'react';
import copy from './copy.png';

export default class Toggle extends PureComponent {
  render() {
    return (
      <div className="tooltip">
        <span className="tooltiptext" id="myTooltip">
          Copy to clipboard
        </span>
        <img
          src={copy}
          alt="copy"
          height={25}
          onClick={() => {
            let copyText = document.getElementById('input');
            copyText.select();
            document.execCommand('copy');
            let tooltip = document.getElementById('myTooltip');
            tooltip.innerHTML = 'Copied: ';
          }}
          onMouseOut={() => {
            let tooltip = document.getElementById('myTooltip');
            tooltip.innerHTML = 'Copy to clipboard';
          }}
        />
      </div>
    );
  }
}
