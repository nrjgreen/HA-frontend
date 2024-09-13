import {
  css,
  CSSResultGroup,
  LitElement,
  nothing,
  svg,
  SVGTemplateResult,
} from "lit";
import { customElement, property } from "lit/decorators";

@customElement("ha-svg-icon")
export class HaSvgIcon extends LitElement {
  @property() public path?: string;

  @property() public secondaryPath?: string;

  @property() public viewBox?: string;

  protected render(): SVGTemplateResult {
    if (this.path !== "NRJHub")
      return svg`
      <svg
        viewBox=${this.viewBox || "0 0 24 24"}
        preserveAspectRatio="xMidYMid meet"
        focusable="false"
        role="img"
        aria-hidden="true"
      >
        <g>
          ${
            this.path
              ? svg`<path class="primary-path" d=${this.path}></path>`
              : nothing
          }
          ${
            this.secondaryPath
              ? svg`<path class="secondary-path" d=${this.secondaryPath}></path>`
              : nothing
          }
        </g>
      </svg>`;
    // return svg``;
    return svg`<svg class="NRJHub-Logo" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd;width: 48px;height: 48px;" xmlns="http://www.w3.org/2000/svg" width="500px" height="500px" class="NRJHub-Logo" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 500">
    <defs id="defs23"/>
    <g id="g2" transform="translate(-39.496187,-51.616084)">
      <path style="opacity:1" fill="#48bdcf" d="m 432.5,210.5 c -19.826,0.997 -39.826,1.33 -60,1 0,33 0,66 0,99 -7.333,0 -14.667,0 -22,0 0.167,-39.335 0,-78.668 -0.5,-118 -37.92,-20.625 -75.92,-40.958 -114,-61 -19.575,9.914 -38.908,20.247 -58,31 -0.167,-24.007 -0.667,-48.007 -1.5,-72 -9.922,-9.1361 -11.422,-19.4694 -4.5,-31 8.844,-9.1683 18.677,-10.335 29.5,-3.5 8.948,8.5462 10.448,18.3795 4.5,29.5 -1.667,1.6667 -3.333,3.3333 -5,5 -0.667,11.333 -0.667,22.667 0,34 10.785,-5.975 21.619,-11.808 32.5,-17.5 1.333,-0.667 2.667,-0.667 4,0 64.995,34.498 129.995,68.998 195,103.5 z" id="path2"/>
    </g>
    <g id="g3" transform="translate(-39.496187,-51.616084)">
      <path style="opacity:1" fill="#fafcfd" d="m 184.5,63.5 c 10.043,-1.1216 14.543,3.2118 13.5,13 -2.815,5.6691 -7.315,7.5024 -13.5,5.5 -2.167,-0.8333 -3.667,-2.3333 -4.5,-4.5 -1.691,-5.8898 -0.191,-10.5564 4.5,-14 z" id="path3"/>
    </g>
    <g id="g4" transform="translate(-39.496187,-51.616084)">
      <path style="opacity:1" fill="#414241" d="m 121.5,192.5 c -0.999,59.831 -1.332,119.831 -1,180 25.505,0.331 50.839,-0.002 76,-1 5.969,-8.135 13.969,-10.969 24,-8.5 15.262,6.705 19.095,17.538 11.5,32.5 -11.238,11.53 -22.738,11.863 -34.5,1 0.172,-0.992 -0.162,-1.658 -1,-2 -32.162,-0.998 -64.496,-1.332 -97,-1 0.3324,-60.836 -9e-4,-121.502 -1,-182 -19.8404,0.33 -39.5071,-0.003 -59,-1 30.2021,-16.268 60.535,-32.268 91,-48 1.33,-6.466 1.997,-13.299 2,-20.5 0,-7.008 -0.334,-13.842 -1,-20.5 -9.941,-8.322 -12.108,-18.322 -6.5,-30 9.749,-10.6743 20.582,-11.841 32.5,-3.5 8.909,12.163 7.743,23.33 -3.5,33.5 -0.167,18.009 -0.667,36.009 -1.5,54 -10.524,5.426 -20.857,11.093 -31,17 z" id="path4"/>
    </g>
    <g id="g5" transform="translate(-39.496187,-51.616084)">
      <path style="opacity:1" fill="#f5f5f5" d="m 138.5,93.5 c 13.416,-0.1059 17.082,5.7275 11,17.5 -11.18,4.499 -16.68,0.666 -16.5,-11.5 1.36,-2.5226 3.193,-4.5226 5.5,-6 z" id="path5"/>
    </g>
    <g id="g8" transform="translate(-39.496187,-51.616084)">
      <path style="opacity:1" fill="#50c0d1" d="m 189.5,210.5 c 15.734,-0.118 21.234,7.215 16.5,22 -1.739,2.241 -3.906,3.908 -6.5,5 -0.832,8.982 -1.332,17.982 -1.5,27 -3.667,3.667 -7.333,7.333 -11,11 -0.5,6.658 -0.666,13.325 -0.5,20 -3.277,0.284 -6.443,-0.049 -9.5,-1 -0.667,-7.667 -0.667,-15.333 0,-23 4,-4 8,-8 12,-12 0.831,-7.356 0.665,-14.689 -0.5,-22 -7.443,-4.239 -9.943,-10.572 -7.5,-19 2.074,-3.577 4.907,-6.244 8.5,-8 z" id="path8"/>
    </g>
    <g id="g9" transform="translate(-39.496187,-51.616084)">
      <path style="opacity:1" fill="#4ebfd0" d="m 257.5,210.5 c 15.734,-0.118 21.234,7.215 16.5,22 -1.739,2.241 -3.906,3.908 -6.5,5 -0.832,8.982 -1.332,17.982 -1.5,27 -3.667,3.667 -7.333,7.333 -11,11 -0.5,6.658 -0.666,13.325 -0.5,20 -3,0 -6,0 -9,0 -0.166,-8.34 0,-16.673 0.5,-25 3.667,-3.667 7.333,-7.333 11,-11 0.831,-7.356 0.665,-14.689 -0.5,-22 -7.443,-4.239 -9.943,-10.572 -7.5,-19 2.074,-3.577 4.907,-6.244 8.5,-8 z" id="path9"/>
    </g>
    <g id="g11" transform="translate(-39.496187,-51.616084)">
      <path style="opacity:1" fill="#f8fbfc" d="m 190.5,216.5 c 10.87,0.323 13.87,5.157 9,14.5 -9.602,3.069 -13.768,-0.431 -12.5,-10.5 1.376,-1.205 2.542,-2.538 3.5,-4 z" id="path11"/>
    </g>
    <g id="g12" transform="translate(-39.496187,-51.616084)">
      <path style="opacity:1" fill="#f7fbfc" d="m 258.5,216.5 c 8.045,-0.452 11.878,3.214 11.5,11 -4.592,6.179 -9.592,6.512 -15,1 -1.407,-4.857 -0.24,-8.857 3.5,-12 z" id="path12"/>
    </g>
    <g id="g14" transform="translate(-39.496187,-51.616084)">
      <path style="opacity:1" fill="#434443" d="m 234.5,263.5 c -3.63,4.131 -7.463,8.131 -11.5,12 -0.667,2 -0.667,4 0,6 11.61,7.484 12.443,15.984 2.5,25.5 -7.679,3.89 -14.179,2.39 -19.5,-4.5 -3.913,-9.247 -1.579,-16.247 7,-21 0.333,-3.333 0.667,-6.667 1,-10 4.037,-3.869 7.87,-7.869 11.5,-12 0.995,-11.154 1.328,-22.488 1,-34 2.667,0 5.333,0 8,0 0,12.667 0,25.333 0,38 z" id="path14"/>
    </g>
    <g id="g16" transform="translate(-39.496187,-51.616084)">
      <path style="opacity:1" fill="#434443" d="m 302.5,263.5 c -3.63,4.131 -7.463,8.131 -11.5,12 -0.667,2 -0.667,4 0,6 11.601,7.44 12.434,15.94 2.5,25.5 -8.754,4.083 -15.587,1.916 -20.5,-6.5 -2.536,-8.589 0.131,-14.922 8,-19 0.333,-3.333 0.667,-6.667 1,-10 4.037,-3.869 7.87,-7.869 11.5,-12 0.995,-11.154 1.328,-22.488 1,-34 2.667,0 5.333,0 8,0 0,12.667 0,25.333 0,38 z" id="path16"/>
    </g>
    <g id="g17" transform="translate(-39.496187,-51.616084)">
      <path style="opacity:1" fill="#424342" d="m 403.5,344.5 c -10.153,-0.994 -20.486,-1.328 -31,-1 0,17 0,34 0,51 -23.667,0 -47.333,0 -71,0 -0.328,11.512 0.005,22.846 1,34 11.915,11.744 11.915,23.577 0,35.5 -13.765,7.279 -24.265,4.112 -31.5,-9.5 -1.418,-4.928 -1.751,-9.928 -1,-15 2.243,-4.248 5.243,-7.914 9,-11 0.5,-18.664 0.667,-37.33 0.5,-56 23.667,0 47.333,0 71,0 0,-17 0,-34 0,-51 17.67,0.167 35.336,0 53,-0.5 11.627,-12.444 23.46,-12.611 35.5,-0.5 6.82,13.56 3.653,24.06 -9.5,31.5 -10.634,3.909 -19.3,1.409 -26,-7.5 z" id="path17"/>
    </g>
    <g id="g18" transform="translate(-39.496187,-51.616084)">
      <path style="opacity:1" fill="#f5f5f5" d="m 417.5,322.5 c 13.08,-0.15 16.747,5.517 11,17 -11.632,5.76 -17.132,2.094 -16.5,-11 1.36,-2.523 3.193,-4.523 5.5,-6 z" id="path18"/>
    </g>
  <script xmlns=""/></svg>`;
  }

  static get styles(): CSSResultGroup {
    return css`
      ha-svg-icon:has(.NRJHub-Logo) {
        width: 48px;
        height: 48px;
      }
      :host {
        display: var(--ha-icon-display, inline-flex);
        align-items: center;
        justify-content: center;
        position: relative;
        vertical-align: middle;
        fill: var(--icon-primary-color, currentcolor);
        width: var(--mdc-icon-size, 24px);
        height: var(--mdc-icon-size, 24px);
      }
      svg {
        width: 100%;
        height: 100%;
        pointer-events: none;
        display: block;
      }
      path.primary-path {
        opacity: var(--icon-primary-opactity, 1);
      }
      path.secondary-path {
        fill: var(--icon-secondary-color, currentcolor);
        opacity: var(--icon-secondary-opactity, 0.5);
      }
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "ha-svg-icon": HaSvgIcon;
  }
}
